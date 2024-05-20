import Phaser from "phaser";

export interface ShadesInterface {
    curDir: string | undefined;
    won: boolean;
    playerHealth: Phaser.GameObjects.Sprite | undefined;
    shadesHealth: Phaser.GameObjects.Sprite | undefined;
    dialogue: Phaser.GameObjects.Text | undefined;
}
