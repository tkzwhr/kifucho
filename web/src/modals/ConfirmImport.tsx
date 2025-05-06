import DatePick from "@/components/confirm-import/DatePick";
import GameResult from "@/components/confirm-import/GameResult";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { IconButton } from "@/components/ui/icon-button";
import { Input } from "@/components/ui/input";
import { NumberInput } from "@/components/ui/number-input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { HANDICAPS, RANKS } from "@/constants";
import type { Game } from "@/dto/sgf";
import { useUserRepo } from "@/repos/user";
import { useImportRecord } from "@/store/importRecord";
import { playerName } from "@/utils/text";
import { format, parse } from "date-fns";
import { XIcon } from "lucide-solid";
import { Show, createEffect, createMemo, createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { Box, Grid, GridItem, HStack, Stack } from "styled-system/jsx";
import { css } from "../../styled-system/css";

function findIndexByRank(rank: string | undefined): number {
  if (!rank) {
    return RANKS.length - 1;
  }

  return RANKS.findIndex((v) => rank.startsWith(v.name)) ?? RANKS.length - 1;
}

function GameForm({
  game,
  setGame,
  playerId,
}: { game: Game; setGame: (sgf: Game) => void; playerId: string }) {
  const [gameState, setGameState] = createStore({
    name: game.metadata.name ?? "無題",
    date: game.metadata.date ?? format(new Date(), "yyyy-MM-dd"),
    playerColor: "B",
    opponent: {
      name: game.white.name ?? "",
      rank: game.white.rank ?? "",
    },
    komi: game.metadata.komi ?? 6.5,
    handicap: game.metadata.handicap ?? 0,
    result: game.metadata.result ?? {
      wins: "Draw",
    },
  });

  createEffect(() => {
    if (gameState.playerColor === "B") {
      if (game.white.name) {
        setGameState("opponent", "name", game.white.name);
      }
      if (game.white.rank) {
        setGameState("opponent", "rank", game.white.rank);
      }
    }
    if (gameState.playerColor === "W") {
      if (game.black.name) {
        setGameState("opponent", "name", game.black.name);
      }
      if (game.black.rank) {
        setGameState("opponent", "rank", game.black.rank);
      }
    }
  });

  createEffect(() => {
    const black = {
      name:
        gameState.playerColor === "B"
          ? playerName(playerId)
          : gameState.opponent.name,
      rank:
        gameState.playerColor === "B"
          ? game.black.rank
          : gameState.opponent.rank,
    };
    if (gameState.playerColor === "W" && gameState.opponent.rank === "0") {
      Reflect.deleteProperty(black, "rank");
    }
    const white = {
      name:
        gameState.playerColor === "W"
          ? playerName(playerId)
          : gameState.opponent.name,
      rank:
        gameState.playerColor === "W"
          ? game.white.rank
          : gameState.opponent.rank,
    };
    if (gameState.playerColor === "B" && gameState.opponent.rank === "0") {
      Reflect.deleteProperty(white, "rank");
    }

    setGame({
      metadata: {
        name: gameState.name,
        date: gameState.date,
        size: game.metadata.size,
        komi: gameState.komi,
        handicap: gameState.handicap,
        result: gameState.result,
      },
      black,
      white,
      rawData: game.rawData,
    });
  });

  return (
    <HStack>
      <Box>
        <img src="/board.png" alt="logo" />
      </Box>
      <Grid
        gap={4}
        columnGap={6}
        alignItems="center"
        class={css({ gridTemplateColumns: "repeat(2, max-content)" })}
      >
        <GridItem textAlign="right">棋譜名</GridItem>
        <GridItem>
          <HStack>
            <Input
              placeholder="棋譜名"
              value={gameState.name}
              onkeyup={(ev) => setGameState("name", ev.currentTarget.value)}
            />
          </HStack>
        </GridItem>
        <GridItem textAlign="right">日付</GridItem>
        <GridItem>
          <HStack>
            <Box>
              {format(
                parse(gameState.date, "yyyy-MM-dd", new Date()),
                "yyyy年M月d日",
              )}
            </Box>
            <DatePick
              date={gameState.date}
              setDate={(value) => setGameState("date", value)}
            />
          </HStack>
        </GridItem>
        <GridItem textAlign="right">自分の色</GridItem>
        <GridItem>
          <HStack>
            <Switch
              colorPalette="gray"
              checked={gameState.playerColor === "B"}
              onCheckedChange={(ccd) =>
                setGameState("playerColor", ccd.checked ? "B" : "W")
              }
            >
              {gameState.playerColor === "B" ? "黒" : "白"}
            </Switch>
          </HStack>
        </GridItem>
        <GridItem textAlign="right">相手の名前</GridItem>
        <GridItem>
          <HStack>
            <Input
              placeholder="相手の名前"
              value={gameState.opponent.name}
              onkeyup={(ev) =>
                setGameState("opponent", "name", ev.currentTarget.value)
              }
            />
          </HStack>
        </GridItem>
        <GridItem textAlign="right">相手の段位</GridItem>
        <GridItem>
          <HStack>
            <Slider
              colorPalette="gray"
              min={0}
              max={RANKS.length - 1}
              value={[findIndexByRank(gameState.opponent.rank)]}
              onValueChange={(vcd) =>
                setGameState("opponent", "rank", RANKS[vcd.value[0]].name)
              }
            />
            <Box flexShrink={0}>
              {RANKS[findIndexByRank(gameState.opponent.rank)].label}
            </Box>
          </HStack>
        </GridItem>
        <GridItem textAlign="right">コミ</GridItem>
        <GridItem>
          <HStack>
            <NumberInput
              value={gameState.komi.toString(10)}
              onValueChange={(vcd) => setGameState("komi", vcd.valueAsNumber)}
              min={-361}
              step={0.5}
              max={361}
              allowMouseWheel={true}
              width="7rem"
            />
            <Box flexShrink={0}>目</Box>
          </HStack>
        </GridItem>
        <GridItem textAlign="right">手合割</GridItem>
        <GridItem>
          <HStack>
            <Slider
              colorPalette="gray"
              min={0}
              max={HANDICAPS.length - 1}
              value={[gameState.handicap]}
              onValueChange={(vcd) => setGameState("handicap", vcd.value[0])}
            />
            <Box flexShrink={0}>{HANDICAPS[gameState.handicap].label}</Box>
          </HStack>
        </GridItem>
        <GridItem textAlign="right">結果</GridItem>
        <GridItem>
          <GameResult
            gameResult={gameState.result}
            setGameResult={(value) =>
              setGameState("result", value ?? { wins: "Draw" })
            }
          />
        </GridItem>
      </Grid>
    </HStack>
  );
}

export default function ConfirmImportModal() {
  const [user] = useUserRepo().select;
  const [importRecordValue, setImportRecord] = useImportRecord();
  const game = createMemo(() => {
    const v = importRecordValue();
    if (v?.mode === "confirm" && v?.games.length === 1) {
      return v?.games[0];
    }
  });
  const [modifiedGame, setModifiedGame] = createSignal<Game | undefined>();

  const execute = () => {
    const v = modifiedGame();
    if (v) {
      setImportRecord({ mode: "execute", games: [v] });
    }
  };

  return (
    <Dialog.Root
      open={game() !== undefined}
      lazyMount={true}
      closeOnInteractOutside={false}
    >
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content width="40%">
          <Stack gap="10" p="5">
            <Stack gap="5">
              <Dialog.Title>棋譜を追加する</Dialog.Title>
              <Dialog.Description>
                <Show when={game() !== undefined}>
                  <GameForm
                    // biome-ignore lint/style/noNonNullAssertion: prechecked
                    game={game()!}
                    setGame={setModifiedGame}
                    playerId={user?.()?.[0]?.()?.users_by_pk?.id ?? ""}
                  />
                </Show>
              </Dialog.Description>
            </Stack>
            <Stack gap="3" direction="row" width="full">
              <Button width="full" onclick={execute}>
                登録する
              </Button>
            </Stack>
          </Stack>
          <Dialog.CloseTrigger
            asChild={() => (
              <IconButton
                aria-label="閉じる"
                variant="ghost"
                size="sm"
                position="absolute"
                top="2"
                right="2"
                onclick={() => setImportRecord(undefined)}
              >
                <XIcon />
              </IconButton>
            )}
          />
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
