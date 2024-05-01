import Phaser from "phaser";

export interface RatHelperInterface {
    text: string,
    fighting: boolean,
    curDir: string, 
    won2: boolean,
    mkDirTut: boolean,
    lsMkTest: boolean,
    cdTest: boolean,
    lsInTest: boolean,
    lsMyFile: boolean,
    touchMyFile: boolean,
    createdFile: boolean,
    consoleDialogue?: Phaser.GameObjects.Text | undefined,
}
