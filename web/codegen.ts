import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: [
    {
      "http://localhost:20002/v1/graphql": {
        headers: {
          "x-hasura-admin-secret": "hasura",
          "x-hasura-role": "user",
        },
      },
    },
  ],
  documents: ["./src/**/*.tsx", "./src/**/*.ts"],
  ignoreNoDocuments: true,
  overwrite: true,
  generates: {
    "./src/generated/graphql.ts": {
      plugins: ["typescript", "typescript-operations"],
    },
  },
};

export default config;
