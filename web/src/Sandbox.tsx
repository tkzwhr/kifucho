import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { useGqlClient } from "@/drivers/gqlClient";
import { useRecordRepo } from "@/repos/record";
import { useUserRepo } from "@/repos/user";
import { isLocal } from "@/utils/env";
import { useAuth0 } from "@afroze9/solid-auth0";
import { parse } from "@sabaki/sgf";
import {
  For,
  Match,
  Show,
  Suspense,
  Switch,
  createEffect,
  createSignal,
} from "solid-js";
import { Box, Center, HStack, VStack } from "../styled-system/jsx";

export default function Sandbox() {
  const auth0 = useAuth0();
  const [, isSignedIn, setToken] = useGqlClient();
  const [user, setUserId1] = useUserRepo().select;
  const setUserId2 = useRecordRepo().setUserId;
  const [, records, last, setSelectedPage] = useRecordRepo().select;
  const [insertResult, setInsertParams] = useRecordRepo().insert;
  const [deleteResult, setRecordId] = useRecordRepo().delete;
  const [text, setText] = createSignal("");

  createEffect(async () => {
    let userId: string | undefined = undefined;

    if (isLocal()) {
      userId = isSignedIn() ? "dev_user" : undefined;
    } else if (auth0?.isAuthenticated()) {
      const token = await auth0.getToken();
      setToken(token);

      userId = auth0?.user?.()?.sub;
    }

    setUserId1(userId);
    setUserId2(userId);
  });

  createEffect(() => {
    if (insertResult?.()?.[0]?.state === "ready") {
      setText("");
    }
    if (!insertResult?.()?.[0]?.loading) {
      setInsertParams();
    }
  });

  createEffect(() => {
    if (!deleteResult?.()?.[0]?.loading) {
      setRecordId();
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
                <Box>Hello, {user?.()?.[0]?.()?.users_by_pk?.name}</Box>
                <Button onclick={() => auth0?.logout()}>Sign out</Button>
              </>
            </Match>
          </Switch>
          <For each={records()}>
            {(item) => (
              <HStack>
                <Box
                  maxWidth="500px"
                  overflow="hidden"
                  whiteSpace="nowrap"
                  textOverflow="ellipsis"
                >
                  {item.id}: [{item.played_at}] {JSON.stringify(parse(item.sgf_text ?? ""))}
                </Box>
                <Button
                  onclick={() => setRecordId(item.id)}
                  size="xs"
                  variant="outline"
                >
                  x
                </Button>
              </HStack>
            )}
          </For>
          <Show when={isSignedIn() && !last()}>
            <Button
              onclick={() => setSelectedPage((v) => v + 1)}
              size="xs"
              variant="outline"
            >
              Load more
            </Button>
          </Show>
          <Show when={isSignedIn() && last()}>
            <Button
              onclick={() => setSelectedPage(0)}
              size="xs"
              variant="outline"
            >
              Reload
            </Button>
          </Show>
          <HStack>
            <Textarea
              onkeyup={(e) => setText(e.currentTarget.value)}
              prop:value={text()}
            >
              {text()}
            </Textarea>
            <Button onclick={() => setInsertParams([new Date(), text()])}>
              Send!
            </Button>
          </HStack>
        </Suspense>
      </VStack>
    </Center>
  );
}
