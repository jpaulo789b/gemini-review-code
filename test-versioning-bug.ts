import { isValidReviewComment, hasCriticalIssues } from './src/utils';

console.log('=== TESTE DO COMENTÁRIO DE VERSIONAMENTO ===\n');

// Teste do comentário real que apareceu
const versioningComment = `
O número da versão foi atualizado de 6.14.0+1 para 6.14.1+2019013955. Embora funcional, o esquema de numeração da versão com um número de construção tão longo (2019013955) não é ideal para legibilidade e manutenção. Considera um esquema mais conciso, talvez usando timestamps mais curtos ou um identificador incremental mais simples. Um sistema de versionamento semântico (SemVer) seria altamente recomendado.
`.trim();

console.log('Input:', versioningComment);
console.log('hasCriticalIssues:', hasCriticalIssues(versioningComment));
console.log('isValidReviewComment:', isValidReviewComment(versioningComment, false));
console.log('');

// Teste com variações similares
const versioningComment2 = `
A versão foi alterada de 1.0.0 para 1.1.0. Embora isso não seja um bug, recomenda-se usar versionamento semântico.
`.trim();

console.log('Input 2:', versioningComment2);
console.log('hasCriticalIssues:', hasCriticalIssues(versioningComment2));
console.log('isValidReviewComment:', isValidReviewComment(versioningComment2, false));
console.log('');

// Teste com outro exemplo
const versioningComment3 = `
O número da versão foi atualizado. Considera um esquema de versionamento mais estruturado.
`.trim();

console.log('Input 3:', versioningComment3);
console.log('hasCriticalIssues:', hasCriticalIssues(versioningComment3));
console.log('isValidReviewComment:', isValidReviewComment(versioningComment3, false));
console.log('');
