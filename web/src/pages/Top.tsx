import ProfileCard from "@/components/ProfileCard";
import RecordNotFound from "@/components/RecordNotFound";
import RecordSummary from "@/components/RecordSummary";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useSession } from "@/contexts/session";
import { type Game, parse as parseSgf } from "@/dto/sgf";
import useDeleteRecord from "@/hooks/deleteRecord";
import useFetchRecords from "@/hooks/fetchRecords";
import useFetchUser from "@/hooks/fetchUser";
import Base from "@/pages/Base";
import { playerName } from "@/utils/text";
import { For, Show, Suspense, createEffect, createMemo } from "solid-js";
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
                  <RecordSummary
                    game={g}
                    onDelete={() => deleteFn.setData(g.id)}
                  />
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
    </Base>
  );
}
