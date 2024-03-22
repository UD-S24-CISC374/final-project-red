import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: "PreloadScene" });
    }

    preload() {
        this.load.image("startBackground", "assets/startBackground.png");
        this.load.image("startBtn", "assets/startBtn.png");
        this.load.image("backgroundA", "assets/backgroundA.png");
        this.load.spritesheet("wizard", "assets/wizard.png",  {frameWidth: 48, frameHeight: 52});
    }

    create() {
        this.scene.start("StartScene");
    }
}
