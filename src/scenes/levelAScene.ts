import Phaser from "phaser";

export default class LevelAScene extends Phaser.Scene {
    private player?: Phaser.Physics.Arcade.Sprite;
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor() {
        super({ key: "LevelA"});

    }

    create() {
        this.add.image(640, 360, "backgroundA");
        this.player = this.physics.add.sprite(160, 470, "wizard");
        this.player.setScale(3);

        // Wizard Movement: 
        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("dude", {
                start: 0, end: 3
            }),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: "turn",
            frames: [{ key: "dude", frame: 4}],
            frameRate: 20
        })

        this.anims.create({
            key: "right", 
            frames: this.anims.generateFrameNumbers("dude", {
                start: 5, end: 8
            }),
            frameRate: 10,
            repeat: -1
        })
    }

    update(){
         if (!this.cursors) {
            return
        }
        if (this.cursors.left.isDown) {
            this.player?.setVelocityX(-160);
            this.player?.anims.play("left", true);
        }
        else if (this.cursors.right.isDown)
        {
            this.player?.setVelocityX(160);
            this.player?.anims.play("right", true);
        }
        else {
            this.player?.setVelocityX(0);
            this.player?.anims.play("turn");
        }

    }
}