import { isValidReviewComment, hasCriticalIssues } from './src/utils';

console.log('=== TESTE DE VALIDAÇÃO DE COMENTÁRIOS ===\n');

// Teste do caso do método validarSDK
const validarSDKComment = `
⚠️ ERROS GRAVES:

**lib/app/utils/utils.dart:**
- Método \`validarSDK()\` não retorna um valor, mas está definido como retornando \`int\`. Isso pode causar problemas em runtime se o valor de retorno for utilizado.

🔍 LÓGICAS COMPLEXAS:

**lib/app/utils/utils.dart:**
- Método \`validarSDK()\` possui lógica complexa com múltiplas condições aninhadas, dificultando a manutenção e compreensão do código.
`.trim();

console.log('1. Teste do método validarSDK:');
console.log('Input:', validarSDKComment);
console.log('hasCriticalIssues:', hasCriticalIssues(validarSDKComment));
console.log('isValidReviewComment:', isValidReviewComment(validarSDKComment, false));
console.log('');

// Teste de comentário sobre versionamento (deve ser rejeitado)
const versionComment = `
O número da versão foi alterado de 1.0.0 para 1.0.1. Embora isso não seja um bug, recomenda-se usar uma convenção de versionamento consistente.
`.trim();

console.log('2. Teste de comentário sobre versionamento:');
console.log('Input:', versionComment);
console.log('hasCriticalIssues:', hasCriticalIssues(versionComment));
console.log('isValidReviewComment:', isValidReviewComment(versionComment, false));
console.log('');

// Teste de comentário sobre legibilidade (deve ser rejeitado)
const legibilityComment = `
O código teve sua legibilidade ligeiramente reduzida. Considera-se uma revisão da estrutura anterior para manter a clareza.
`.trim();

console.log('3. Teste de comentário sobre legibilidade:');
console.log('Input:', legibilityComment);
console.log('hasCriticalIssues:', hasCriticalIssues(legibilityComment));
console.log('isValidReviewComment:', isValidReviewComment(legibilityComment, false));
console.log('');

// Teste de comentário técnico válido (deve ser aceito)
const technicalComment = `
🚨 ERROS GROTESCOS:

**lib/controller/home_controller.dart:**
- Método \`fetchData()\` pode causar null pointer exception quando \`response.data\` é null.
- Async/await implementado incorretamente, causando crash da aplicação.
`.trim();

console.log('4. Teste de comentário técnico válido:');
console.log('Input:', technicalComment);
console.log('hasCriticalIssues:', hasCriticalIssues(technicalComment));
console.log('isValidReviewComment:', isValidReviewComment(technicalComment, false));
console.log('');

// Teste de comentário misto (tem conteúdo técnico E irrelevante)
const mixedComment = `
O número da versão foi alterado. Embora isso não seja um bug, também identifiquei que o método pode causar null pointer exception quando usado incorretamente.
`.trim();

console.log('5. Teste de comentário misto:');
console.log('Input:', mixedComment);
console.log('hasCriticalIssues:', hasCriticalIssues(mixedComment));
console.log('isValidReviewComment:', isValidReviewComment(mixedComment, false));
console.log('');

// Teste de comentário "Nenhum problema crítico encontrado" (deve ser rejeitado)
const noIssuesComment = `
Nenhum problema crítico encontrado.
`.trim();

console.log('6. Teste de comentário "Nenhum problema crítico encontrado":');
console.log('Input:', noIssuesComment);
console.log('hasCriticalIssues:', hasCriticalIssues(noIssuesComment));
console.log('isValidReviewComment:', isValidReviewComment(noIssuesComment, false));
console.log('');
