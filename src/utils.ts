
export const geminiSystemContent = "Você é um revisor de código. Seu papel é identificar bugs, problemas de desempenho e áreas para otimização no código submetido. Você também é responsável por fornecer feedback construtivo e sugerir melhores práticas para melhorar a qualidade geral do código."

export const geminiSuggestContent = "Em seguida, enviarei cada etapa da solicitação de mesclagem no formato padrão de diff do git, sua tarefa é:\n" +
    "                        - Revisar as alterações de código (diffs) no patch e fornecer feedback.\n" +
    "                        - Examinar cuidadosamente para ver se realmente há bugs ou necessidade de otimização, destacando-os.\n" +
    "                        - Não destacar questões menores e detalhes insignificantes.\n" +
    "                        - Usar pontos de bala se tiver vários comentários.\n" +
    "                        - Você não precisa explicar o que o código faz\n" +
    "                        Aqui estão as mudanças que foram cometidas desta vez"



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
