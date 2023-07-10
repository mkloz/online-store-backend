<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

  <p align="center">Online store API on NestJS</p>

## Description

API where saved all information about online store.

## Installation

```bash
$ npm i
```

## Running the app

Set all environment variable(.env file in the root of project, .env.example as example of file) and constants. Then run the application

```bash
# Building
$ npm run build
# Up migrations
$ npm run migration:run
# Seeding
$ npm run seed:run
# After that you can start
$ npm run start
```

Start with docker compose
Set all variables in .env file(instead DB_HOST=localhost you should use DB_HOST=mysql)

```bash
# Start app
$ docker-compose up
#Stop the app
^C #in the same terminal or
$ docker-compose down
```

## Documentation

Swagger is used here. Api documentation is located on route `/api/docs`
