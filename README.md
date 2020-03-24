# Vamos Ajudar (pt-br)

en: API built with Node.js to approach collaborators and Ongs. To access the web version go to:

```
https://github.com/marciofrancalima/vamosajudar-web
```

API desenvolvida com Node.js que faz parte de uma aplicação para aproximar colaboradores e ONGs que precisam de ajuda.

## Technologies

Tecnologias usadas para este desenvolvimento:

- [Node.js](https://nodejs.org/en/)
- [SQLite](https://sqlite.org/index.html)
- [Knex](https://knexjs.org/)
- [Express](https://github.com/expressjs/express)

ESLint, Prettier e EditorConfig também foram usados para manter o padrão na escrita do código.

## Funcionalidades

- Login
- Cadastrar e listar ONGs;
- Cadastrar, listar e excluir casos;

## Como rodar a aplicação

Siga as instruções abaixo

```bash
# Clonar o repositório
$ git clone https://github.com/marciofrancalima/vamosajudar-api.git (or use ssh)

# Acessar o diretório
$ cd vamosajudar-api

# Instalar as dependências (npm ou yarn)
$ yarn install

# Iniciar a aplicação (npm ou yarn)
$ yarn start
```

Antes de executar a aplicação, certifique-se antes de rodar as migrations das tabelas para criar o banco de dados:

```bash
$ npx knex migrate:latest
```

---

Made with ♥ by Márcio França Lima. [Contact me](https://www.linkedin.com/in/m%C3%A1rcio-fran%C3%A7a-lima-916454187/)
