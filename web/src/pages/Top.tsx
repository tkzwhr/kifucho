import ProfileCard from "@/components/ProfileCard";
import RecordNotFound from "@/components/RecordNotFound";
import RecordSummary from "@/components/RecordSummary";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { type Game, parse as parseSgf } from "@/dto/sgf";
import ConfirmImportModal from "@/modals/ConfirmImport";
import SelectSourceModal from "@/modals/SelectSource";
import { useRecordRepo } from "@/repos/record";
import { useUserRepo } from "@/repos/user";
import { playerName } from "@/utils/text";
import { For, Show, Suspense, createEffect, createMemo } from "solid-js";
import { Box, Flex } from "../../styled-system/jsx";

export type GameWithId = Game & {
  id: number;
  player: { name: string; color: "Black" | "White" };
};

export default function TopPage() {
  const [user] = useUserRepo().select;
  const [, records, last, setSelectedPage] = useRecordRepo().select;
  const [deleteResult, setDeleteRecordId] = useRecordRepo().delete;

  const stackedGames = createMemo(() => {
    const playerNameString = user?.()?.[0]?.()?.users_by_pk?.name ?? "";
    const playerColorFn = (blackName: string) =>
      blackName === playerName(user?.()?.[0]?.()?.users_by_pk?.id)
        ? "Black"
        : "White";
    return records?.()?.map((item): GameWithId => {
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

  createEffect(() => {
    if (!deleteResult?.()?.[0]?.loading) {
      setDeleteRecordId();
    }
  });

  return (
    <>
      <Flex gap="20px" alignItems="start">
        <Flex direction="column" gap="10px" grow="1">
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
                    onDelete={() => setDeleteRecordId(g.id)}
                  />
                )}
              </For>
              <Show when={!last()}>
                <Button
                  variant="outline"
                  onclick={() => setSelectedPage((v) => v + 1)}
                >
                  続きを読み込む
                </Button>
              </Show>
            </Show>
          </Suspense>
        </Flex>
        <Flex minWidth="360px">
          <Suspense
            fallback={
              <Box width="full">
                <Spinner />
              </Box>
            }
          >
            <ProfileCard name={user?.()?.[0]?.()?.users_by_pk?.name ?? ""} />
          </Suspense>
        </Flex>
      </Flex>
      <SelectSourceModal />
      <ConfirmImportModal />
    </>
  );
}
