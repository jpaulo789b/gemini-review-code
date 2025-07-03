#!/bin/bash

# Exemplo de script para testar o comportamento da pipeline localmente

echo "=== TESTE DE PIPELINE - COMPORTAMENTO DE FALHA ==="
echo ""

# Simular execução do review
echo "🔍 Executando revisão de código..."
echo "📊 Simulando diferentes cenários:"
echo ""

# Cenário 1: Sem problemas críticos
echo "📝 Cenário 1: Código sem problemas críticos"
echo "=== RELATÓRIO FINAL DE REVISÃO ==="
echo "📊 Total de problemas críticos encontrados: 0"
echo "🚨 Erros grotescos: 0"
echo "⚠️  Erros graves: 0"
echo "🔍 Lógicas complexas: 0"
echo "🏗️  Problemas de build: 0"
echo ""
echo "✅ PIPELINE PASSOU!"
echo "🎉 Nenhum problema crítico encontrado. Merge liberado!"
echo "Exit code: 0"
echo ""

# Cenário 2: Apenas lógicas complexas
echo "📝 Cenário 2: Código com lógicas complexas"
echo "=== RELATÓRIO FINAL DE REVISÃO ==="
echo "📊 Total de problemas críticos encontrados: 2"
echo "🚨 Erros grotescos: 0"
echo "⚠️  Erros graves: 0"
echo "🔍 Lógicas complexas: 2"
echo "🏗️  Problemas de build: 0"
echo ""
echo "⚠️  PIPELINE PASSOU COM AVISOS"
echo "🔍 Foram encontradas 2 lógica(s) complexa(s) que merecem atenção, mas não impedem o merge."
echo "💡 Considere refatorar essas lógicas para melhorar a manutenibilidade."
echo "Exit code: 0"
echo ""

# Cenário 3: Problemas críticos
echo "📝 Cenário 3: Código com problemas críticos"
echo "=== RELATÓRIO FINAL DE REVISÃO ==="
echo "📊 Total de problemas críticos encontrados: 4"
echo "🚨 Erros grotescos: 2"
echo "⚠️  Erros graves: 1"
echo "🔍 Lógicas complexas: 1"
echo "🏗️  Problemas de build: 1"
echo ""
echo "❌ PIPELINE FALHOU!"
echo "🚨 Foram encontrados problemas críticos que impedem o merge:"
echo "   • 2 erro(s) grotesco(s) que podem quebrar a aplicação"
echo "   • 1 erro(s) grave(s) que violam padrões arquiteturais"
echo "   • 1 problema(s) de build que podem quebrar a CI/CD"
echo ""
echo "🔧 Corrija os problemas antes de fazer o merge."
echo "💡 Lógicas complexas não impedem o merge, mas merecem atenção."
echo "Exit code: 1"
echo ""

echo "=== RESUMO DOS COMPORTAMENTOS ==="
echo "✅ Exit code 0: Pipeline passa - Merge liberado"
echo "⚠️  Exit code 0: Pipeline passa com avisos - Merge liberado mas com atenção"
echo "❌ Exit code 1: Pipeline falha - Merge bloqueado"
echo ""
echo "🎯 Tipos que BLOQUEIAM o merge:"
echo "   • 🚨 Erros Grotescos"
echo "   • ⚠️  Erros Graves"
echo "   • 🏗️  Problemas de Build"
echo ""
echo "🔍 Tipos que NÃO BLOQUEIAM o merge:"
echo "   • 🔍 Lógicas Complexas (apenas avisos)"
echo ""

echo "=== CONFIGURAÇÃO GITLAB CI/CD ==="
echo "Para usar no GitLab CI/CD, adicione no .gitlab-ci.yml:"
echo ""
cat << 'EOF'
stages:
  - code-review

Review Automático:
  stage: code-review
  image: node:18
  script:
    - npm install @jpaulo789b/gemini-review-code-br -g
    - gemini-review-code-br -t "$GITLAB_TOKEN" -a "$API_KEY" -p "$CI_MERGE_REQUEST_PROJECT_ID" -m "$CI_MERGE_REQUEST_IID"
  only:
    - merge_requests
  when: on_success
  # A pipeline falhará automaticamente se exit code = 1
EOF
echo ""
echo "🔧 Configure as variáveis GITLAB_TOKEN e API_KEY no GitLab CI/CD!"
