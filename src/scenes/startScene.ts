import Phaser from "phaser";

export default class StartScene extends Phaser.Scene {
    private startBtn: Phaser.GameObjects.Image;
    private creditsBtn: Phaser.GameObjects.Image;
    // private controlsBtn: Phaser.GameObjects.Image; 

    constructor() {
        super({ key: "StartScene" });
    }

    create() {
        this.add.image(640, 360, "startBackground");
        
        this.add.text(165, 280, "$>Bash the Dungeon", {
            fontSize: "85px",
            color: "#fff",
        });

        this.startBtn = this.add.image(640, 450, "startBtn");
        this.startBtn.setScale(1.1);
        this.startBtn.setInteractive();

        this.startBtn.on("pointerdown", () => {
            this.scene.start("GameScene");
        });

        this.creditsBtn = this.add.image(640, 550, "creditsBtn");
        this.creditsBtn.setScale(0.9);
        this.creditsBtn.setInteractive();

        this.creditsBtn.on("pointerdown", () => {
            this.scene.start("CreditsScene");
        })
    }

    update() {}
}
