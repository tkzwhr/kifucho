import DatePick from "@/components/import/DatePick";
import GameResult from "@/components/import/GameResult";
import { Input } from "@/components/ui/input";
import { NumberInput } from "@/components/ui/number-input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { HANDICAPS, RANKS } from "@/constants";
import type { Game } from "@/dto/sgf";
import { playerName } from "@/utils/text";
import { format, parse } from "date-fns";
import { createEffect } from "solid-js";
import { createStore } from "solid-js/store";
import { css } from "../../styled-system/css";
import { Box, Grid, GridItem, HStack } from "../../styled-system/jsx";

type Props = {
  game: Game;
  playerId: string;
  setGame: (game: Game) => void;
};

export default function GameEditorForm(props: Props) {
  const [gameState, setGameState] = createStore({
    name: props.game.metadata.name ?? "無題",
    date: props.game.metadata.date ?? format(new Date(), "yyyy-MM-dd"),
    playerColor: "B",
    opponent: {
      name: props.game.white.name ?? "NoName",
      rank: props.game.white.rank,
    },
    komi: props.game.metadata.komi ?? 6.5,
    handicap: props.game.metadata.handicap ?? 0,
    result: props.game.metadata.result ?? {
      wins: "Draw",
    },
  });

  createEffect(() => {
    const opponentPlayer =
      gameState.playerColor === "B" ? props.game.white : props.game.black;
    if (opponentPlayer.name) {
      setGameState("opponent", "name", opponentPlayer.name);
    }
    if (opponentPlayer.rank) {
      setGameState("opponent", "rank", opponentPlayer.rank);
    }
  });

  createEffect(() => {
    const black = {
      name:
        gameState.playerColor === "B"
          ? playerName(props.playerId)
          : gameState.opponent.name,
      rank:
        gameState.playerColor === "B"
          ? props.game.black.rank
          : gameState.opponent.rank,
    };
    if (gameState.playerColor === "W" && gameState.opponent.rank === "0") {
      Reflect.deleteProperty(black, "rank");
    }
    const white = {
      name:
        gameState.playerColor === "W"
          ? playerName(props.playerId)
          : gameState.opponent.name,
      rank:
        gameState.playerColor === "W"
          ? props.game.white.rank
          : gameState.opponent.rank,
    };
    if (gameState.playerColor === "B" && gameState.opponent.rank === "0") {
      Reflect.deleteProperty(white, "rank");
    }

    props.setGame({
      metadata: {
        name: gameState.name,
        date: gameState.date,
        size: props.game.metadata.size,
        komi: gameState.komi,
        handicap: gameState.handicap,
        result: gameState.result,
      },
      black,
      white,
      rawData: props.game.rawData,
    });
  });

  return (
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
  );
}

function findIndexByRank(rank: string | undefined): number {
  if (!rank) {
    return RANKS.length - 1;
  }

  return RANKS.findIndex((v) => rank.startsWith(v.name)) ?? RANKS.length - 1;
}
