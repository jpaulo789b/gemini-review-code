import { hasCriticalIssues, isValidReviewComment } from './src/utils';

// Teste para verificar se a função está funcionando corretamente
const testCases = [
    {
        input: "Nenhum problema crítico encontrado.",
        expected: false,
        description: "Deve retornar false para resposta sem problemas"
    },
    {
        input: "🚨 ERROS GROTESCOS:\n- Null pointer exception encontrado na linha 15",
        expected: true,
        description: "Deve retornar true para erros grotescos"
    },
    {
        input: "⚠️ ERROS GRAVES:\n- Widget sem prefixo DS do design system",
        expected: true,
        description: "Deve retornar true para erros graves"
    },
    {
        input: "Apenas mudança de formatação encontrada",
        expected: false,
        description: "Deve retornar false para mudanças menores"
    },
    {
        input: "Alteração de texto simples",
        expected: false,
        description: "Deve retornar false para alterações de texto"
    },
    {
        input: "Problemas críticos identificados: memory leak na função",
        expected: true,
        description: "Deve retornar true quando menciona problemas críticos"
    }
];

console.log('🧪 Testando função hasCriticalIssues...\n');

testCases.forEach((testCase, index) => {
    const result = hasCriticalIssues(testCase.input);
    const isValidResult = isValidReviewComment(testCase.input);
    const status = result === testCase.expected ? '✅' : '❌';
    
    console.log(`${status} Teste ${index + 1}: ${testCase.description}`);
    console.log(`   Input: "${testCase.input}"`);
    console.log(`   Expected: ${testCase.expected}, Got: ${result}`);
    console.log(`   isValidReviewComment: ${isValidResult}`);
    console.log('');
});

console.log('✨ Testes concluídos!');
