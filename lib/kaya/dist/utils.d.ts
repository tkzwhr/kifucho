import { StoneColor } from './types.ts';
export declare const PointStateUtils: {
    fromSign: (sign: 1 | -1 | 0) => StoneColor;
};
export declare const NodeUtils: {
    nextMove: (node: any) => {
        color: "B";
        pos: string;
    } | {
        color: "W";
        pos: string;
    } | undefined;
};
export declare const ArrayUtils: {
    mapSquare: <T>(size: number, f: (r: number, c: number) => T) => T[][];
};
