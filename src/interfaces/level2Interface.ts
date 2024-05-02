import Phaser from "phaser";

export interface Level2Interface {
    curDir: string | undefined;
    won: boolean;
    dialogue: Phaser.GameObjects.Text | undefined;
    text: string,
    fighting: boolean,
    mkDirTut: boolean,
    lsMkTest: boolean,
    cdTest: boolean,
    lsInTest: boolean,
    lsMyFile: boolean,
    touchMyFile: boolean,
    createdFile: boolean,
}