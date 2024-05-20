import Phaser from "phaser";

export default class GameOverScene extends Phaser.Scene {
    private backBtn: Phaser.GameObjects.Image;
    private won: boolean;

    constructor() {
        super({ key: "GameOverScene" });
    }

    init (data: {won: boolean}) {
        this.won = data.won;
    }
    create() {
        this.add.image(640, 360, "startBackground");

        this.add.text(400, 240, "Game Over!", {
            fontSize: "85px",
            color: "#fff",
        });

        if (this.won) {
            this.add.text(425, 310, "You Won :)", {
                fontSize:"70px",
                color: "green",

            })
        } else {
             this.add.text(425, 310, "You Lost :(", {
                fontSize:"70px",
                color: "red",
            })
        }
        this.backBtn = this.add.image(640, 450, "mainBtn");
        this.backBtn.setInteractive();

        this.backBtn.on("pointerdown", () => {
            window.location.reload();
        });
    }
}
