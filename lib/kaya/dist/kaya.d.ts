export type KayaOptions = {
    sgfText?: string;
    enableKeyboard?: boolean;
    enableWheel?: boolean;
};
export declare class Kaya {
    private boardSvgs;
    private readonly sgfController;
    constructor(parent: HTMLElement, options?: KayaOptions);
    navigate(steps: number): void;
    private _handleKeyboard;
    private handleWheel;
    private _syncBoard;
}
