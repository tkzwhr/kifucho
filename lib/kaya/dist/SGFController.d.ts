import { BoardStatus } from './types.ts';
export declare class SGFController {
    readonly boardSize: number;
    private gameTree;
    private games;
    private constructor();
    static new(sgfText: string | undefined): SGFController | undefined;
    currentBoard(): BoardStatus;
    navigate(steps: number): void;
    private _navigateNext;
    private _navigatePrevious;
    private _fetchLastGame;
}
