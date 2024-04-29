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
    private cdBackTut: boolean = false;
    private instructionDialogue?: Phaser.GameObjects.Text;
    private cdLsTut: boolean = false;
    private foundFile: boolean = false;
    private won: boolean = false;
    private battleMusic: Phaser.Sound.BaseSound;
    private playerHealth?: Phaser.GameObjects.Sprite;
    private enemyHealth?: Phaser.GameObjects.Sprite;

    constructor() {
        super({ key: "GameScene" });
    }

    handleOverlap() {}
    create() {
        //LEVEL DESIGN
        this.physics.world.setBounds(0, 0, 1600, 1600);
        this.add.image(750, 350, "door").setScale(0.18);
        //characters
        const map = this.make.tilemap({ key: "dungeon" });
        const tileset = map.addTilesetImage("dungeon_tiles_v4", "tiles");

        map.createLayer("Ground", tileset as Phaser.Tilemaps.Tileset, 0, 0);
        const wall_layer = map.createLayer(
            "Walls",
            tileset as Phaser.Tilemaps.Tileset,
            0,
            0
        );

        wall_layer!.setCollisionByProperty({ Collides: true });

        this.wizard = this.physics.add.sprite(220, 375, "wizard");
        const camera = this.cameras.main;
        camera.startFollow(this.wizard);
        this.wizard.setCollideWorldBounds(true);
        this.physics.add.collider(this.wizard, wall_layer!);

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

        this.instructionDialogue = this.add.text(
            100,
            100,
            "Explore the map using the arrow keys\nand interact with NPCs by going near them - good luck!",
            {
                fontSize: "24px",
                color: "#ffffff",
                backgroundColor: "#000000",
            }
        );
        this.roboDialogue.setScrollFactor(0);

        this.consoleDialogue = this.add.text(100, 160, "", {
            fontSize: "24px",
            color: "green",
            backgroundColor: "#000000",
        });
        this.consoleDialogue.setScrollFactor(0);

        this.battleMusic = this.sound.add('battleMusic', {loop: true});

        // hearts
        this.playerHealth = this.add.sprite(this.wizard!.x, this.wizard!.y - 50, "hearts").setScale(0.8);
        this.enemyHealth = this.add.sprite(this.rugged_wizard!.x, this.rugged_wizard!.y - 50, "hearts").setScale(0.8);
    }

    update() {
        if (!this.cursor) {
            return;
        }
         if (this.playerHealth) {
            this.playerHealth.setPosition(this.wizard!.x, this.wizard!.y - 50);
        }
        if (this.enemyHealth) {
            this.enemyHealth.setPosition(this.rugged_wizard!.x, this.rugged_wizard!.y - 50);
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

        if (
            this.input.keyboard?.createCursorKeys().left.isDown ||
            this.input.keyboard?.createCursorKeys().right.isDown ||
            this.input.keyboard?.createCursorKeys().up.isDown ||
            this.input.keyboard?.createCursorKeys().down.isDown
        ) {
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
            this.battleMusic.pause();
            this.roboDialogue?.setText(
                "Hello! To get past that door, get through that evil mage!\nWe can find his vulnerabilties using the spell 'ls.' Test it out here!"
            );
            if (this.lsTutorial) {
                this.roboDialogue?.setText(
                    "ls lists the files and directories inside your current directory!\nThere is another spell 'cd' - Try doing cd aboutMe"
                );
                this.curDir = "aboutMe";
            }
            if (this.cdTutorial) {
                this.roboDialogue?.setText(
                    "cd lets you navigate filesystems and move around to different directories.\nNow, try using the spell you just learned to list everything in here!"
                );
            }
            if (this.cdLsTut) {
                this.roboDialogue?.setText("Nice, here's everything inside the aboutMe folder.\nTo go back to the previous directory, do 'cd ..'");
            }
            if (this.cdBackTut) {
                this.roboDialogue?.setText(
                    "Great - we'll learn more later!\nYou are ready to take on your first enemy! Type 'cd enemy'"
                );
            }
        }

        if (this.fighting) {
            if (!this.foundFile) {
                this.roboDialogue?.setText(
                    "There is a file somewhere that will disable the mage.\nIt might be hidden, so use ls and cd to find it."
                );
            }
            if (this.foundFile) {
                this.roboDialogue?.setText(
                    "You found it! Type selfDestruct.sh to defeat the mage!"
                );
            }
            if (this.won) {
                this.roboDialogue?.setText(
                    "You beat the evil mage! Now you can explore past him!"
                );
                this.fighting = false;
            }
        }
    };

    handleRuggedInteraction = () => {
        // Display textbox with NPC dialogue
        this.evilDialogue?.setText("You better be careful...");
    };

    handleConsoleText = (text: string) => {
        if (!this.fighting) {
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
                this.cdLsTut = true;
            }
            if (text === "$> cd .." && this.curDir === "aboutMe") {
                this.consoleDialogue?.setText("");
                this.cdBackTut = true;
            }
            if (text === "$> cd enemy") {
                this.wizard?.setX(300);
                this.wizard?.setY(400);
                this.robo?.setX(201);
                this.robo?.setY(400);
                this.fighting = true;
                this.curDir = "enemy";
                this.consoleDialogue?.setText("Enemy:");
                this.terminalManager = new TerminalManager(
                    this.eventEmitter,
                    this.fighting
                );
                this.battleMusic.play();
            }
        } else {
            if (this.curDir === "enemy") {
                // enemy home directory
                if (text === "$> ls") {
                    this.consoleDialogue?.setText(
                        "Enemy: evilStuff  evilThings evil.txt"
                    );
                }
                if (text === "$> cd evilStuff") {
                    this.curDir = "evilStuff";
                    this.consoleDialogue?.setText("evilStuff:");
                }
                if (text === "$> cd evilThings") {
                    this.curDir = "evilThings";
                    this.consoleDialogue?.setText("evilThings:");
                }
            }
            if (this.curDir === "evilStuff") {
                if (text === "$> ls") {
                    this.consoleDialogue?.setText(
                        "evilStuff: notHere.txt mage.txt"
                    );
                }
                if (text === "$> cd ..") {
                    this.curDir = "enemy";
                    this.consoleDialogue?.setText("enemy:");
                }
            }
            if (this.curDir === "evilThings") {
                if (text === "$> ls") {
                    this.consoleDialogue?.setText("evilStuff: doNotLook");
                }
                if (text === "$> cd doNotLook") {
                    this.curDir = "doNotLook";
                    this.consoleDialogue?.setText("doNotLook:");
                }
                if (text === "$> cd ..") {
                    this.curDir = "enemy";
                    this.consoleDialogue?.setText("enemy:");
                }
            }
            if (this.curDir === "doNotLook") {
                if (text === "$> ls") {
                    this.consoleDialogue?.setText("doNotLook: selfDestruct.sh");
                    this.foundFile = true;
                }
                if (text === "$> selfDestruct.sh") {
                    this.won = true;
                }
            }
        }
    };

    handleUserInput = (userInput: string) => {
        console.log("Recieved Input:", userInput);
        if (userInput === "$> ls") {
            this.handleConsoleText("ls");
        }
    };
}
