import DeleteButton from "@/components/DeleteButton";
import ProfileCard from "@/components/ProfileCard";
import RecordDetail from "@/components/RecordDetail";
import RecordNotFound from "@/components/RecordNotFound";
import RecordSummary from "@/components/RecordSummary";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { IconButton } from "@/components/ui/icon-button";
import { Spinner } from "@/components/ui/spinner";
import { useSession } from "@/contexts/session";
import { type Game, parse as parseSgf } from "@/dto/sgf";
import useDeleteRecord from "@/hooks/deleteRecord";
import useFetchRecords from "@/hooks/fetchRecords";
import useFetchUser from "@/hooks/fetchUser";
import Base from "@/pages/Base";
import { playerName } from "@/utils/text";
import { XIcon } from "lucide-solid";
import {
  For,
  Show,
  Suspense,
  createEffect,
  createMemo,
  createSignal,
} from "solid-js";
import { css } from "../../styled-system/css";
import { Box, HStack, VStack } from "../../styled-system/jsx";

export type GameWithId = Game & {
  id: number;
  player: { name: string; color: "Black" | "White" };
};

export default function TopPage() {
  const { gqlClient, userId } = useSession();
  const [userRes, userFn] = useFetchUser(gqlClient);
  const [, data, recordsFn] = useFetchRecords(gqlClient);
  const [deleteRes, deleteFn] = useDeleteRecord(gqlClient);
  const [selectedGame, setSelectedGame] = createSignal<
    GameWithId | undefined
  >();

  createEffect(() => {
    userFn.setUserId(userId() ?? "");
    recordsFn.setUserId(userId() ?? "");
  });

  createEffect(() => {
    if (deleteRes?.[0].latest !== undefined) {
      recordsFn.reset();
    }
  });

  const stackedGames = createMemo(() => {
    const playerNameString = userRes?.[0]?.()?.users_by_pk?.name ?? "";
    const playerColorFn = (blackName: string) =>
      blackName === playerName(userRes?.[0]?.()?.users_by_pk?.id)
        ? "Black"
        : "White";
    return data.records().map((item): GameWithId => {
      const game = parseSgf(item.sgf_text)[0];
      const playerColor = playerColorFn(game.black.name ?? "");

      return {
        id: item.id,
        player: {
          name: playerNameString,
          color: playerColor,
        },
        ...game,
      };
    });
  });

  return (
    <Base>
      <Dialog.Root
        open={selectedGame() !== undefined}
        onOpenChange={() => setSelectedGame(undefined)}
        lazyMount
        unmountOnExit
      >
        <HStack gap="20px" alignItems="start">
          <VStack gap="10px" flexGrow="1">
            <Suspense
              fallback={
                <Box width="full">
                  <Spinner />
                </Box>
              }
            >
              <Show
                when={stackedGames().length > 0}
                fallback={<RecordNotFound />}
              >
                <For each={stackedGames()}>
                  {(g) => (
                    <Box
                      width="full"
                      position="relative"
                      class={css({ cursor: "pointer" })}
                    >
                      <Box
                        class={css({ cursor: "pointer" })}
                        onclick={() => setSelectedGame(g)}
                      >
                        <RecordSummary
                          game={g}
                          onDelete={() => deleteFn.setData(g.id)}
                        />
                      </Box>
                      <Box position="absolute" top={4} right={4}>
                        <DeleteButton onDelete={() => deleteFn.setData(g.id)} />
                      </Box>
                    </Box>
                  )}
                </For>
                <Show when={!data.last()}>
                  <Button variant="outline" onclick={recordsFn.next}>
                    続きを読み込む
                  </Button>
                </Show>
              </Show>
            </Suspense>
          </VStack>
          <Box minWidth="360px">
            <Suspense
              fallback={
                <Box width="full">
                  <Spinner />
                </Box>
              }
            >
              <ProfileCard name={userRes?.[0]?.()?.users_by_pk?.name ?? ""} />
            </Suspense>
          </Box>
        </HStack>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Box padding={4} width="480px">
              <Show when={selectedGame() !== undefined}>
                <RecordDetail sgfText={selectedGame()?.rawData ?? ""} />
              </Show>
            </Box>
            <Dialog.CloseTrigger
              asChild={(closeTriggerProps) => (
                <IconButton
                  {...closeTriggerProps()}
                  aria-label="閉じる"
                  variant="ghost"
                  size="sm"
                  position="absolute"
                  top="2"
                  right="2"
                >
                  <XIcon />
                </IconButton>
              )}
            />
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </Base>
  );
}
