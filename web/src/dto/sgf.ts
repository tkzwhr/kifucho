import * as SabakiSgf from "@sabaki/sgf";

type GameResult =
  | {
      wins: "Draw";
    }
  | {
      wins: "Black" | "White";
      by: "Resign" | number;
    };

type GameMetadata = {
  name: string | undefined;
  date: string | undefined;
  size: number | [number, number] | undefined;
  komi: number | undefined;
  handicap: number | undefined;
  result: GameResult | undefined;
};

type GamePlayer = {
  name: string | undefined;
  rank: string | undefined;
};

export type Game = {
  metadata: GameMetadata;
  black: GamePlayer;
  white: GamePlayer;
  rawData: string;
};

function parseSize(text?: string): number | [number, number] | undefined {
  if (!text) {
    return undefined;
  }

  const [w, h] = text.split(":").map((x) => Number.parseInt(x));

  if (h === undefined) {
    return w;
  }

  return [w, h];
}

function parseGameResult(text?: string): GameResult | undefined {
  if (!text) {
    return undefined;
  }

  if (text === "0") {
    return { wins: "Draw" };
  }

  const [c, p] = text.split("+");
  const color = c === "B" ? "Black" : "White";
  const points = p === "R" ? "Resign" : Number.parseFloat(p);
  return { wins: color, by: points };
}

function trim(text: string): string {
  return text
    .split("\n")
    .map((x) => x.trim())
    .join("");
}

export function parse(text: string): Game[] {
  const nodes: SabakiSgf.Types.NodeObject[] | undefined = SabakiSgf.parse(text);

  if (nodes === undefined || nodes.length === 0) {
    return [];
  }

  return nodes.flatMap((node): Game[] => {
    if (node.data.GM?.[0] !== "1") {
      return [];
    }

    return [
      {
        metadata: {
          name: node.data.GN?.[0],
          date: node.data.DT?.[0],
          size: parseSize(node.data.SZ?.[0]),
          komi: node.data.KM?.[0]
            ? Number.parseFloat(node.data.KM[0])
            : undefined,
          handicap: node.data.HA?.[0]
            ? Number.parseInt(node.data.HA[0])
            : undefined,
          result: parseGameResult(node.data.RE?.[0]),
        },
        black: {
          name: node.data.PB?.[0],
          rank: node.data.BR?.[0],
        },
        white: {
          name: node.data.PW?.[0],
          rank: node.data.WR?.[0],
        },
        rawData: `(${trim(SabakiSgf.stringify(node))})`,
      },
    ];
  });
}

export function stringify(game: Game): string {
  const node = SabakiSgf.parse(game.rawData)[0];

  if (game.metadata.name) {
    node.data.GN = [game.metadata.name];
  }
  if (game.metadata.date) {
    node.data.DT = [game.metadata.date];
  }
  if (game.metadata.size) {
    if (typeof game.metadata.size === "number") {
      node.data.SZ = [game.metadata.size.toString()];
    } else {
      node.data.SZ = [
        `${game.metadata.size[0].toString()}:${game.metadata.size[1].toString()}`,
      ];
    }
  }
  if (game.metadata.komi) {
    node.data.KM = [game.metadata.komi.toString()];
  }
  if (game.metadata.handicap) {
    node.data.HA = [game.metadata.handicap.toString()];
  }
  if (game.metadata.result) {
    if (game.metadata.result.wins === "Draw") {
      node.data.RE = ["0"];
    } else if (game.metadata.result.by === "Resign") {
      node.data.RE = [`${game.metadata.result.wins.charAt(0)}+R`];
    } else {
      node.data.RE = [
        `${game.metadata.result.wins.charAt(0)}+${game.metadata.result.by.toString()}`,
      ];
    }
  }
  if (game.black.name) {
    node.data.PB = [game.black.name];
  }
  if (game.black.rank) {
    node.data.BR = [game.black.rank];
  }
  if (game.white.name) {
    node.data.PW = [game.white.name];
  }
  if (game.white.rank) {
    node.data.WR = [game.white.rank];
  }

  return `(${trim(SabakiSgf.stringify(node))})`;
}
