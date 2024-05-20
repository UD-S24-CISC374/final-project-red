import Phaser from "phaser";

export interface Directories {
    fighting: boolean;
    curDir: string | undefined;
    dialogue: Phaser.GameObjects.Text | undefined;
}
