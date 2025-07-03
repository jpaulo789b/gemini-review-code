import { hasCriticalIssues, isValidReviewComment, hasComplexLogic, getCommentType } from './src/utils';

// Teste para verificar se as funções estão funcionando corretamente
const testCases = [
    {
        input: "Nenhum problema crítico encontrado.",
        expected: false,
        description: "Deve retornar false para resposta sem problemas",
        expectedType: "GERAL"
    },
    {
        input: "🚨 ERROS GROTESCOS:\n- Null pointer exception encontrado na linha 15",
        expected: true,
        description: "Deve retornar true para erros grotescos",
        expectedType: "ERRO GROTESCO"
    },
    {
        input: "⚠️ ERROS GRAVES:\n- Widget sem prefixo DS do design system",
        expected: true,
        description: "Deve retornar true para erros graves",
        expectedType: "ERRO GRAVE"
    },
    {
        input: "🔍 LÓGICAS COMPLEXAS:\n- Método com mais de 50 linhas e complexidade ciclomática alta\n- Aninhamento excessivo de condicionais (mais de 4 níveis)",
        expected: true,
        description: "Deve retornar true para lógicas complexas",
        expectedType: "LÓGICA COMPLEXA"
    },
    {
        input: "Detectada lógica com acoplamento excessivo entre classes e violação do princípio da responsabilidade única",
        expected: true,
        description: "Deve retornar true para problemas de design",
        expectedType: "LÓGICA COMPLEXA"
    },
    {
        input: "Método apresenta aninhamento excessivo e magic numbers que prejudicam a manutenibilidade",
        expected: true,
        description: "Deve retornar true para código com complexidade alta",
        expectedType: "LÓGICA COMPLEXA"
    },
    {
        input: "Apenas mudança de formatação encontrada",
        expected: false,
        description: "Deve retornar false para mudanças menores",
        expectedType: "GERAL"
    }
];

console.log('🧪 Testando funcionalidades de detecção de lógicas complexas...\n');

testCases.forEach((testCase, index) => {
    const result = hasCriticalIssues(testCase.input);
    const isValidResult = isValidReviewComment(testCase.input);
    const hasComplexResult = hasComplexLogic(testCase.input);
    const commentType = getCommentType(testCase.input);
    const status = result === testCase.expected ? '✅' : '❌';
    const typeStatus = commentType === testCase.expectedType ? '✅' : '❌';
    
    console.log(`${status} Teste ${index + 1}: ${testCase.description}`);
    console.log(`   Input: "${testCase.input}"`);
    console.log(`   Expected: ${testCase.expected}, Got: ${result}`);
    console.log(`   isValidReviewComment: ${isValidResult}`);
    console.log(`   hasComplexLogic: ${hasComplexResult}`);
    console.log(`   ${typeStatus} Comment Type - Expected: ${testCase.expectedType}, Got: ${commentType}`);
    console.log('');
});

console.log('✨ Testes concluídos!');
