import Board from "@/components/Board";
import GameEditorForm from "@/components/GameEditorForm";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useSession } from "@/contexts/session";
import type { Game } from "@/dto/sgf";
import useInsertRecord from "@/hooks/insertRecord";
import Base from "@/pages/Base";
import { useNavigate } from "@solidjs/router";
import { format } from "date-fns";
import { type JSX, Show, createEffect, createSignal } from "solid-js";
import { Box, HStack, VStack } from "../../../styled-system/jsx";

type Props = {
  game: Game | undefined;
  children: JSX.Element;
};

export default function ImporterPage(props: Props) {
  const navigate = useNavigate();
  const { gqlClient } = useSession();
  const [modifiedGame, setModifiedGame] = createSignal<Game | undefined>();
  const [queryResult, insertRecordFn] = useInsertRecord(gqlClient);

  const register = () => {
    insertRecordFn.setData(
      modifiedGame()?.metadata.date ?? format(new Date(), "yyyy-MM-dd"),
      modifiedGame()?.rawData ?? "",
    );
  };

  createEffect(() => {
    if (queryResult?.[0].latest !== undefined) {
      navigate("/", { replace: true });
    }
  });

  return (
    <Base isModal={true}>
      <Show when={props.game} fallback={props.children}>
        <HStack gap={4} justifyContent="center">
          <Box>
            <Board
              // biome-ignore lint/style/noNonNullAssertion: prechecked
              sgfText={props.game!.rawData}
              size="480px"
              static
            />
          </Box>
          <VStack gap={4}>
            <Card.Root>
              <Card.Header paddingBottom={0} />
              <Card.Body>
                <GameEditorForm
                  // biome-ignore lint/style/noNonNullAssertion: prechecked
                  game={props.game!}
                  playerId={""}
                  setGame={setModifiedGame}
                />
              </Card.Body>
            </Card.Root>
            <Button
              width="full"
              onclick={register}
              disabled={queryResult?.[0].loading}
            >
              登録
            </Button>
          </VStack>
        </HStack>
      </Show>
    </Base>
  );
}
