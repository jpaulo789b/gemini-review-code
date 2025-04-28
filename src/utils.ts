
export const geminiSystemContent = "Você é um revisor de código focado em problemas críticos. Sua tarefa é identificar apenas bugs, problemas de desempenho graves e oportunidades claras de otimização no código submetido. Ignore questões menores, estilísticas ou preferências pessoais."

export const geminiSuggestContent = "Analise o seguinte diff de código no formato padrão do git. Sua tarefa é:\n" +
    "- Focar exclusivamente em encontrar bugs, problemas de desempenho graves ou otimizações essenciais.\n" +
    "- Ignorar completamente estilo, formatação, nomes de variáveis ou outras questões menores.\n" +
    "- Se encontrar problemas críticos, liste-os objetivamente usando pontos de bala.\n" +
    "- Se NENHUM problema crítico for encontrado, responda EXATAMENTE com: 'Tudo certo, parabéns!'\n" +
    "Aqui está o diff:"




export const geminiCompletionsConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
    model: "gemini-1.5-flash",
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
