import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { type Game, parse } from "@/dto/sgf";
import ImporterPage from "@/pages/import/Importer";
import { createSignal } from "solid-js";
import { Stack, VStack } from "../../../styled-system/jsx";

export default function ImportTextPage() {
  const [text, setText] = createSignal("");
  const [game, setGame] = createSignal<Game | undefined>();

  const submit = () => {
    const games = parse(text());
    if (games.length > 0) {
      setGame(games[0]);
    }
  };

  return (
    <ImporterPage game={game()}>
      <Card.Root>
        <Card.Header paddingBottom={0} />
        <Card.Body>
          <VStack>
            <Textarea
              id="description"
              placeholder="(;GM[1]FF[4]SZ[9];B[cc];W[gg];B[gc];W[cg])"
              rows={5}
              onkeyup={(ev) => setText(ev.currentTarget.value)}
            >
              {text()}
            </Textarea>
            <Stack gap="3" direction="row" width="full">
              <Button
                width="full"
                disabled={text().length === 0}
                onclick={submit}
              >
                次へ
              </Button>
            </Stack>
          </VStack>
        </Card.Body>
      </Card.Root>
    </ImporterPage>
  );
}
