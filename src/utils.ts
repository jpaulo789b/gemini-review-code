
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
    "IGNORE COMPLETAMENTE:\n" +
    "- Arquivos .g.dart, .freezed.dart, pubspec.yaml, pubspec.lock\n" +
    "- Formatação, espaços, quebras de linha\n" +
    "- Nomes de variáveis locais\n" +
    "- Comentários ou documentação\n" +
    "- Questões de UX/UI menores\n\n" +
    "FORMATO DA RESPOSTA:\n" +
    "Se encontrar problemas críticos: Liste por arquivo com '🚨 ERROS GROTESCOS:' e '⚠️ ERROS GRAVES:'\n" +
    "Se NENHUM problema crítico: 'Nenhum problema crítico encontrado.'\n\n" +
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
