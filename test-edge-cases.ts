import { isValidReviewComment, hasCriticalIssues } from './src/utils';

console.log('=== TESTES DE CASOS ESPECÍFICOS ===\n');

// Teste 1: Comentário sobre tipo de retorno (deve ser aceito)
const returnTypeComment = `
⚠️ ERROS GRAVES:

**lib/services/api_service.dart:**
- Método getUserData() definido como retornando User?, mas pode retornar null sem verificação adequada, causando potencial null pointer exception.
`.trim();

console.log('1. Teste de tipo de retorno:');
console.log('isValidReviewComment:', isValidReviewComment(returnTypeComment, false));
console.log('');

// Teste 2: Comentário sobre async/await (deve ser aceito)
const asyncComment = `
🚨 ERROS GROTESCOS:

**lib/controller/login_controller.dart:**
- Future mal implementado no método loginUser(), pode causar crash quando await é usado incorretamente.
`.trim();

console.log('2. Teste de async/await:');
console.log('isValidReviewComment:', isValidReviewComment(asyncComment, false));
console.log('');

// Teste 3: Comentário sobre widget sem problema técnico (deve ser rejeitado se não for técnico)
const widgetComment = `
O widget foi alterado para usar um Container ao invés de um SizedBox. Isso pode afetar a performance levemente.
`.trim();

console.log('3. Teste de widget sem problema técnico:');
console.log('isValidReviewComment:', isValidReviewComment(widgetComment, false));
console.log('');

// Teste 4: Comentário sobre widget com problema técnico (deve ser aceito)
const widgetTechnicalComment = `
🚨 ERROS GROTESCOS:

**lib/widgets/custom_button.dart:**
- Widget retorna null em algumas condições, causando runtime error na UI.
`.trim();

console.log('4. Teste de widget com problema técnico:');
console.log('isValidReviewComment:', isValidReviewComment(widgetTechnicalComment, false));
console.log('');

// Teste 5: Comentário sobre complexidade (deve ser aceito)
const complexityComment = `
🔍 LÓGICAS COMPLEXAS:

**lib/utils/validator.dart:**
- Método validateForm() possui mais de 50 linhas e complexidade ciclomática alta, dificultando manutenção.
`.trim();

console.log('5. Teste de complexidade:');
console.log('isValidReviewComment:', isValidReviewComment(complexityComment, false));
console.log('');

// Teste 6: Comentário sobre state management (deve ser aceito)
const stateComment = `
⚠️ ERROS GRAVES:

**lib/controller/product_controller.dart:**
- MobX @observable não implementado corretamente, pode causar problemas de state management.
`.trim();

console.log('6. Teste de state management:');
console.log('isValidReviewComment:', isValidReviewComment(stateComment, false));
console.log('');

// Teste 7: Comentário sobre dependency injection (deve ser aceito)
const diComment = `
⚠️ ERROS GRAVES:

**lib/controller/user_controller.dart:**
- Controller não injetado via GetIt, violando padrão arquitetural estabelecido.
`.trim();

console.log('7. Teste de dependency injection:');
console.log('isValidReviewComment:', isValidReviewComment(diComment, false));
console.log('');

// Teste 8: Comentário misturado com conteúdo irrelevante (deve ser rejeitado)
const mixedIrrelevantComment = `
A versão foi alterada e a legibilidade do código foi reduzida. Embora isso não seja um bug, o método pode ter problemas técnicos.
`.trim();

console.log('8. Teste de comentário misturado irrelevante:');
console.log('isValidReviewComment:', isValidReviewComment(mixedIrrelevantComment, false));
console.log('');

// Teste 9: Comentário sobre problema de build (deve ser aceito)
const buildComment = `
🚨 PROBLEMAS CRÍTICOS DE BUILD:

**android/app/build.gradle:**
- Dependência incompatível que pode quebrar o build em produção.
`.trim();

console.log('9. Teste de problema de build:');
console.log('isValidReviewComment:', isValidReviewComment(buildComment, true));
console.log('');

// Teste 10: Comentário sobre arquivo de plataforma sem problema crítico (deve ser rejeitado)
const platformNonCriticalComment = `
Pequenos ajustes de configuração foram feitos no AndroidManifest.xml.
`.trim();

console.log('10. Teste de plataforma sem problema crítico:');
console.log('isValidReviewComment:', isValidReviewComment(platformNonCriticalComment, true));
console.log('');
