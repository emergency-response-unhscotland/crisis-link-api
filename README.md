## Description

A NestJS API for the Crisis Link app used to manage api calls from the Crisis Link app.

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm start

# watch mode
$ pnpm start:dev

# production mode
$ pnpm start:prod
```

## Building the app

```bash
# build
$ pnpm build

# deploying migrations
$ pnpm prisma:deploy
```

## Running the database

```bash
# removeing database
$ pnpm db:rm

# deploying database
$ pnpm db:up

# database restart
$ pnpm db:restart

# linux/macOS database restart
$ pnpm db:restart:linux
```

## Test

```bash
# unit tests
$ pnpm test

# e2e tests
$ pnpm test:e2e

# test coverage
$ pnpm test:cov
```

## Support

Crisis Link is an GNU-licensed open source project. It is supported by volunteers, to help support the project, please consider contributing development time by submitting a pull request.

## License

Crisis Link is [GNU licensed](LICENSE).
