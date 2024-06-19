## Description
- Test project on Node.js and Nest.js

## Installation

## Environment
- Run command cp .env.example .env

```bash
#development
$ npm install
```

## Running the app

```bash
# development
$ npm run start:dev
```

## Details of the database

```bash
# database creation
$ npm run typeorm migration:generate src/migrations/CreateSomeEntity

# pulling up the database
$ npm run typeorm migration:run

# deleting a database
$ npm run typeorm schema:drop
```

## Swagger project documentation
- This link leads to the API documentation (http://localhost:3001/docs)
