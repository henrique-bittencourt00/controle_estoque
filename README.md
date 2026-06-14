# Sistema de Controle de Estoque (CLI)

Este é um sistema de gerenciamento de estoque executado via Linha de Comando (CLI), desenvolvido em **Node.js**. O objetivo da aplicação é auxiliar pequenos e microempreendedores no gerenciamento diário de seus produtos, permitindo operações de controle de forma rápida, eficiente e segura.

## Tecnologias e Ferramentas Utilizadas

- **Node.js** — Ambiente de execução base do projeto.
- **Supabase** — Banco de dados utilizado para persistência dos produtos.
- **Docker** — Containerização da aplicação para facilitar a execução em qualquer ambiente.
- **Jest** — Framework utilizado para a criação e execução dos testes automatizados.
- **ESLint** — Ferramenta configurada para garantir a padronização e qualidade do código.
- **GitHub Actions (CI/CD)** — Integração Contínua configurada para executar automaticamente os testes e o linting a cada novo push no repositório.

## Executar o projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) instalado, **ou**
- [Docker](https://www.docker.com/) instalado

### Configuração das variáveis de ambiente

```bash
cp .env.example .env
cp config.example.js config.js
```

Preencha os arquivos `.env` e `config.js` com suas credenciais do Supabase.

### Rodando com Node.js

```bash
git clone https://github.com/henrique-bittencourt00/controle_estoque.git
cd controle_estoque
npm install
node index.js
```

### Rodando com Docker

```bash
docker compose run --rm app
```

## Testes e Qualidade de Código

```bash
npm test       # executa os testes automatizados
npm run lint   # verifica a qualidade do código
```

## Deploy

Acesse a interface web em: https://henrique-bittencourt00.github.io/controle_estoque/
