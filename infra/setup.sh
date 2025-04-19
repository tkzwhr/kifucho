#!/usr/bin/env sh

# Install hasura-cli
if [ -z `which hasura` ]; then
  curl -L https://github.com/hasura/graphql-engine/raw/stable/cli/get.sh | bash
else
  echo "Hasura CLIはインストール済みです。"
fi
