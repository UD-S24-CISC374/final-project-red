import Phaser from "phaser";

export interface ConsoleHelperInterface {
    text: string;
    fighting: boolean;
    lsTutorial: boolean;
    cdTutorial: boolean;
    cdLsTut: boolean;
    cdBackTut: boolean;
    curDir: string;
    foundFile: boolean;
    won: boolean;
    consoleDialogue?: Phaser.GameObjects.Text;
}
