<p align="center">
  <a href="https://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

<p align="center">A progressive <a href="https://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

<p align="center">
    <a href="https://github.com/yannickcpnv/Nest-CarPricing-API/actions/workflows/node.js.yml" target="_blank">
        <img src="https://github.com/yannickcpnv/Nest-CarPricing-API/actions/workflows/node.js.yml/badge.svg" alt="Node.js CI" />
    </a>
</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

A car pricing api written with the [Nest](https://github.com/nestjs/nest) Framework

## Installation

```shell
$ yarn install
```

## Database

The database is Sqlite file based. The database files is located in the root of the project and each
files is named as the environment. For example, the database file for the development environment is
`dev.sqlite`.

The typeorm commands will call a js script that will ask the environment to run the command.
Sometimes it will ask multiple times for the environment, this is clearly not optimal, so just write
your environment each time it's asked.

````shell
# run migrations
$ yarn typeorm migrate

# run seeders. it can take some times to run them
$ yarn typeorm:seed

# run migrations with seeders
$ yarn typeorm:migrate:seed

# drop the database and run migration with seeders
$ yarn typeorm:seed:fresh
````

## Running the app

```shell
# development
$ yarn start:dev

# watch mode
$ yarn start:watch

# debug mode
$ yarn start:debug

# production mode
$ yarn start
```

The port used is `3000`.

## Usage

The api endpoints are located in controllers files, until a proper documentation is ready, just look
inside them to know how to call them.

There are requests files in the folder `requests`. They are a base for the api, feel free to edit
them or create new ones.

## Test

```shell
# unit tests
$ yarn test

# unit tests watch
$ yarn test:watch

# unit tests coverage
$ yarn test:cov

# e2e tests
$ yarn test:e2e
```

## Linters

```shell
# eslint
$ yarn eslint check

# eslint fix
$ yarn eslint:fix

# prettier check
$ yarn prettier

# prettier fix
$ yarn prettier:fix

# all linters check
$ yarn linters

# all linters fix
$ yarn linters:fix
```

## Docker

```shell
# build
$ yarn docker:build

# run
$ yarn docker:run
```

## Build

Maybe you just want to have a built folder, so you can run the command :

```shell
$ yarn build
```

## Stay in touch

- Author - [Yannick Baudraz](mailto:yannickbaudrazdev@gmail.com)
- Website - [Github](https://github.com/yannickcpnv)

---

## TODO

- API documentation : Maybe OpenAPI
