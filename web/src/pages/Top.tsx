import ProfileCard from "@/components/ProfileCard";
import RecordSummary from "@/components/RecordSummary";
import { Spinner } from "@/components/ui/spinner";
import { type Game, parse as parseSgf } from "@/dto/sgf";
import ConfirmImportModal from "@/modals/ConfirmImport";
import SelectSourceModal from "@/modals/SelectSource";
import { useRecordRepo } from "@/repos/record";
import { useUserRepo } from "@/repos/user";
import { playerName } from "@/utils/text";
import { parse } from "date-fns";
import { For, Suspense, createMemo } from "solid-js";
import { Box, Flex } from "../../styled-system/jsx";

export type GameWithId = Game & {
  id: number;
  player: { name: string; color: "Black" | "White" };
};

export default function TopPage() {
  const [user] = useUserRepo().select;
  const [records] = useRecordRepo().select;
  const [, deleteRecord] = useRecordRepo().delete;

  const games = createMemo(() => {
    const playerNameString = user?.()?.[0]?.()?.users_by_pk?.name ?? "";
    const playerColorFn = (blackName: string) =>
      blackName === playerName(user?.()?.[0]?.()?.users_by_pk?.id)
        ? "Black"
        : "White";
    const games = records?.()?.[0]?.()?.users_by_pk?.records?.map(
      (item): GameWithId => {
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
      },
    );
    games?.sort(
      (a, b) =>
        parse(b.metadata.date ?? "", "yyyy-m-d", new Date()).getTime() -
        parse(a.metadata.date ?? "", "yyyy-m-d", new Date()).getTime(),
    );
    return games;
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
            <For each={games()}>
              {(g) => (
                <RecordSummary game={g} onDelete={() => deleteRecord(g.id)} />
              )}
            </For>
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
