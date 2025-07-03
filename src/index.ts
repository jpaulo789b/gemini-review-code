import {Command} from 'commander';
import {GitLab} from './gitlab';
import {Gemini} from './gemini';
import {delay, getDiffBlocks, getLineObj, isValidReviewComment, getCommentType, shouldIgnoreFile, isPlatformFile, shouldFailPipeline, isWarningOnly} from "./utils";

const program = new Command();

program
    .option('-g, --gitlab-api-url <string>', 'GitLab API URL', ' https://gitlab.com/api/v4')
    .option('-t, --gitlab-access-token <string>', 'GitLab Access Token')
    .option('-a, --api-key <string>', 'Gemini API Key')
    .option('-p, --project-id <number>', 'GitLab Project ID')
    .option('-m, --merge-request-id <string>', 'GitLab Merge Request ID')
    .option('-c, --custom-model <string>', 'Custom Model ID', 'gemini-1.5-flash')
    .parse(process.argv);

async function run() {
    const {
        gitlabApiUrl,
        gitlabAccessToken,
        apiKey,
        projectId,
        mergeRequestId,
        customModel,
    } = program.opts();
    const gitlab = new GitLab({gitlabApiUrl, gitlabAccessToken, projectId, mergeRequestId});
    let aiClient;
    aiClient = new Gemini('https://generativelanguage.googleapis.com', apiKey, customModel); // create a new instance of the Gemini class
    await gitlab.init().catch(() => {
        console.log('gitlab init error')
    });
    const changes = await gitlab.getMergeRequestChanges().catch(() => {
        console.log('get merge request changes error')
    });
    
    // Contadores para problemas críticos
    let criticalIssuesCount = 0;
    let grossErrorsCount = 0;
    let severeErrorsCount = 0;
    let complexLogicCount = 0;
    let buildProblemsCount = 0;
    
    for (const change of changes) {
        // Verificar se o arquivo deve ser ignorado completamente
        if (shouldIgnoreFile(change.new_path) || shouldIgnoreFile(change.old_path)) {
            console.log(`🚫 Ignorando arquivo: ${change.new_path || change.old_path} (arquivo não relevante)`);
            continue;
        }
        
        if (change.renamed_file || change.deleted_file || !change?.diff?.startsWith('@@')) {
            continue;
        }
        
        // Verificar se é arquivo de plataforma
        const isPlatform = isPlatformFile(change.new_path) || isPlatformFile(change.old_path);
        const fileType = isPlatform ? 'PLATAFORMA' : 'DART';
        
        console.log(`🔍 Analisando arquivo ${fileType}: ${change.new_path || change.old_path}`);
        
        const diffBlocks = getDiffBlocks(change?.diff);
        while (!!diffBlocks.length) {
            const item = diffBlocks.shift()!;
            const lineRegex = /@@\s-(\d+)(?:,(\d+))?\s\+(\d+)(?:,(\d+))?\s@@/;
            const matches = lineRegex.exec(item);
            if (matches) {
                const lineObj = getLineObj(matches, item);
                if ((lineObj?.new_line && lineObj?.new_line > 0) || (lineObj.old_line && lineObj.old_line > 0)) {
                    try {
                        // Usar método específico baseado no tipo de arquivo
                        const suggestion = isPlatform 
                            ? await aiClient.reviewPlatformChange(item)
                            : await aiClient.reviewCodeChange(item);
                        
                        // Só adiciona comentário se há problemas críticos
                        if (isValidReviewComment(suggestion, isPlatform)) {
                            const commentType = getCommentType(suggestion);
                            await gitlab.addReviewComment(lineObj, change, suggestion);
                            
                            // Incrementar contadores baseado no tipo do problema
                            criticalIssuesCount++;
                            
                            if (commentType === 'ERRO GROTESCO') {
                                grossErrorsCount++;
                            } else if (commentType === 'ERRO GRAVE') {
                                severeErrorsCount++;
                            } else if (commentType === 'LÓGICA COMPLEXA') {
                                complexLogicCount++;
                            } else if (commentType === 'PROBLEMA CRÍTICO DE BUILD' || commentType === 'PROBLEMA GRAVE DE CONFIGURAÇÃO') {
                                buildProblemsCount++;
                            }
                            
                            console.log(`✅ Comentário adicionado - ${commentType} encontrado (${fileType})`);
                            console.log(`📄 Arquivo: ${change.new_path || change.old_path}`);
                        } else {
                            console.log(`ℹ️  Nenhum problema crítico encontrado - comentário não adicionado (${fileType})`);
                            console.log('📝 Resposta do Gemini:', suggestion.substring(0, 100) + '...');
                        }
                    } catch (e: any) {
                        if (e?.response?.status === 429) {
                            console.log('Too Many Requests, try again');
                            await delay(60 * 1000);
                            diffBlocks.push(item);
                        }
                    }
                }
            }
        }
    }
    
    // Relatório final e decisão da pipeline
    console.log('\n=== RELATÓRIO FINAL DE REVISÃO ===');
    console.log(`📊 Total de problemas críticos encontrados: ${criticalIssuesCount}`);
    console.log(`🚨 Erros grotescos: ${grossErrorsCount}`);
    console.log(`⚠️  Erros graves: ${severeErrorsCount}`);
    console.log(`🔍 Lógicas complexas: ${complexLogicCount}`);
    console.log(`🏗️  Problemas de build: ${buildProblemsCount}`);
    
    // Determinar se a pipeline deve falhar
    const shouldFailPipeline = grossErrorsCount > 0 || severeErrorsCount > 0 || buildProblemsCount > 0;
    
    if (shouldFailPipeline) {
        console.log('\n❌ PIPELINE FALHOU!');
        console.log('🚨 Foram encontrados problemas críticos que impedem o merge:');
        
        if (grossErrorsCount > 0) {
            console.log(`   • ${grossErrorsCount} erro(s) grotesco(s) que podem quebrar a aplicação`);
        }
        if (severeErrorsCount > 0) {
            console.log(`   • ${severeErrorsCount} erro(s) grave(s) que violam padrões arquiteturais`);
        }
        if (buildProblemsCount > 0) {
            console.log(`   • ${buildProblemsCount} problema(s) de build que podem quebrar a CI/CD`);
        }
        
        console.log('\n🔧 Corrija os problemas antes de fazer o merge.');
        console.log('💡 Lógicas complexas não impedem o merge, mas merecem atenção.');
        
        // Falhar a pipeline com exit code 1
        process.exit(1);
    } else if (complexLogicCount > 0) {
        console.log('\n⚠️  PIPELINE PASSOU COM AVISOS');
        console.log(`🔍 Foram encontradas ${complexLogicCount} lógica(s) complexa(s) que merecem atenção, mas não impedem o merge.`);
        console.log('💡 Considere refatorar essas lógicas para melhorar a manutenibilidade.');
        
        // Pipeline passa, mas com aviso
        process.exit(0);
    } else {
        console.log('\n✅ PIPELINE PASSOU!');
        console.log('🎉 Nenhum problema crítico encontrado. Merge liberado!');
        
        // Pipeline passa com sucesso
        process.exit(0);
    }
}

module.exports = run;

