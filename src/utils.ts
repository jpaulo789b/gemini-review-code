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
    "- Formatação, espaços, quebras de linha\n" +
    "- Nomes de variáveis locais\n" +
    "- Comentários ou documentação\n" +
    "- Questões de UX/UI menores\n" +
    "- Alterações em strings/textos\n" +
    "- Mudanças de tradução/localização\n\n" +
    "FORMATO DA RESPOSTA:\n" +
    "Se encontrar problemas: Liste por arquivo com '🚨 ERROS GROTESCOS:', '⚠️ ERROS GRAVES:' e/ou '🔍 LÓGICAS COMPLEXAS:'\n" +
    "Se NENHUM problema crítico: Responda EXATAMENTE: 'Nenhum problema crítico encontrado.'\n\n" +
    "IMPORTANTE: Apenas comente se há problemas que realmente quebram a aplicação, violam padrões arquiteturais essenciais ou apresentam lógicas excessivamente complexas que prejudicam a manutenibilidade.\n\n" +
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
        '� lógicas complexas',
        '�🚨',
        '⚠️',
        '🔍',
        'erros grotescos',
        'erros graves',
        'lógicas complexas',
        'problema crítico',
        'problemas críticos',
        'complexidade alta',
        'complexidade ciclomática',
        'aninhamento excessivo',
        'lógica complexa',
        'padrão anti-arquitetural',
        'violação do princípio',
        'acoplamento excessivo',
        'responsabilidade única'
    ];
    
    // Se contém algum indicador de problema crítico, retorna true
    return criticalIssuesPatterns.some(pattern => normalizedResponse.includes(pattern));
}

export const isValidReviewComment = (geminiResponse: string): boolean => {
    // Verifica se há problemas críticos
    if (!hasCriticalIssues(geminiResponse)) {
        return false;
    }
    
    // Verifica se a resposta não é muito curta (menos de 10 caracteres)
    if (geminiResponse.trim().length < 10) {
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
