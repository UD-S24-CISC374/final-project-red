import Phaser from "phaser";

export default class LevelAScene extends Phaser.Scene {
    private player?: Phaser.Physics.Arcade.Sprite;
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    private wasd?: {
    W: Phaser.Input.Keyboard.Key,
    A: Phaser.Input.Keyboard.Key,
    S: Phaser.Input.Keyboard.Key,
    D: Phaser.Input.Keyboard.Key
};

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
            frames: this.anims.generateFrameNumbers("wizard", {
                start: 36, end: 38
            }),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: "turn",
            frames: [{ key: "wizard", frame: 0}],
            frameRate: 20
        })

        this.anims.create({
            key: "right", 
            frames: this.anims.generateFrameNumbers("wizard", {
                start: 23, end: 26
            }),
            frameRate: 12,
            repeat: -1
        })

        this.cursors = this.input.keyboard?.createCursorKeys();
        this.wasd = this.input.keyboard?.addKeys({
            W: Phaser.Input.Keyboard.KeyCodes.W,
            A: Phaser.Input.Keyboard.KeyCodes.A,
            S: Phaser.Input.Keyboard.KeyCodes.S,
            D: Phaser.Input.Keyboard.KeyCodes.D
        }) as {
            W: Phaser.Input.Keyboard.Key,
            A: Phaser.Input.Keyboard.Key,
            S: Phaser.Input.Keyboard.Key,
            D: Phaser.Input.Keyboard.Key
        };
    }

    update(){
         if (!this.cursors && !this.wasd) {
            return
        }
        if (this.cursors?.left.isDown || this.wasd?.A.isDown) {
            this.player?.setVelocityX(-160);
            this.player?.anims.play("left", true);
        }
        else if (this.cursors?.right.isDown || this.wasd?.D.isDown)
        {
            this.player?.setVelocityX(160);
            this.player?.anims.play("right", true);
        }
        else if (this.cursors?.up.isDown || this.wasd?.W.isDown)
        {
            this.player?.setVelocityY(-160);
            this.player?.anims.play("turn", true);
        }
        else if (this.cursors?.down.isDown || this.wasd?.S.isDown)
        {
            this.player?.setVelocityY(160);
            this.player?.anims.play("turn", true);
        }
        else {
            this.player?.setVelocityX(0);
            this.player?.setVelocityY(0);
            this.player?.anims.play("turn");
        }    

    }
}