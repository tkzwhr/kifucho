import { isLocal } from "@/utils/env";
import {
  type GraphQLClientQuery,
  createGraphQLClient,
} from "@solid-primitives/graphql";
import {
  type Accessor,
  type Setter,
  createMemo,
  createRoot,
  createSignal,
} from "solid-js";

function createGqlClient(): [
  Accessor<GraphQLClientQuery>,
  Accessor<boolean>,
  Setter<string>,
] {
  const [token, setToken] = createSignal("");

  const isSignedIn = () => token() !== "";

  const client = createMemo(() => {
    if (isLocal()) {
      return createGraphQLClient(import.meta.env.VITE_GRAPHQL_ENDPOINT, {
        headers: {
          "x-hasura-admin-secret": "hasura",
          "x-hasura-role": "user",
          "x-hasura-user-id": token() ?? "",
        },
      });
    }

    return createGraphQLClient(import.meta.env.VITE_GRAPHQL_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${token() ?? ""}`,
      },
    });
  });

  return [client, isSignedIn, setToken];
}

const GqlClient = createRoot(createGqlClient);

export function useGqlClient() {
  return GqlClient;
}
