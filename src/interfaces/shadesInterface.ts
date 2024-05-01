import Phaser from "phaser";

export interface ShadesInterface {
    curDir: string | undefined;
    won: boolean;
    dialogue: Phaser.GameObjects.Text | undefined;
}
