import { isValidReviewComment, hasCriticalIssues } from './src/utils';

// Teste para verificar se comentários irrelevantes são filtrados
const testCases = [
    {
        response: `O número da versão foi alterado de 6.14.0+1 para 6.14.1+2019013955. Embora isso não seja, em si, um bug, a numeração 2019013955 parece arbitrária e não segue uma convenção de versionamento padrão. Recomenda-se usar um esquema de versionamento mais estruturado.`,
        expectedValid: false,
        description: "Comentário sobre versioning deve ser ignorado"
    },
    {
        response: `A legibilidade foi ligeiramente reduzida com essa mudança. Considerar manter a estrutura anterior, se validarSDK() retornar um único widget. Um comentário explicando o porquê dessa simplificação seria útil.`,
        expectedValid: false,
        description: "Comentário sobre legibilidade deve ser ignorado"
    },
    {
        response: `validarSDK() deve retornar um widget, ou a lógica deve ser modificada para lidar com casos em que validarSDK() não retorna um widget. Se validarSDK() retornar null ou qualquer coisa que não seja um widget, isso causará um erro de tempo de execução.`,
        expectedValid: true,
        description: "Problema técnico real sobre tipo de retorno deve ser mantido"
    },
    {
        response: `🚨 ERROS GROTESCOS:\n- Null pointer exception detectado na linha 15\n- Método pode retornar null causando runtime error`,
        expectedValid: true,
        description: "Erro grotesco real deve ser mantido"
    },
    {
        response: `🔍 LÓGICAS COMPLEXAS:\n- Método com mais de 80 linhas e alta complexidade ciclomática`,
        expectedValid: true,
        description: "Lógica complexa deve ser mantida"
    },
    {
        response: `Embora isso não seja um bug, recomenda-se usar uma abordagem mais estruturada. Considere uma revisão do código utilizado.`,
        expectedValid: false,
        description: "Recomendação genérica deve ser ignorada"
    },
    {
        response: `O código foi alterado para usar async/await incorretamente, isso pode causar deadlocks e crashes na aplicação.`,
        expectedValid: true,
        description: "Problema técnico com async/await deve ser mantido"
    }
];

console.log('🧪 Testando filtros de comentários irrelevantes...\n');

testCases.forEach((testCase, index) => {
    const hasCritical = hasCriticalIssues(testCase.response);
    const isValid = isValidReviewComment(testCase.response, false);
    const status = isValid === testCase.expectedValid ? '✅' : '❌';
    
    console.log(`${status} Teste ${index + 1}: ${testCase.description}`);
    console.log(`   Response: "${testCase.response.substring(0, 80)}..."`);
    console.log(`   hasCriticalIssues: ${hasCritical}`);
    console.log(`   isValidReviewComment - Expected: ${testCase.expectedValid}, Got: ${isValid}`);
    console.log('');
});

console.log('✨ Testes de filtros concluídos!');
