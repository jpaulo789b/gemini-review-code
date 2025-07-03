import { isPlatformFile, isValidReviewComment, hasCriticalIssues } from './src/utils';

console.log('=== TESTE DE ARQUIVO PUBSPEC.YAML ===\n');

// Verificar se pubspec.yaml é tratado como arquivo de plataforma
const isPubspecPlatform = isPlatformFile('pubspec.yaml');
console.log('pubspec.yaml é arquivo de plataforma?', isPubspecPlatform);
console.log('');

// Teste do comentário real que apareceu no pubspec.yaml
const versioningComment = `
O número da versão foi atualizado de 6.14.0+1 para 6.14.1+2019013955. Embora funcional, o esquema de numeração da versão com um número de construção tão longo (2019013955) não é ideal para legibilidade e manutenção. Considera um esquema mais conciso, talvez usando timestamps mais curtos ou um identificador incremental mais simples. Um sistema de versionamento semântico (SemVer) seria altamente recomendado.
`.trim();

console.log('=== TESTE COMO ARQUIVO DART ===');
console.log('isValidReviewComment (como .dart):', isValidReviewComment(versioningComment, false));
console.log('');

console.log('=== TESTE COMO ARQUIVO DE PLATAFORMA ===');
console.log('isValidReviewComment (como plataforma):', isValidReviewComment(versioningComment, true));
console.log('');

// Verificar se o comentário está sendo classificado como crítico
console.log('=== ANÁLISE DE CRITICIDADE ===');
console.log('hasCriticalIssues:', hasCriticalIssues(versioningComment));
console.log('');
