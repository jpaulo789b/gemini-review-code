export const geminiSystemContent = "Você é um revisor técnico sênior especializado em Flutter/Dart e arquitetura móvel. Analise merge requests identificando APENAS erros grotescos e graves que violem os padrões de código estabelecidos. IGNORE problemas menores e foque apenas em questões críticas que quebram a aplicação ou violam padrões arquiteturais essenciais. Seja objetivo e específico nas suas observações."

export const geminiSuggestContent = "Analise o seguinte diff de código Flutter/Dart. Identifique APENAS:\n\n" +
    "🚨 ERROS GROTESCOS (Críticos - Quebram a aplicação):\n" +
    "- Crashes/Exceptions não tratadas\n" +
    "- Memory leaks evidentes\n" +
    "- Null pointer exceptions ou uso incorreto de nullable types\n" +
    "- Imports circulares ou dependências quebradas\n" +
    "- Threading issues (async/await, Future mal implementados)\n" +
    "- State management quebrado (MobX observers mal implementados)\n\n" +
    "⚠️ ERROS GRAVES (Violam padrões arquiteturais):\n" +
    "- Classes Controller sem padrão 'Controlador[Funcionalidade]'\n" +
    "- Widgets sem prefixo DS do design system (DSbotaoPadrao, DStextfield)\n" +
    "- MobX mal implementado (@observable, @action, @computed, Observer widget)\n" +
    "- Controllers não injetados via GetIt\n" +
    "- Falta de try-catch em operações críticas\n" +
    "- ServiceStatus não implementado para estados de loading/erro\n" +
    "- Uso de widgets nativos ao invés do design system DS*\n" +
    "- NavigatorController ignorado para navegação\n\n" +
    "🔍 LÓGICAS COMPLEXAS E FORA DOS PADRÕES (Merecem atenção):\n" +
    "- Métodos com mais de 50 linhas ou complexidade ciclomática alta\n" +
    "- Aninhamento excessivo de condicionais (mais de 4 níveis)\n" +
    "- Loops complexos com múltiplas condições de saída\n" +
    "- Lógicas de negócio hardcoded sem abstração\n" +
    "- Funções com mais de 7 parâmetros\n" +
    "- Uso de magic numbers ou strings sem constantes\n" +
    "- Lógica repetitiva que deveria ser extraída em métodos\n" +
    "- Padrões anti-arquiteturais (God classes, Feature Envy, etc.)\n" +
    "- Uso inadequado de design patterns\n" +
    "- Violação do princípio da responsabilidade única\n" +
    "- Acoplamento excessivo entre classes\n" +
    "- Lógica de UI misturada com lógica de negócio\n\n" +
    "IGNORE COMPLETAMENTE:\n" +
    "- Arquivos .g.dart, .freezed.dart, pubspec.yaml, pubspec.lock\n" +
    "- Arquivos de configuração: AndroidManifest.xml, Info.plist, build.gradle, CMakeLists.txt\n" +
    "- Arquivos de recursos: strings.xml, colors.xml, dimens.xml, styles.xml\n" +
    "- Arquivos de assets: imagens, fontes, json de configuração\n" +
    "- Arquivos de documentação: README.md, CHANGELOG.md, LICENSE\n" +
    "- Configurações de IDE: .vscode/, .idea/, analysis_options.yaml\n" +
    "- Formatação, espaços, quebras de linha\n" +
    "- Nomes de variáveis locais\n" +
    "- Comentários ou documentação\n" +
    "- Questões de UX/UI menores\n" +
    "- Alterações em strings/textos\n" +
    "- Mudanças de tradução/localização\n" +
    "- Problemas de configuração de permissões Android/iOS\n" +
    "- Placeholders em arquivos de configuração\n\n" +
    "FOCO APENAS EM:\n" +
    "- Arquivos .dart que contenham lógica de negócio\n" +
    "- Controllers, Services, Models, Widgets customizados\n" +
    "- Implementações de padrões arquiteturais\n\n" +
    "FORMATO DA RESPOSTA:\n" +
    "Se encontrar problemas: Liste por arquivo com '🚨 ERROS GROTESCOS:', '⚠️ ERROS GRAVES:' e/ou '🔍 LÓGICAS COMPLEXAS:'\n" +
    "Se NENHUM problema crítico: Responda EXATAMENTE: 'Nenhum problema crítico encontrado.'\n\n" +
    "IMPORTANTE: Apenas comente se há problemas que realmente quebram a aplicação, violam padrões arquiteturais essenciais ou apresentam lógicas excessivamente complexas que prejudicam a manutenibilidade. NÃO comente sobre configurações de sistema, permissões, ou arquivos que não sejam código Dart.\n\n" +
    "Aqui está o diff:"

export const geminiCompletionsConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
    model: "gemini-2.0-flash-lite",
}

export const delay = (time: number) => {
    return new Promise(resolve => setTimeout(resolve, time));
}

export const getDiffBlocks = (diff: string) => {
    const regex = /(?=@@\s-\d+(?:,\d+)?\s\+\d+(?:,\d+)?\s@@)/g;
    const diffBlocks: string[] = diff.split(regex);
    return diffBlocks;
}

export const getLineObj = (matches: RegExpMatchArray, item: string) => {
    const lineObj: { new_line?: number, old_line?: number } = {};
    const lastLine = item.split(/\r?\n/)?.reverse()?.[1]?.trim();
    const oldLineStart = +matches[1];
    const oldLineEnd = +matches[2] || 0;
    const newLineStart = +matches[3];
    const newLineEnd = +matches[4] || 0;
    if (lastLine?.[0] === '+') {
        lineObj.new_line = newLineStart + newLineEnd - 1;
    } else if (lastLine?.[0] === '-') {
        lineObj.old_line = oldLineStart + oldLineEnd - 1;
    } else {
        lineObj.new_line = newLineStart + newLineEnd - 1;
        lineObj.old_line = oldLineStart + oldLineEnd - 1;
    }
    return lineObj;
}

export const hasCriticalIssues = (geminiResponse: string): boolean => {
    // Remove espaços e quebras de linha extras para normalizar a resposta
    const normalizedResponse = geminiResponse.trim().toLowerCase();
    
    // Verifica se a resposta indica que não há problemas críticos
    const noIssuesPatterns = [
        'nenhum problema crítico encontrado',
        'não foram encontrados problemas críticos',
        'não há problemas críticos',
        'sem problemas críticos',
        'não encontrei problemas críticos',
        'nenhum erro crítico encontrado',
        'não foram identificados problemas críticos'
    ];
    
    // Se contém algum padrão de "sem problemas", retorna false
    if (noIssuesPatterns.some(pattern => normalizedResponse.includes(pattern))) {
        return false;
    }
    
    // Verifica se contém indicadores de problemas críticos, erros graves ou lógicas complexas
    const criticalIssuesPatterns = [
        '🚨 erros grotescos',
        '⚠️ erros graves',
        '🔍 lógicas complexas',
        '🚨 problemas críticos de build',
        '⚠️ problemas graves de configuração',
        '🚨',
        '⚠️',
        '🔍',
        'erros grotescos',
        'erros graves',
        'lógicas complexas',
        'problemas críticos de build',
        'problemas graves de configuração',
        'problema crítico',
        'problemas críticos',
        'complexidade alta',
        'complexidade ciclomática',
        'aninhamento excessivo',
        'lógica complexa',
        'padrão anti-arquitetural',
        'violação do princípio',
        'acoplamento excessivo',
        'responsabilidade única',
        'quebrar o build',
        'falhas críticas',
        'sintaxe inválida',
        'dependências incompatíveis',
        'configurações obrigatórias ausentes'
    ];
    
    // Se contém algum indicador de problema crítico, retorna true
    return criticalIssuesPatterns.some(pattern => normalizedResponse.includes(pattern));
}

export const isValidReviewComment = (geminiResponse: string, isPlatformFile: boolean = false): boolean => {
    // Verifica se há problemas críticos
    if (!hasCriticalIssues(geminiResponse)) {
        return false;
    }
    
    // Verifica se a resposta não é muito curta (menos de 10 caracteres)
    if (geminiResponse.trim().length < 10) {
        return false;
    }
    
    // Para arquivos de plataforma, permitir conteúdo de configuração se for crítico
    if (!isPlatformFile && isConfigurationContent(geminiResponse)) {
        return false;
    }
    
    // Verifica se a resposta não contém apenas texto genérico
    const genericPatterns = [
        'sem alterações',
        'apenas formatação',
        'mudança de texto',
        'alteração de string',
        'atualização de texto'
    ];
    
    // Para arquivos de plataforma, padrões genéricos são diferentes
    if (isPlatformFile) {
        const platformGenericPatterns = [
            'pequenos ajustes',
            'mudanças de versão',
            'placeholders que serão substituídos',
            'apenas comentários',
            'formatação'
        ];
        
        const normalizedResponse = geminiResponse.trim().toLowerCase();
        const hasGenericContent = platformGenericPatterns.some(pattern => 
            normalizedResponse.includes(pattern)
        );
        
        return !hasGenericContent;
    }
    
    const normalizedResponse = geminiResponse.trim().toLowerCase();
    const hasGenericContent = genericPatterns.some(pattern => 
        normalizedResponse.includes(pattern)
    );
    
    return !hasGenericContent;
}

export const hasComplexLogic = (geminiResponse: string): boolean => {
    const normalizedResponse = geminiResponse.trim().toLowerCase();
    
    // Padrões específicos para lógicas complexas
    const complexLogicPatterns = [
        '🔍 lógicas complexas',
        'complexidade ciclomática',
        'aninhamento excessivo',
        'mais de 50 linhas',
        'mais de 4 níveis',
        'loops complexos',
        'múltiplas condições',
        'lógica hardcoded',
        'mais de 7 parâmetros',
        'magic numbers',
        'magic strings',
        'lógica repetitiva',
        'god class',
        'feature envy',
        'design pattern inadequado',
        'responsabilidade única',
        'acoplamento excessivo',
        'lógica de ui misturada'
    ];
    
    return complexLogicPatterns.some(pattern => normalizedResponse.includes(pattern));
}

export const getCommentType = (geminiResponse: string): string => {
    const normalizedResponse = geminiResponse.trim().toLowerCase();
    
    if (normalizedResponse.includes('🚨 problemas críticos de build') || normalizedResponse.includes('problemas críticos de build')) {
        return 'PROBLEMA CRÍTICO DE BUILD';
    }
    
    if (normalizedResponse.includes('⚠️ problemas graves de configuração') || normalizedResponse.includes('problemas graves de configuração')) {
        return 'PROBLEMA GRAVE DE CONFIGURAÇÃO';
    }
    
    if (normalizedResponse.includes('🚨') || normalizedResponse.includes('erros grotescos')) {
        return 'ERRO GROTESCO';
    }
    
    if (normalizedResponse.includes('⚠️') || normalizedResponse.includes('erros graves')) {
        return 'ERRO GRAVE';
    }
    
    if (normalizedResponse.includes('🔍') || hasComplexLogic(geminiResponse)) {
        return 'LÓGICA COMPLEXA';
    }
    
    return 'GERAL';
}

export const shouldIgnoreFile = (filePath: string): boolean => {
    if (!filePath) return true;
    
    // Normalizar o caminho do arquivo
    const normalizedPath = filePath.toLowerCase();
    
    // Lista de padrões de arquivos que devem ser TOTALMENTE ignorados
    const ignorePatterns = [
        // Arquivos gerados automaticamente
        '.g.dart',
        '.freezed.dart',
        '.gr.dart',
        '.config.dart',
        
        // Arquivos de configuração do projeto (não críticos)
        'pubspec.lock',
        'analysis_options.yaml',
        'dart_tool/',
        '.packages',
        
        // Arquivos de configuração de IDE
        '.vscode/',
        '.idea/',
        '.dart_tool/',
        '.flutter-plugins',
        '.flutter-plugins-dependencies',
        
        // Arquivos de assets
        '.png',
        '.jpg',
        '.jpeg',
        '.gif',
        '.svg',
        '.ttf',
        '.otf',
        '.woff',
        
        // Arquivos de documentação
        'readme.md',
        'changelog.md',
        'license',
        'contributing.md',
        
        // Arquivos de build e configuração não críticos
        '.gitignore',
        '.gitattributes',
        
        // Arquivos de teste (opcional - pode ser comentado se quiser revisar testes)
        '_test.dart',
        'test/',
        
        // Arquivos de web
        'flutter_service_worker.js'
    ];
    
    // Verificar se o arquivo corresponde a algum padrão de ignorar
    return ignorePatterns.some(pattern => 
        normalizedPath.includes(pattern) || 
        normalizedPath.endsWith(pattern) ||
        normalizedPath.startsWith(pattern)
    );
}

export const isPlatformFile = (filePath: string): boolean => {
    if (!filePath) return false;
    
    const normalizedPath = filePath.toLowerCase();
    
    // Arquivos de plataforma que devem ser analisados mas com foco em problemas críticos
    const platformPatterns = [
        'androidmanifest.xml',
        'build.gradle',
        'gradle.properties',
        'info.plist',
        'runner.entitlements',
        'cmakelists.txt',
        'pubspec.yaml'
    ];
    
    return platformPatterns.some(pattern => 
        normalizedPath.includes(pattern) || 
        normalizedPath.endsWith(pattern)
    );
}

export const isConfigurationContent = (content: string): boolean => {
    if (!content) return false;
    
    const normalizedContent = content.toLowerCase();
    
    // Padrões que indicam conteúdo de configuração
    const configPatterns = [
        'android:permission',
        'uses-permission',
        'androidmanifest',
        'info.plist',
        'cfbundleidentifier',
        'build.gradle',
        'dependencies {',
        'android {',
        'flutter {',
        'cmake_minimum_required',
        'target_link_libraries',
        'application_id',
        'placeholder',
        'tools:replace',
        'maxsdkversion',
        'required="false"'
    ];
    
    return configPatterns.some(pattern => normalizedContent.includes(pattern));
}

export const getPlatformPrompt = () => {
    return "Analise o seguinte diff de arquivo de configuração de plataforma (Android/iOS/Flutter). Identifique APENAS problemas que podem QUEBRAR O BUILD ou causar falhas críticas:\n\n" +
        "🚨 PROBLEMAS CRÍTICOS DE BUILD:\n" +
        "- Sintaxe inválida que impede compilação\n" +
        "- Dependências incompatíveis ou com versões conflitantes\n" +
        "- Configurações obrigatórias ausentes\n" +
        "- Chaves de API ou certificados inválidos\n" +
        "- Permissões essenciais removidas incorretamente\n" +
        "- Configurações de build que quebram a compilação\n" +
        "- Targets ou versões mínimas incompatíveis\n\n" +
        "⚠️ PROBLEMAS GRAVES DE CONFIGURAÇÃO:\n" +
        "- Configurações de segurança comprometidas\n" +
        "- Permissões excessivas desnecessárias\n" +
        "- Configurações que podem causar crashes em produção\n" +
        "- Dependências desnecessárias que aumentam o tamanho do app\n\n" +
        "IGNORE COMPLETAMENTE:\n" +
        "- Pequenos ajustes de configuração\n" +
        "- Mudanças de versão que não quebram compatibilidade\n" +
        "- Adição de permissões opcionais bem documentadas\n" +
        "- Placeholders que serão substituídos no build\n" +
        "- Comentários ou documentação\n" +
        "- Formatação ou espaçamento\n\n" +
        "FORMATO DA RESPOSTA:\n" +
        "Se encontrar problemas críticos: Liste com '🚨 PROBLEMAS CRÍTICOS DE BUILD:' e/ou '⚠️ PROBLEMAS GRAVES DE CONFIGURAÇÃO:'\n" +
        "Se NENHUM problema crítico: Responda EXATAMENTE: 'Nenhum problema crítico encontrado.'\n\n" +
        "IMPORTANTE: Apenas comente se a mudança pode realmente quebrar o build ou causar falhas críticas em produção.\n\n" +
        "Aqui está o diff:";
}
