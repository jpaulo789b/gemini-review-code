import { shouldIgnoreFile, isConfigurationContent, isValidReviewComment } from './src/utils';

// Teste para verificar se as funções estão funcionando corretamente
const fileTestCases = [
    { path: "lib/controllers/usuario_controller.dart", expected: false, description: "Arquivo Dart válido" },
    { path: "android/app/src/main/AndroidManifest.xml", expected: true, description: "AndroidManifest deve ser ignorado" },
    { path: "pubspec.yaml", expected: true, description: "pubspec.yaml deve ser ignorado" },
    { path: "lib/models/usuario.g.dart", expected: true, description: "Arquivo gerado deve ser ignorado" },
    { path: "ios/Runner/Info.plist", expected: true, description: "Info.plist deve ser ignorado" },
    { path: "assets/images/logo.png", expected: true, description: "Imagem deve ser ignorada" },
    { path: "lib/widgets/custom_button.dart", expected: false, description: "Widget customizado válido" },
    { path: "test/widget_test.dart", expected: true, description: "Arquivo de teste deve ser ignorado" },
    { path: "build.gradle", expected: true, description: "build.gradle deve ser ignorado" },
    { path: "lib/services/api_service.dart", expected: false, description: "Service válido" }
];

const configContentTestCases = [
    {
        content: `O atributo android:permission na tag <uses-permission> com o valor android.permission. está incompleto`,
        expected: true,
        description: "Conteúdo sobre permissões Android"
    },
    {
        content: `Os valores android:value para com.google.android.gms.ads.APPLICATION_ID são placeholders`,
        expected: true,
        description: "Conteúdo sobre placeholders"
    },
    {
        content: `🚨 ERROS GROTESCOS:\n- Null pointer exception encontrado na linha 15`,
        expected: false,
        description: "Conteúdo sobre código Dart"
    },
    {
        content: `🔍 LÓGICAS COMPLEXAS:\n- Método com mais de 50 linhas`,
        expected: false,
        description: "Conteúdo sobre lógica complexa"
    }
];

console.log('🧪 Testando filtros de arquivos...\n');

fileTestCases.forEach((testCase, index) => {
    const result = shouldIgnoreFile(testCase.path);
    const status = result === testCase.expected ? '✅' : '❌';
    
    console.log(`${status} Teste ${index + 1}: ${testCase.description}`);
    console.log(`   Path: "${testCase.path}"`);
    console.log(`   Expected: ${testCase.expected}, Got: ${result}`);
    console.log('');
});

console.log('🧪 Testando detecção de conteúdo de configuração...\n');

configContentTestCases.forEach((testCase, index) => {
    const isConfig = isConfigurationContent(testCase.content);
    const isValid = isValidReviewComment(testCase.content);
    const configStatus = isConfig === testCase.expected ? '✅' : '❌';
    
    console.log(`${configStatus} Teste ${index + 1}: ${testCase.description}`);
    console.log(`   Content: "${testCase.content.substring(0, 60)}..."`);
    console.log(`   isConfigurationContent - Expected: ${testCase.expected}, Got: ${isConfig}`);
    console.log(`   isValidReviewComment: ${isValid}`);
    console.log('');
});

console.log('✨ Testes de filtragem concluídos!');
