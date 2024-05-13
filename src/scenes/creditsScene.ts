import Phaser from "phaser";

export default class CreditsScene extends Phaser.Scene {
    private backBtn: Phaser.GameObjects.Image;

    constructor() {
        super({key: "CreditsScene"})
    }

    create() {
        this.add.image(640, 360, "creditsBackground");

        this.add.text(480, 99, "Credits", {
            fontSize: "85px",
            color: "#1c112f"
        })

        this.add.text(330, 200, "Created by Ryan Sanchez and Chrstian Rullan Crsipo", {
            fontSize: "20px",
            color: "#1c112f"
        });

        this.add.text(330, 250, "Start Background by YUCALORA\nBattle Music - \"Retro Platforming\" by David Fesliyan\nHearts by SwooshWhoosh on itch.io\nBackground Music - \"8 Bit Nostalgia\" by David Fesliyan", {
            fontSize: "20px",
            color: "#1c112f"
        });

        this.backBtn = this.add.image(640, 655, "backBtn");
        this.backBtn.setScale(0.8);
        this.backBtn.setInteractive();

        this.backBtn.on("pointerdown", () => {
            this.scene.start("StartScene");
        })


    }
}