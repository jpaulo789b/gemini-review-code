import { shouldIgnoreFile, isPlatformFile, isValidReviewComment, getCommentType } from './src/utils';

// Teste para verificar se as funções estão funcionando corretamente
const fileTestCases = [
    { path: "lib/controllers/usuario_controller.dart", shouldIgnore: false, isPlatform: false, description: "Arquivo Dart válido" },
    { path: "android/app/src/main/AndroidManifest.xml", shouldIgnore: false, isPlatform: true, description: "AndroidManifest é arquivo de plataforma" },
    { path: "pubspec.yaml", shouldIgnore: false, isPlatform: true, description: "pubspec.yaml é arquivo de plataforma" },
    { path: "lib/models/usuario.g.dart", shouldIgnore: true, isPlatform: false, description: "Arquivo gerado deve ser ignorado" },
    { path: "ios/Runner/Info.plist", shouldIgnore: false, isPlatform: true, description: "Info.plist é arquivo de plataforma" },
    { path: "assets/images/logo.png", shouldIgnore: true, isPlatform: false, description: "Imagem deve ser ignorada" },
    { path: "build.gradle", shouldIgnore: false, isPlatform: true, description: "build.gradle é arquivo de plataforma" },
    { path: "test/widget_test.dart", shouldIgnore: true, isPlatform: false, description: "Arquivo de teste deve ser ignorado" }
];

const commentTestCases = [
    {
        response: "🚨 PROBLEMAS CRÍTICOS DE BUILD:\n- Sintaxe inválida que impede compilação",
        isPlatform: true,
        expectedValid: true,
        expectedType: "PROBLEMA CRÍTICO DE BUILD",
        description: "Problema crítico de build"
    },
    {
        response: "⚠️ PROBLEMAS GRAVES DE CONFIGURAÇÃO:\n- Permissões excessivas desnecessárias",
        isPlatform: true,
        expectedValid: true,
        expectedType: "PROBLEMA GRAVE DE CONFIGURAÇÃO",
        description: "Problema grave de configuração"
    },
    {
        response: "🚨 ERROS GROTESCOS:\n- Null pointer exception encontrado",
        isPlatform: false,
        expectedValid: true,
        expectedType: "ERRO GROTESCO",
        description: "Erro grotesco em código Dart"
    },
    {
        response: "O atributo android:permission está incompleto",
        isPlatform: true,
        expectedValid: false,
        expectedType: "GERAL",
        description: "Problema menor de configuração deve ser ignorado"
    },
    {
        response: "Nenhum problema crítico encontrado.",
        isPlatform: false,
        expectedValid: false,
        expectedType: "GERAL",
        description: "Sem problemas não deve gerar comentário"
    }
];

console.log('🧪 Testando nova lógica de arquivos de plataforma...\n');

fileTestCases.forEach((testCase, index) => {
    const shouldIgnoreResult = shouldIgnoreFile(testCase.path);
    const isPlatformResult = isPlatformFile(testCase.path);
    
    const ignoreStatus = shouldIgnoreResult === testCase.shouldIgnore ? '✅' : '❌';
    const platformStatus = isPlatformResult === testCase.isPlatform ? '✅' : '❌';
    
    console.log(`${ignoreStatus}${platformStatus} Teste ${index + 1}: ${testCase.description}`);
    console.log(`   Path: "${testCase.path}"`);
    console.log(`   shouldIgnore - Expected: ${testCase.shouldIgnore}, Got: ${shouldIgnoreResult}`);
    console.log(`   isPlatform - Expected: ${testCase.isPlatform}, Got: ${isPlatformResult}`);
    console.log('');
});

console.log('🧪 Testando validação de comentários...\n');

commentTestCases.forEach((testCase, index) => {
    const isValid = isValidReviewComment(testCase.response, testCase.isPlatform);
    const commentType = getCommentType(testCase.response);
    
    const validStatus = isValid === testCase.expectedValid ? '✅' : '❌';
    const typeStatus = commentType === testCase.expectedType ? '✅' : '❌';
    
    console.log(`${validStatus}${typeStatus} Teste ${index + 1}: ${testCase.description}`);
    console.log(`   Response: "${testCase.response}"`);
    console.log(`   isPlatform: ${testCase.isPlatform}`);
    console.log(`   isValid - Expected: ${testCase.expectedValid}, Got: ${isValid}`);
    console.log(`   commentType - Expected: ${testCase.expectedType}, Got: ${commentType}`);
    console.log('');
});

console.log('✨ Testes da nova lógica concluídos!');
