import { type Game, parse, stringify } from "@/dto/sgf";
import { describe, expect, test } from "vitest";

describe("sgf", () => {
  describe("parse", () => {
    test("empty string returns empty array", () => {
      const text = "";
      const expected: Game[] = [];
      const actual = parse(text);
      expect(actual).toStrictEqual(expected);
    });

    test("invalid string returns empty array", () => {
      const text = "INVALID";
      const expected: Game[] = [];
      const actual = parse(text);
      expect(actual).toStrictEqual(expected);
    });

    test("the other game is ignored", () => {
      const text = "(;FF[4]GM[2]SZ[8])";
      const expected: Game[] = [];
      const actual = parse(text);
      expect(actual).toStrictEqual(expected);
    });

    test("returns minimal game", () => {
      const text = "(;FF[4]GM[1])";
      const expected: Game[] = [
        {
          metadata: {
            name: undefined,
            date: undefined,
            size: undefined,
            komi: undefined,
            handicap: undefined,
            result: undefined,
          },
          black: {
            name: undefined,
            rank: undefined,
          },
          white: {
            name: undefined,
            rank: undefined,
          },
          rawData: text,
        },
      ];
      const actual = parse(text);
      expect(actual).toStrictEqual(expected);
    });

    test("returns fulfilled game", () => {
      const text =
        "(;FF[4]GM[1]GN[Game1]DT[2020-01-01]SZ[9]KM[6.5]HA[2]RE[B+R]PB[Player1]BR[1k]PW[Player2]WR[2d])";
      const expected: Game[] = [
        {
          metadata: {
            name: "Game1",
            date: "2020-01-01",
            size: 9,
            komi: 6.5,
            handicap: 2,
            result: {
              wins: "Black",
              by: "Resign",
            },
          },
          black: {
            name: "Player1",
            rank: "1k",
          },
          white: {
            name: "Player2",
            rank: "2d",
          },
          rawData: text,
        },
      ];
      const actual = parse(text);
      expect(actual).toStrictEqual(expected);
    });

    test("variation", () => {
      const text =
        "(;FF[4]GM[1]SZ[9:5])(;FF[4]GM[1]RE[0])(;FF[4]GM[1]RE[W+2.5])";
      const expected: Game[] = [
        {
          metadata: {
            name: undefined,
            date: undefined,
            size: [9, 5],
            komi: undefined,
            handicap: undefined,
            result: undefined,
          },
          black: {
            name: undefined,
            rank: undefined,
          },
          white: {
            name: undefined,
            rank: undefined,
          },
          rawData: "(;FF[4]GM[1]SZ[9:5])",
        },
        {
          metadata: {
            name: undefined,
            date: undefined,
            size: undefined,
            komi: undefined,
            handicap: undefined,
            result: { wins: "Draw" },
          },
          black: {
            name: undefined,
            rank: undefined,
          },
          white: {
            name: undefined,
            rank: undefined,
          },
          rawData: "(;FF[4]GM[1]RE[0])",
        },
        {
          metadata: {
            name: undefined,
            date: undefined,
            size: undefined,
            komi: undefined,
            handicap: undefined,
            result: { wins: "White", by: 2.5 },
          },
          black: {
            name: undefined,
            rank: undefined,
          },
          white: {
            name: undefined,
            rank: undefined,
          },
          rawData: "(;FF[4]GM[1]RE[W+2.5])",
        },
      ];
      const actual = parse(text);
      expect(actual).toStrictEqual(expected);
    });
  });

  describe("stringify", () => {
    test("returns minimal game", () => {
      const game: Game = {
        metadata: {
          name: undefined,
          date: undefined,
          size: undefined,
          komi: undefined,
          handicap: undefined,
          result: undefined,
        },
        black: {
          name: undefined,
          rank: undefined,
        },
        white: {
          name: undefined,
          rank: undefined,
        },
        rawData: "(;FF[4]GM[1])",
      };
      const expected = "(;FF[4]GM[1])";
      const actual = stringify(game);
      expect(actual).toBe(expected);
    });

    test("returns fulfilled game", () => {
      const game: Game = {
        metadata: {
          name: "Game1",
          date: "2020-01-01",
          size: 9,
          komi: 6.5,
          handicap: 2,
          result: {
            wins: "Black",
            by: "Resign",
          },
        },
        black: {
          name: "Player1",
          rank: "1k",
        },
        white: {
          name: "Player2",
          rank: "2d",
        },
        rawData: "(;FF[4]GM[1])",
      };
      const expected =
        "(;FF[4]GM[1]GN[Game1]DT[2020-01-01]SZ[9]KM[6.5]HA[2]RE[B+R]PB[Player1]BR[1k]PW[Player2]WR[2d])";
      const actual = stringify(game);
      expect(actual).toBe(expected);
    });

    test("variation 1", () => {
      const game: Game = {
        metadata: {
          name: undefined,
          date: undefined,
          size: [9, 5],
          komi: undefined,
          handicap: undefined,
          result: {
            wins: "Draw",
          },
        },
        black: {
          name: undefined,
          rank: undefined,
        },
        white: {
          name: undefined,
          rank: undefined,
        },
        rawData: "(;FF[4]GM[1])",
      };
      const expected = "(;FF[4]GM[1]SZ[9:5]RE[0])";
      const actual = stringify(game);
      expect(actual).toBe(expected);
    });

    test("variation 2", () => {
      const game: Game = {
        metadata: {
          name: undefined,
          date: undefined,
          size: undefined,
          komi: undefined,
          handicap: undefined,
          result: {
            wins: "White",
            by: 2.5,
          },
        },
        black: {
          name: undefined,
          rank: undefined,
        },
        white: {
          name: undefined,
          rank: undefined,
        },
        rawData: "(;FF[4]GM[1])",
      };
      const expected = "(;FF[4]GM[1]RE[W+2.5])";
      const actual = stringify(game);
      expect(actual).toBe(expected);
    });
  });
});
