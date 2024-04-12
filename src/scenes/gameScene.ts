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
    private consoleDialogue?: Phaser.GameObjects.Text;
    private fighting: boolean = false;
    private eventEmitter = new Phaser.Events.EventEmitter();
    private lsTutorial: boolean = false; 
    private cdTutorial: boolean = false;
    private curDir?: string = "";
    private catTut: boolean = false; 
    private instructionDialogue?: Phaser.GameObjects.Text;

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

        this.terminalManager = new TerminalManager(
            this.eventEmitter,
            this.fighting
        );

        // Listen for the userInput event
        this.eventEmitter.on("userInput", (userInput: string) => {
            this.handleConsoleText(userInput);
        });

        this.roboDialogue = this.add.text(100, 100, "", {
            fontSize: "24px",
            color: "#ffffff",
            backgroundColor: "#000000",
        });
        this.roboDialogue.setScrollFactor(0);

        this.evilDialogue = this.add.text(100, 100, "", {
            fontSize: "24px",
            color: "#ffffff",
            backgroundColor: "#000000",
        });
        this.evilDialogue.setScrollFactor(0);

        this.instructionDialogue = this.add.text(100, 100, "Explore the map using the arrow keys\nand interact with NPCs by going near them - good luck!", {
            fontSize: "24px",
            color: "#ffffff",
            backgroundColor: "#000000",
        });
        this.roboDialogue.setScrollFactor(0);

        this.consoleDialogue = this.add.text(100, 160, "", {
            fontSize: "24px",
            color: "green",
            backgroundColor: "#000000",
        });
        this.consoleDialogue.setScrollFactor(0);
    }

    update() {
        if (!this.cursor) {
            return;
        }
        if (!this.fighting) {
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
        }
        
        if (this.input.keyboard?.createCursorKeys().left.isDown || this.input.keyboard?.createCursorKeys().right.isDown || this.input.keyboard?.createCursorKeys().up.isDown ||this.input.keyboard?.createCursorKeys().down.isDown) {
            this.instructionDialogue?.setText("");
        }

        if (this.wizard && this.robo && this.rugged_wizard) {
            const playerPosition = this.wizard.getCenter();
            const npcPosition = this.robo.getCenter();
            const enemyPosition = this.rugged_wizard.getCenter();

            const npcDistance = Phaser.Math.Distance.BetweenPoints(
                playerPosition,
                npcPosition
            );
            const enemyDistance = Phaser.Math.Distance.BetweenPoints(
                playerPosition,
                enemyPosition
            );

            if (npcDistance < 100) {
                this.handleRoboInteraction();
            } else {
                this.roboDialogue?.setText("");
            }

            if (enemyDistance < 100) {
                // Adjust the threshold as needed
                this.handleRuggedInteraction();
            } else {
                this.evilDialogue?.setText("");
            }

        }
    }

    handleRoboInteraction = () => {
        // Display textbox with NPC dialogue
        if (!this.fighting) {
            this.roboDialogue?.setText(
                "Hello! To get past that door, get through that evil mage!\nWe can find his vulnerabilties using the spell 'ls.' Test it out here!"
            );
            if (this.lsTutorial) {
                this.roboDialogue?.setText("ls lists the files and directories inside your current directory!\nThere is another spell 'cd' - Try doing cd aboutMe");
                this.curDir = "aboutMe"
            }
            if (this.cdTutorial) {
                this.roboDialogue?.setText("cd lets you navigate filesystems and move around to different directories.\nNow, try using the spell you just learned to list everything in here!")
            }
            if (this.catTut) {
                this.roboDialogue?.setText("Next, type cd enemy if you think you're ready to take on that mage!");
            }
        } else {
            this.roboDialogue?.setText("Quickly! type ls to defeat him!");
        }
    };

    handleRuggedInteraction = () => {
        // Display textbox with NPC dialogue
        this.evilDialogue?.setText("You better be careful...");
    };

    handleConsoleText = (text: string) => {
        if (text === "$> ls" && this.curDir === "") {
            this.consoleDialogue?.setText("aboutMe dungeon.txt");
            this.lsTutorial = true;
        }
        if (text === "$> cd aboutMe") {
            this.consoleDialogue?.setText("aboutMe:");
            this.curDir = "aboutMe";
            this.cdTutorial = true;
        }
        if (text === "$> ls" && this.curDir === "aboutMe") {
            this.consoleDialogue?.setText("aboutMe: secret.txt");
            this.catTut = true;
        }
        if (text === "$> cd enemy") {
            this.wizard?.setX(300);
            this.wizard?.setY(400);
            this.robo?.setX(201);
            this.robo?.setY(400);
            this.fighting = true;
            this.consoleDialogue?.setText("");
            this.terminalManager = new TerminalManager(
                this.eventEmitter,
                this.fighting
            );
        }
    };

    handleUserInput = (userInput: string) => {
        console.log("Recieved Input:", userInput);
        if (userInput === "$> ls") {
            this.handleConsoleText("ls");
        }
    };

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