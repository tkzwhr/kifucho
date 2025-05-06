import type { Game } from "@/dto/sgf";

export function playerName(playerId?: string): string {
  return `<@${playerId}>`;
}

export function result(result: Game["metadata"]["result"]): string | undefined {
  if (!result) {
    return undefined;
  }

  if (result?.wins === "Draw") {
    return "持碁";
  }

  const color = result?.wins === "Black" ? "黒" : "白";
  if (result?.by === "Resign") {
    return `${color}中押し勝ち`;
  }

  if (result?.by === 0.5) {
    return `${color}半目勝ち`;
  }

  const points = result?.by.toString();
  if (points?.endsWith(".5")) {
    return `${color}${points?.replace(".5", "")}目半勝ち`;
  }

  return `${color}${result?.by}目勝ち`;
}
