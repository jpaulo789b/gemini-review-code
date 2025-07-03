# @jpaulo789b/gemini-review-code-br-br

[![npm version](https://badge.fury.io/js/%40hataiit9x%2Freview-code-ai.svg)](https://badge.fury.io/js/%40hataiit9x%2Freview-code-ai)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Summary

![](preview.png)

`@jpaulo789b/gemini-review-code-br` It is a small tool used for code review in GitLab Merge Requests. It supports calling the GitLab API for private 
deployment and uses the Gemini AI API to obtain review results. Please note that when using it, ensure compliance with company regulations. 😉


## Features

- 🛠️ Support configuration GitLab API address
- ⚙️ Support configuration Gemini API Key to implement load balancing of interface calls (multiple Keys are separated by commas)
- 📦 Support configuration Gemini custom model ID
- 📦 Support configuration GitLab Project ID
- 📦 Support configuration GitLab Merge Request ID
- 🚀 Support running in CI/CD
- 🚦 Automatically wait and try again when the rate limit is exceeded
- 💬 The review results are appended to the location of the corresponding code block in the form of comments


## Install

```sh
npm i @jpaulo789b/gemini-review-code-br
`````

## Use

### Use via shell script

```shell
Usage: gemini-review-code-br [options]
Options:
  -g, --gitlab-api-url <string>       GitLab API URL (default: " https://gitlab.com/api/v4")
  -t, --gitlab-access-token <string>  GitLab Access Token
  -a, --api-key <string>              Gemini API Key
  -p, --project-id <number>           GitLab Project ID
  -m, --merge-request-id <string>     GitLab Merge Request ID
  -c, --custom-model <string>         Custom Model ID, (default: "gemini-1.5-flash")
  -h, --help                          display help for command
```

Example:

```sh
gemini-review-code-br -g https://gitlab.com/api/v4 -t glpat-xxxxxxx -a AIzaSyAYNxxxxxxx,AIzaSyAYNxxxxxxx -p 1 -c gpt-3.5-turbo 432288 -m 8
```

### Use in CI

Set the `GITLAB_TOKEN` and `API_KEY` variables in GitLab CI/CD, `.gitlab-ci.yml` is as follows:

```yml
stages:
  - merge-request

Code Review:
  stage: merge-request  
  image: node:16
  script:
    - npm i @jpaulo789b/gemini-review-code-br -g
    - gemini-review-code-br -t "$GITLAB_TOKEN" -a "$API_KEY" -p "$CI_MERGE_REQUEST_PROJECT_ID" -m "$CI_MERGE_REQUEST_IID"
  only:
    - merge_requests
  when: on_success
```
# 🔧 Sistema de Review Aprimorado

## ✅ Implementação Concluída

O sistema agora detecta e comenta três tipos principais de problemas:

### 🚨 **ERROS GROTESCOS** (Críticos - Quebram a aplicação)
- Crashes/Exceptions não tratadas
- Memory leaks evidentes
- Null pointer exceptions
- Threading issues
- State management quebrado

### ⚠️ **ERROS GRAVES** (Violam padrões arquiteturais)
- Classes Controller sem padrão correto
- Widgets sem prefixo DS
- MobX mal implementado
- Controllers não injetados
- Uso de widgets nativos em vez do design system

### 🔍 **LÓGICAS COMPLEXAS** (Merecem atenção)
- Métodos com mais de 50 linhas
- Aninhamento excessivo (mais de 4 níveis)
- Loops complexos
- Lógicas hardcoded
- Funções com muitos parâmetros
- Magic numbers/strings
- Padrões anti-arquiteturais
- Violação de princípios SOLID
- Acoplamento excessivo

## 🎯 Comportamento do Sistema

### ✅ **Comentará quando encontrar:**
```
🚨 ERROS GROTESCOS:
- Null pointer exception na linha 15
- Async/await mal implementado

⚠️ ERROS GRAVES:
- Widget Button usado em vez de DSbotaoPadrao
- Controller não injetado via GetIt

🔍 LÓGICAS COMPLEXAS:
- Método com 75 linhas e complexidade ciclomática alta
- Aninhamento excessivo de condicionais (6 níveis)
- Lógica de negócio hardcoded sem abstração
```

### ❌ **NÃO comentará quando:**
```
"Nenhum problema crítico encontrado."
"Apenas mudança de formatação"
"Alteração de texto simples"
"Mudança de tradução"
```

## 📊 Logs Informativos

O sistema agora mostra logs detalhados:

```
✅ Comentário adicionado - ERRO GROTESCO encontrado
📄 Arquivo: lib/controllers/usuario_controller.dart

✅ Comentário adicionado - LÓGICA COMPLEXA encontrado  
📄 Arquivo: lib/widgets/formulario_widget.dart

ℹ️  Nenhum problema crítico encontrado - comentário não adicionado
📝 Resposta do Gemini: Nenhum problema crítico encontrado...
```

## 🚀 Benefícios

1. **Reduz ruído**: Elimina comentários desnecessários
2. **Foca no importante**: Prioriza problemas críticos
3. **Melhora qualidade**: Identifica lógicas complexas
4. **Facilita manutenção**: Detecta violações de padrões
5. **Aumenta produtividade**: Evita reviews irrelevantes

O sistema está pronto para uso e irá comentar apenas quando realmente necessário! 🎉

## contribute
Welcome to contribute code, ask questions and suggestions! 👏

## License
This project is based on the MIT license. See the LICENSE file for details. 📜
