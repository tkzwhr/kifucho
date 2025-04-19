棋譜帳 (Kifucho)
==

囲碁の棋譜を管理するWebツールです。

## Requirements

- Docker
- pnpm v10 (with Node v22)
- [Hasura CLI](https://hasura.io/docs/2.0/hasura-cli/install-hasura-cli/)

## Usage

### インフラ

セットアップ

```shell
pnpm infra on
pnpm infra hsr:setup
```

Hasuraコンソールの起動

```shell
pnpm infra hsr:dev
```
