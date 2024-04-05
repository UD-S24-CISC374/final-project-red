import Phaser from "phaser";
import { TerminalManager } from "../objects/terminalManager";

export default class GameScene extends Phaser.Scene {
    private wizard?: Phaser.Physics.Arcade.Sprite;
    private NPCs: Phaser.Physics.Arcade.Group;
    private enemies: Phaser.Physics.Arcade.Group;
    private platforms: Phaser.Physics.Arcade.StaticGroup;
    private cursor?: Phaser.Types.Input.Keyboard.CursorKeys;
    private terminalManager: TerminalManager;
    private roboDialogue?: Phaser.GameObjects.Text;
    private robo?: Phaser.Physics.Arcade.Sprite;
    private rugged_wizard?: Phaser.Physics.Arcade.Sprite;
    private evilDialogue?: Phaser.GameObjects.Text;
    private userInput: string = "";


    constructor() {
        super({ key: "GameScene" });
    }

    create() {
        //level design
        this.add.image(600, 400, "background").setScale(2);

        this.platforms = this.physics.add.staticGroup();
        const level: Phaser.Physics.Arcade.Image = this.platforms
            .create(400, 400, "platform")
            .setScale(2, 1);

        this.physics.world.setBounds(
            65, //div by 6?
            170, //div by 2 ish?
            level.displayWidth,
            level.displayHeight
        );

        //characters
        this.wizard = this.physics.add.sprite(220, 375, "wizard");
        this.wizard.setCollideWorldBounds(true);

        this.NPCs = this.physics.add.group();
        const robo: Phaser.Physics.Arcade.Sprite = this.NPCs.create(
            400,
            500,
            "robo_guy"
        ).setScale(0.75);
        this.physics.add.collider(this.wizard, robo);
        robo.setImmovable(true);
        this.robo = robo; 

        this.enemies = this.physics.add.group();
        const rugged_wizard: Phaser.Physics.Arcade.Sprite = this.enemies
            .create(600, 400, "rugged_wizard")
            .setScale(0.145);
        this.physics.add.collider(this.wizard, rugged_wizard);
        rugged_wizard.setImmovable(true);
        this.rugged_wizard = rugged_wizard;

        //animation
        this.anims.create({
            key: "idle",
            frames: [{ key: "wizard", frame: 0 }],
            frameRate: 1,
            repeat: -1,
        });
        this.cursor = this.input.keyboard?.createCursorKeys();

        this.add.text(165, 280, "Level A", {
            fontSize: "90px",
            color: "red",
        });

        this.terminalManager = new TerminalManager();

        this.roboDialogue = this.add.text(100, 100, "", { fontSize: '24px', color: '#ffffff', backgroundColor: '#000000' });
        this.roboDialogue.setScrollFactor(0);

        this.evilDialogue = this.add.text(100, 100, "", { fontSize: '24px', color: '#ffffff', backgroundColor: '#000000' });
        this.evilDialogue.setScrollFactor(0);

        
        if (this.input.keyboard && this.input.keyboard.checkDown(this.input.keyboard.addKey('ENTER'), 500)) {
            if (this.userInput === "ls") {
                this.roboDialogue.setText("file1    file2");
            }
            this.userInput = "";
        }
    }

    update() {
        if (!this.cursor) {
            return;
        }
        if (this.cursor.left.isDown) {
            this.wizard?.setVelocityX(-260);
            //this.wizard?.anims.play("left", true);
        } else if (this.cursor.right.isDown) {
            this.wizard?.setVelocityX(260);
            //this.wizard?.anims.play("right", true);
        } else if (this.cursor.up.isDown) {
            this.wizard?.setVelocityY(-260);
            //this.wizard?.anims.play("turn", true);
        } else if (this.cursor.down.isDown) {
            this.wizard?.setVelocityY(260);
            //this.wizard?.anims.play("turn", true);
        } else {
            this.wizard?.setVelocityX(0);
            this.wizard?.setVelocityY(0);
            this.wizard?.anims.play("idle");
        }

        if (this.wizard && this.robo && this.rugged_wizard) {
            const playerPosition = this.wizard.getCenter();
            const npcPosition = this.robo.getCenter();
            const enemyPosition = this.rugged_wizard.getCenter();

            const npcDistance = Phaser.Math.Distance.BetweenPoints(playerPosition, npcPosition);
            const enemyDistance = Phaser.Math.Distance.BetweenPoints(playerPosition, enemyPosition);

            if (npcDistance < 100) {
                this.handleRoboInteraction();
                this.handleTextInput();
            } else {
                this.roboDialogue?.setText(""); 
            }       

            if (enemyDistance < 100) { // Adjust the threshold as needed
                this.handleRuggedInteraction();
            } else {
                this.evilDialogue?.setText(""); 
            }      
        }

    }

    handleRoboInteraction = () => {
        // Display textbox with NPC dialogue
        this.roboDialogue?.setText("Hello! I'm here to help - I have some files for you!\nTry typing 'ls' and hit enter.\nThis will show you all my folders and files.");
    }

    handleRuggedInteraction = () => {
        // Display textbox with NPC dialogue
        this.evilDialogue?.setText("You better be careful...");
    }

    handleTextInput = () => {
        this.input.keyboard?.on('keydown', (event: KeyboardEvent) => {
            if (/^[a-zA-Z0-9]$/.test(event.key)) {
                this.userInput += event.key;
            } else if (event.key === "Backspace") { // Handle backspace
                this.userInput = this.userInput.slice(0, -1);
            }
        });
    }

    /* private enableWASDKeys() {
        this.input.keyboard?.addKeys({
            W: Phaser.Input.Keyboard.KeyCodes.W,
            A: Phaser.Input.Keyboard.KeyCodes.A,
            S: Phaser.Input.Keyboard.KeyCodes.S,
            D: Phaser.Input.Keyboard.KeyCodes.D,
        }) as {
            W: Phaser.Input.Keyboard.Key;
            A: Phaser.Input.Keyboard.Key;
            S: Phaser.Input.Keyboard.Key;
            D: Phaser.Input.Keyboard.Key;
        };
    } */
}
