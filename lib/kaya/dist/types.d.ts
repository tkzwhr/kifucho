export type StoneColor = "B" | "W" | undefined;
export type PointState = {
    sign: StoneColor;
    markup: undefined;
};
export type BoardStatus = PointState[][];
