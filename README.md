# @jpaulo789b/gemini-review-code-br

[![npm version](https://badge.fury.io/js/%40hataiit9x%2Freview-code-ai.svg)](https://badge.fury.io/js/%40hataiit9x%2Freview-code-ai)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📋 Resumo

![](preview.png)

**Revisor inteligente de código Flutter/Dart** que analisa Merge Requests no GitLab usando IA do Google Gemini. 

Focado em identificar **apenas problemas críticos** que realmente importam:
- 🚨 Erros que quebram a aplicação
- ⚠️ Violações de padrões arquiteturais
- 🔍 Lógicas complexas que prejudicam manutenibilidade
- 🏗️ Problemas de configuração que quebram builds

**Elimina ruído** ignorando formatação, comentários e mudanças menores.

## ✨ Funcionalidades

- 🎯 **Análise inteligente**: Foca apenas em problemas críticos
- 🏗️ **Detecção de build**: Identifica configurações que quebram CI/CD
- � **Filtragem automática**: Ignora arquivos irrelevantes
- � **Integração GitLab**: Comentários diretos no Merge Request
- � **Rate limiting**: Controle automático de requisições
- � **Multi-chaves**: Balanceamento de carga com múltiplas API keys
- ⚙️ **Configurável**: Modelos customizáveis do Gemini

## 🚀 Instalação

```bash
npm install @jpaulo789b/gemini-review-code-br -g
```

## 📖 Como Usar

### Via linha de comando

```bash
gemini-review-code-br \
  -g https://gitlab.com/api/v4 \
  -t glpat-xxxxxxx \
  -a AIzaSyAYNxxxxxxx \
  -p 123456 \
  -m 42
```

### Parâmetros

| Parâmetro | Descrição | Padrão |
|-----------|-----------|---------|
| `-g, --gitlab-api-url` | URL da API do GitLab | `https://gitlab.com/api/v4` |
| `-t, --gitlab-access-token` | Token de acesso do GitLab | - |
| `-a, --api-key` | Chave da API do Gemini (múltiplas separadas por vírgula) | - |
| `-p, --project-id` | ID do projeto no GitLab | - |
| `-m, --merge-request-id` | ID do Merge Request | - |
| `-c, --custom-model` | Modelo personalizado do Gemini | `gemini-1.5-flash` |

### Integração com GitLab CI/CD

Configure as variáveis `GITLAB_TOKEN` e `API_KEY` no GitLab CI/CD:

```yaml
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
```

### 🚨 **Controle de Pipeline**

O sistema **automaticamente falha a pipeline** quando encontra problemas críticos:

#### **Pipeline FALHA (exit code 1) quando encontra:**
- 🚨 **Erros Grotescos** - Problemas que quebram a aplicação
- ⚠️ **Erros Graves** - Violações arquiteturais críticas  
- 🏗️ **Problemas de Build** - Configurações que quebram CI/CD

#### **Pipeline PASSA com avisos (exit code 0) quando encontra:**
- 🔍 **Lógicas Complexas** - Merecem atenção, mas não impedem merge

#### **Pipeline PASSA completamente (exit code 0) quando:**
- ✅ **Nenhum problema crítico** - Merge liberado

### **Exemplo de Saída da Pipeline:**

```bash
=== RELATÓRIO FINAL DE REVISÃO ===
📊 Total de problemas críticos encontrados: 3
🚨 Erros grotescos: 2
⚠️  Erros graves: 1
🔍 Lógicas complexas: 0
🏗️  Problemas de build: 0

❌ PIPELINE FALHOU!
🚨 Foram encontrados problemas críticos que impedem o merge:
   • 2 erro(s) grotesco(s) que podem quebrar a aplicação
   • 1 erro(s) grave(s) que violam padrões arquiteturais

🔧 Corrija os problemas antes de fazer o merge.
💡 Lógicas complexas não impedem o merge, mas merecem atenção.
```
## � O Que Analisa

### ✅ **Detecta e Comenta:**

#### 🚨 **Erros Críticos** (Quebram a aplicação)
- Null pointer exceptions e tipos nullable incorretos
- Crashes e exceções não tratadas  
- Problemas de threading (async/await mal implementados)
- Memory leaks evidentes
- State management quebrado (MobX mal implementado)

#### ⚠️ **Violações Arquiteturais** (Padrões do projeto)
- Controllers sem padrão `Controlador[Funcionalidade]`
- Widgets sem prefixo DS do design system
- Controllers não injetados via GetIt
- Uso de widgets nativos em vez do design system
- ServiceStatus não implementado para loading/erro

#### 🔍 **Lógicas Complexas** (Prejudicam manutenibilidade)
- Métodos com mais de 50 linhas
- Aninhamento excessivo (mais de 4 níveis)
- Lógicas hardcoded sem abstração
- Magic numbers e strings
- Violação de princípios SOLID
- Acoplamento excessivo entre classes

#### 🏗️ **Problemas de Build** (Quebram CI/CD)
- Sintaxe inválida em arquivos de configuração
- Dependências incompatíveis ou ausentes
- Configurações de segurança comprometidas
- Permissões excessivas desnecessárias

### ❌ **Ignora Completamente:**
- Formatação, espaços e quebras de linha
- Comentários e documentação
- Nomes de variáveis locais
- Alterações em textos e traduções
- Pequenos ajustes de configuração
- Placeholders substituídos no build

## � Arquivos Processados

### 🔄 **Analisados (Código Dart)**
- `lib/**/*.dart` - Controllers, Services, Models, Widgets

### 🏗️ **Analisados (Configuração de Plataforma)**
- `AndroidManifest.xml` - Configurações Android
- `build.gradle` - Dependências e build Android
- `Info.plist` - Configurações iOS
- `pubspec.yaml` - Dependências Flutter

### 🚫 **Ignorados Automaticamente**
- `*.g.dart`, `*.freezed.dart` - Arquivos gerados
- `*_test.dart`, `test/` - Arquivos de teste
- Assets (imagens, fontes, etc.)
- Documentação (README, CHANGELOG)
- Configurações de IDE (.vscode, .idea)

## 📊 Exemplo de Uso

### 💬 **Comentários Gerados**

```
🚨 ERRO CRÍTICO:
Null pointer exception detectado na linha 23. 
O método getUserName() pode retornar null mas não está sendo tratado.

⚠️ VIOLAÇÃO ARQUITETURAL:
Widget Button sendo usado em vez de DSbotaoPadrao do design system.
Isso quebra a consistência visual da aplicação.

🔍 LÓGICA COMPLEXA:
Método processUserData() com 87 linhas e aninhamento de 6 níveis.
Considere extrair essa lógica em métodos menores.

🏗️ PROBLEMA DE BUILD:
Dependência flutter_bloc: ^8.0.0 incompatível com provider: ^5.0.0.
Isso pode causar falhas na compilação.
```

### 🔇 **Situações Ignoradas**

```
✅ Formatação de código ajustada
✅ Comentário adicionado na linha 15
✅ String de tradução alterada
✅ Placeholder ${APP_NAME} em AndroidManifest.xml
✅ Versão atualizada de 1.0.0 para 1.0.1
```

## 📈 Logs do Sistema

```bash
🔍 Analisando arquivo DART: lib/controllers/usuario_controller.dart
✅ Comentário adicionado - ERRO CRÍTICO encontrado
📄 Arquivo: lib/controllers/usuario_controller.dart

🔍 Analisando arquivo PLATAFORMA: android/app/src/main/AndroidManifest.xml
ℹ️  Nenhum problema crítico encontrado - comentário não adicionado
📝 Resposta: Nenhum problema crítico encontrado.

🚫 Ignorando arquivo: lib/models/user.g.dart (arquivo gerado)
```

## 🎯 Benefícios

✅ **Reduz ruído** - Elimina 90% dos comentários desnecessários  
✅ **Foca no essencial** - Apenas problemas que realmente importam  
✅ **Acelera reviews** - Desenvolvedores focam no que é crítico  
✅ **Melhora qualidade** - Detecta problemas complexos e padrões  
✅ **Protege CI/CD** - Previne quebras de build antes do merge  
✅ **Economiza tempo** - Automação inteligente do processo de review  

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para:
- Reportar bugs
- Sugerir melhorias  
- Enviar pull requests
- Compartilhar casos de uso

## 📄 Licença

Este projeto está licenciado sob a MIT License. Veja o arquivo [LICENSE](LICENSE) para detalhes.

---

**Desenvolvido para projetos Flutter/Dart com foco em qualidade e produtividade** �
