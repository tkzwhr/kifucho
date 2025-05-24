import { StoneColor } from './types.ts';
export default class BoardSvg {
    private boardSize;
    private position;
    private readonly element;
    private color;
    constructor(appendTo: HTMLElement, boardSize: number, position: [number, number]);
    putStone(color: StoneColor): void;
    private _putStone;
    private applyStyle;
}
export declare function createBoardSvgs(appendTo: HTMLElement, boardSize: number): BoardSvg[][];
