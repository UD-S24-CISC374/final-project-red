import Phaser from "phaser";

export default class GameOverScene extends Phaser.Scene {
    private backBtn: Phaser.GameObjects.Image;

    constructor() {
        super({ key: "GameOverScene" });
    }

    create() {
        this.add.image(640, 360, "startBackground");

        this.add.text(400, 280, "Game Over!", {
            fontSize: "85px",
            color: "#fff",
        });

        this.backBtn = this.add.image(640, 450, "mainBtn");
        this.backBtn.setInteractive();

        this.backBtn.on("pointerdown", () => {
            window.location.reload();
        });
    }
}
