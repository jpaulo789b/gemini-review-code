import { isValidReviewComment, hasCriticalIssues } from './src/utils';

console.log('=== TESTE FINAL DE VALIDAÇÃO - CENÁRIOS COMPLEXOS ===\n');

// Teste 1: Comentário sobre problema de sintaxe real (deve ser aceito)
const syntaxComment = `
🚨 ERROS GROTESCOS:

**lib/models/user_model.dart:**
- Sintaxe inválida na definição da classe que impede compilação do projeto.
`.trim();

console.log('1. Sintaxe inválida:');
console.log('Resultado:', isValidReviewComment(syntaxComment, false) ? '✅ ACEITO' : '❌ REJEITADO');

// Teste 2: Comentário sobre versão misturado com problema técnico (deve ser rejeitado)
const mixedVersionComment = `
A versão foi alterada de 1.0.0 para 1.0.1 seguindo a convenção de versionamento semântico.
`.trim();

console.log('2. Versão misturada:');
console.log('Resultado:', isValidReviewComment(mixedVersionComment, false) ? '✅ ACEITO' : '❌ REJEITADO');

// Teste 3: Comentário sobre MobX (deve ser aceito)
const mobxComment = `
⚠️ ERROS GRAVES:

**lib/stores/user_store.dart:**
- MobX @observable não implementado corretamente para a propriedade user, causando problemas de reatividade.
`.trim();

console.log('3. MobX problema:');
console.log('Resultado:', isValidReviewComment(mobxComment, false) ? '✅ ACEITO' : '❌ REJEITADO');

// Teste 4: Comentário sobre GetIt (deve ser aceito)
const getitComment = `
⚠️ ERROS GRAVES:

**lib/app/app_module.dart:**
- Dependency injection não configurado corretamente, UserController não está registrado no GetIt.
`.trim();

console.log('4. GetIt problema:');
console.log('Resultado:', isValidReviewComment(getitComment, false) ? '✅ ACEITO' : '❌ REJEITADO');

// Teste 5: Comentário sobre Future mal implementado (deve ser aceito)
const futureComment = `
🚨 ERROS GROTESCOS:

**lib/services/auth_service.dart:**
- Future<User> login() implementado incorretamente, pode causar crash quando await é usado.
`.trim();

console.log('5. Future problema:');
console.log('Resultado:', isValidReviewComment(futureComment, false) ? '✅ ACEITO' : '❌ REJEITADO');

// Teste 6: Comentário sobre aninhamento excessivo (deve ser aceito)
const nestingComment = `
🔍 LÓGICAS COMPLEXAS:

**lib/utils/form_validator.dart:**
- Método validate() possui aninhamento excessivo de condicionais (mais de 4 níveis), dificultando manutenção.
`.trim();

console.log('6. Aninhamento excessivo:');
console.log('Resultado:', isValidReviewComment(nestingComment, false) ? '✅ ACEITO' : '❌ REJEITADO');

// Teste 7: Comentário sobre problema de widget (deve ser aceito)
const widgetProblemComment = `
🚨 ERROS GROTESCOS:

**lib/widgets/custom_card.dart:**
- Widget pode retornar null em algumas condições, causando runtime error na renderização.
`.trim();

console.log('7. Widget problema:');
console.log('Resultado:', isValidReviewComment(widgetProblemComment, false) ? '✅ ACEITO' : '❌ REJEITADO');

// Teste 8: Comentário sobre problema de build (deve ser aceito)
const buildProblemComment = `
🚨 PROBLEMAS CRÍTICOS DE BUILD:

**android/app/build.gradle:**
- Dependência flutter_launcher_icons com versão incompatível que quebra o build.
`.trim();

console.log('8. Build problema:');
console.log('Resultado:', isValidReviewComment(buildProblemComment, true) ? '✅ ACEITO' : '❌ REJEITADO');

// Teste 9: Comentário sobre formatação apenas (deve ser rejeitado)
const formatOnlyComment = `
Apenas formatação foi alterada no arquivo, sem mudanças funcionais.
`.trim();

console.log('9. Formatação apenas:');
console.log('Resultado:', isValidReviewComment(formatOnlyComment, false) ? '✅ ACEITO' : '❌ REJEITADO');

// Teste 10: Comentário sobre legibilidade (deve ser rejeitado)
const readabilityComment = `
O código teve sua legibilidade ligeiramente reduzida com a refatoração.
`.trim();

console.log('10. Legibilidade:');
console.log('Resultado:', isValidReviewComment(readabilityComment, false) ? '✅ ACEITO' : '❌ REJEITADO');

console.log('\n=== RESUMO ===');
console.log('Testes que devem ser ACEITOS: 1, 3, 4, 5, 6, 7, 8');
console.log('Testes que devem ser REJEITADOS: 2, 9, 10');
console.log('');

// Teste final: Comentário muito complexo e real
const complexRealComment = `
⚠️ ERROS GRAVES:

**lib/app/utils/utils.dart:**
- Método validarSDK() não retorna um valor, mas está definido como retornando int. Isso pode causar problemas em runtime se o valor de retorno for utilizado.

🔍 LÓGICAS COMPLEXAS:

**lib/app/utils/utils.dart:**
- Método validarSDK() possui lógica complexa com múltiplas condições aninhadas, dificultando a manutenção e compreensão do código.
- Função excede 50 linhas e tem complexidade ciclomática alta.

**lib/controller/home_controller.dart:**
- Controller não está injetado via GetIt, violando padrão arquitetural.
- MobX @observable mal implementado para a propriedade isLoading.
`.trim();

console.log('TESTE FINAL - Comentário complexo real:');
console.log('Resultado:', isValidReviewComment(complexRealComment, false) ? '✅ ACEITO' : '❌ REJEITADO');
console.log('Esta é a situação que você mencionou - deve ser ACEITO.'), console.log('');
