import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useGqlClient } from "@/drivers/gqlClient";
import type {
  GetRecordsQuery,
  GetRecordsQueryVariables,
} from "@/generated/graphql";
import { isLocal } from "@/utils/env";
import { useAuth0 } from "@afroze9/solid-auth0";
import { gql } from "@solid-primitives/graphql";
import {
  For,
  Match,
  Suspense,
  Switch,
  createEffect,
  createMemo,
} from "solid-js";
import { Box, Center, VStack } from "../styled-system/jsx";

const query = gql`
query GetRecords {
  records {
    id
    sgf_text
  }
}
`;

export default function Sandbox() {
  const auth0 = useAuth0();
  const [client, isSignedIn, setToken] = useGqlClient();
  const response = createMemo(() => {
    if (isSignedIn()) {
      return client?.()?.<GetRecordsQuery, GetRecordsQueryVariables>(query);
    }
  });

  createEffect(async () => {
    if (!isLocal() && auth0?.isAuthenticated()) {
      const token = await auth0.getToken();
      setToken(token);
    }
  });

  return (
    <Center height="100vh">
      <VStack gap={5}>
        <Suspense
          fallback={
            <Box>
              <Spinner />
            </Box>
          }
        >
          <Switch>
            <Match when={isLocal() && !isSignedIn()}>
              <Button onclick={() => setToken("dev_user")}>
                Sign in (dev)
              </Button>
            </Match>
            <Match when={isLocal() && isSignedIn()}>
              <Button onclick={() => setToken("")}>Sign out (dev)</Button>
            </Match>
            <Match when={!isLocal() && auth0.isLoading()}>
              <Box>
                <Spinner />
              </Box>
            </Match>
            <Match when={!isLocal() && !auth0?.isAuthenticated()}>
              <Button onclick={() => auth0?.loginWithRedirect()}>
                Sign in
              </Button>
            </Match>
            <Match when={!isLocal() && auth0?.isAuthenticated()}>
              <>
                <Box>Hello, {auth0?.user?.()?.name}</Box>
                <Button onclick={() => auth0?.logout()}>Sign out</Button>
              </>
            </Match>
          </Switch>
          <For each={response?.()?.[0]?.()?.records}>
            {(item) => (
              <Box
                maxWidth="500px"
                overflow="hidden"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
              >
                {item.id}: {item.sgf_text}
              </Box>
            )}
          </For>
        </Suspense>
      </VStack>
    </Center>
  );
}
