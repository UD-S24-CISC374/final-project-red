import Phaser from "phaser";
import MainScene from "./scenes/startScene";
import PreloadScene from "./scenes/preloadScene";
import GameScene from "./scenes/gameScene";
import CreditsScene from "./scenes/creditsScene";
import GameOverScene from "./scenes/gameoverScene";

const DEFAULT_WIDTH = 1280;
const DEFAULT_HEIGHT = 720;

export const CONFIG = {
    title: "Bash",
    version: "0.0.1",
    type: Phaser.AUTO,
    backgroundColor: "#000000",
    scale: {
        parent: "phaser-game",
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT,
    },
    scene: [PreloadScene, MainScene, GameScene, CreditsScene, GameOverScene],
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
        },
    },
    input: {
        keyboard: true,
        mouse: true,
        touch: true,
        gamepad: false,
    },
    render: {
        pixelArt: false,
        antialias: true,
    },
};
