import Phaser from "phaser";
import { TerminalManager } from "../objects/terminalManager";
import { Directories } from "../interfaces/directories";
import { NpcHelper } from "../objects/npcHelper";
import { ConsoleHelper } from "../objects/consoleHelper";
import { ConsoleHelperInterface } from "../interfaces/consoleHelperInterface";
import { ShadesInterface } from "../interfaces/shadesInterface";
import { Npc2Helper } from "../objects/npc2Helper";
import { Level2Interface } from "../interfaces/level2Interface";
//this.fighting, this.lsTutorial, this.cdTutorial, this.cdLsTut, this.cdBackTut, this.curDir, this.foundFile, this.won

export default class GameScene extends Phaser.Scene {
    private cursor?: Phaser.Types.Input.Keyboard.CursorKeys;
    private terminalManager: TerminalManager;
    private handleNPC: NpcHelper;
    private handleNPC2: Npc2Helper;
    private consoleHelp: ConsoleHelper;

    private NPCs: Phaser.Physics.Arcade.Group;
    private wizard?: Phaser.Physics.Arcade.Sprite;
    private robo?: Phaser.Physics.Arcade.Sprite;
    private smiley: Phaser.Physics.Arcade.Sprite;
    private hunter: Phaser.Physics.Arcade.Sprite;

    private enemies: Phaser.Physics.Arcade.Group;
    private shades: Phaser.Physics.Arcade.Sprite;
    private rugged_wizard?: Phaser.Physics.Arcade.Sprite;
    private rat: Phaser.Physics.Arcade.Sprite;

    private door1: Phaser.Physics.Arcade.Image;
    private door2: Phaser.Physics.Arcade.Image;
    private door3: Phaser.Physics.Arcade.Image;

    private smileyDialogue: Phaser.GameObjects.Text;
    private evilDialogue?: Phaser.GameObjects.Text;
    private consoleDialogue?: Phaser.GameObjects.Text;
    private roboDialogue?: Phaser.GameObjects.Text;

    private userInput: string = "";
    private fighting: boolean = false;
    private fightNumber: number = 0;

    private eventEmitter = new Phaser.Events.EventEmitter();
    private lsTutorial: boolean = false;
    private cdTutorial: boolean = false;
    private curDir?: string = "";
    private cdBackTut: boolean = false;
    private instructionDialogue?: Phaser.GameObjects.Text;
    private cdLsTut: boolean = false;
    private foundFile: boolean = false;
    private won: boolean = false;
    private won2: boolean = false;
    private won3: boolean = false;
    private mkDirTut: boolean = false;
    private lsMkTest: boolean = false;
    private cdTest: boolean = false;
    private lsInTest: boolean = false;
    private lsMyFile: boolean = false;
    private touchMyFile: boolean = false;
    private createdFile: boolean = false;

    private directories: Directories = {
        fighting: this.fighting,
        curDir: this.curDir,
        dialogue: this.roboDialogue,
    };
    private ConsoleHelperObj: ConsoleHelperInterface = {
        text: "",
        fighting: this.fighting,
        lsTutorial: this.lsTutorial,
        cdTutorial: this.cdTutorial,
        cdLsTut: this.cdLsTut,
        cdBackTut: this.cdBackTut,
        curDir: this.curDir!,
        foundFile: this.foundFile,
        won: this.won,
        playerHealth: this.playerHealth,
        consoleDialogue: this.consoleDialogue,
    };
    private shadesInterfaceObj: ShadesInterface = {
        curDir: this.curDir,
        won: this.won3,
        playerHealth: this.playerHealth,
        shadesHealth: this.shadesHealth,
        dialogue: this.consoleDialogue,
    };
    private level2InterfaceObj: Level2Interface = {
        curDir: this.curDir,
        won: this.won2,
        dialogue: this.consoleDialogue,
        text: "",
        fighting: this.fighting,
        mkDirTut: this.mkDirTut,
        lsMkTest: this.lsMkTest,
        cdTest: this.cdTest,
        lsInTest: this.lsInTest,
        lsMyFile: this.lsMyFile,
        touchMyFile: this.touchMyFile,
        playerHealth: this.playerHealth,
        createdFile: this.createdFile,
    };
    private playerHealth?: Phaser.GameObjects.Sprite;
    private rugWizHealth?: Phaser.GameObjects.Sprite;
    private shadesHealth?: Phaser.GameObjects.Sprite;
    private ratHealth?: Phaser.GameObjects.Sprite;

    private battleMusic: Phaser.Sound.BaseSound;
    private ambientMusic: Phaser.Sound.BaseSound;
    private gameoverSfx: Phaser.Sound.BaseSound;

    constructor() {
        super({ key: "GameScene" });
    }

    handleOverlap() {}
    create() {
        //CLASSES --------
        this.handleNPC = new NpcHelper();
        this.consoleHelp = new ConsoleHelper();
        this.handleNPC2 = new Npc2Helper();

        //MAP -------
        this.physics.world.setBounds(0, 0, 1900, 2400);
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

        //SPRITES -------
        this.door1 = this.physics.add.image(750, 450, "door").setScale(0.2);
        this.door2 = this.physics.add.image(850, 960, "door").setScale(0.2);
        this.door3 = this.physics.add.image(1650, 2045, "door").setScale(0.2);
        this.wizard = this.physics.add.sprite(220, 375, "wizard").setScale(0.9);
        const camera = this.cameras.main;
        camera.startFollow(this.wizard);
        this.wizard.setCollideWorldBounds(true);
        this.physics.add.collider(this.wizard, wall_layer!);
        this.physics.add.collider(this.wizard, this.door1);
        this.physics.add.collider(this.wizard, this.door2);
        this.physics.add.collider(this.wizard, this.door3);
        this.door1.setImmovable(true);
        this.door2.setImmovable(true);
        this.door3.setImmovable(true);

        this.NPCs = this.physics.add.group();
        const robo: Phaser.Physics.Arcade.Sprite = this.NPCs.create(
            400,
            500,
            "robo_guy"
        ).setScale(0.75);
        const hunter: Phaser.Physics.Arcade.Sprite = this.NPCs.create(
            850,
            1170,
            "hunter"
        ).setScale(0.9);
        const smiley: Phaser.Physics.Arcade.Sprite = this.NPCs.create(
            700,
            1770,
            "smiley"
        ).setScale(1);
        this.wizard.setScale(0.8);
        this.physics.add.collider(this.wizard, this.NPCs);
        robo.setImmovable(true);
        hunter.setImmovable(true);
        smiley.setImmovable(true);
        this.robo = robo;
        this.hunter = hunter;

        this.enemies = this.physics.add.group();
        const rugged_wizard: Phaser.Physics.Arcade.Sprite = this.enemies
            .create(600, 400, "rugged_wizard")
            .setScale(0.145);
        const shades_boss: Phaser.Physics.Arcade.Sprite = this.enemies
            .create(1250, 1970, "shades")
            .setScale(1);
        this.shades = shades_boss;
        //const resourceful_rat: Phaser.Physics.Arcade.Sprite =
        this.rat = this.enemies
            .create(1120, 1360, "resourceful_rat")
            .setScale(1.2);
        this.physics.add.collider(this.wizard, rugged_wizard);
        this.physics.add.collider(this.wizard, shades_boss);
        rugged_wizard.setImmovable(true);
        shades_boss.setImmovable(true);
        this.rugged_wizard = rugged_wizard;

        //ANIMATION ------
        this.anims.create({
            key: "idle",
            frames: [{ key: "wizard", frame: 2 }],
            frameRate: 10,
            repeat: -1,
        });
        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("wizard", {
                start: 0,
                end: 1,
            }),
            frameRate: 7,
            repeat: -1,
        });
        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("wizard", {
                start: 3,
                end: 4,
            }),
            frameRate: 7,
            repeat: -1,
        });
        this.cursor = this.input.keyboard?.createCursorKeys();

        this.terminalManager = new TerminalManager(this.eventEmitter);
        this.anims.create({
            key: "shades_bounce",
            frames: this.anims.generateFrameNumbers("shades", {
                start: 0,
                end: 2,
            }),
            frameRate: 2,
            repeat: -1,
        });
        shades_boss.anims.play("shades_bounce");
        this.anims.create({
            key: "smiley_bounce",
            frames: this.anims.generateFrameNumbers("smiley", {
                start: 0,
                end: 2,
            }),
            frameRate: 2,
            repeat: -1,
        });
        smiley.anims.play("smiley_bounce");

        this.smiley = smiley;

        // Listen for the userInput event
        this.eventEmitter.on("userInput", (userInput: string) => {
            this.handleConsoleText(userInput);
        });

        // DIALOGUE ------
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
            70,
            100,
            "Explore the map using the arrow keys\nand interact with NPCs by going near them - good luck!",
            {
                fontSize: "24px",
                color: "#ffffff",
                backgroundColor: "#000000",
            }
        );
        this.roboDialogue.setScrollFactor(0);

        this.consoleDialogue = this.add.text(100, 190, "", {
            fontSize: "29px",
            color: "green",
            backgroundColor: "#000000",
        });
        this.consoleDialogue.setScrollFactor(0);

        this.smileyDialogue = this.add.text(100, 100, "", {
            fontSize: "24px",
            color: "white",
            backgroundColor: "#000000",
        });
        this.smileyDialogue.setScrollFactor(0);

        // hearts
        this.playerHealth = this.add.sprite(
            this.wizard!.x,
            this.wizard!.y - 50,
            "hearts",
            0
        );
        this.rugWizHealth = this.add.sprite(
            this.rugged_wizard!.x,
            this.rugged_wizard!.y - 50,
            "hearts",
            0
        );
        this.shadesHealth = this.add.sprite(
            this.shades!.x,
            this.shades!.y - 100,
            "hearts",
            0
        );
        this.ratHealth = this.add.sprite(
            this.rat!.x,
            this.rat!.y - 50,
            "hearts",
            0
        );
        this.playerHealth.setScale(1.5);
        this.rugWizHealth.setScale(1.5);
        this.ratHealth.setScale(1.5);
        this.shadesHealth.setScale(2.0);

        this.battleMusic = this.sound.add("battleMusic", {
            loop: true,
            volume: 0.08,
        });

        this.ambientMusic = this.sound.add("ambientMusic", {
            loop: true,
            volume:0.08,
        })

        this.gameoverSfx = this.sound.add("gameoverSfx", {
            loop: false,
            volume: 0.5,
        })
    }

    update() {
        if (!this.cursor) {
            return;
        }
        if (this.curDir === "LOST GAME") {
            this.battleMusic.pause();
            this.gameoverSfx.play();
            this.scene.start("GameOverScene");
        }
        if (this.playerHealth) {
            this.playerHealth.setPosition(this.wizard!.x, this.wizard!.y - 50);
        }
        if (this.rugWizHealth) {
            this.rugWizHealth.setPosition(
                this.rugged_wizard!.x,
                this.rugged_wizard!.y - 50
            );
        }
        if (this.fighting) {
            this.ambientMusic.pause();
            if (!this.battleMusic.isPlaying) {
                this.battleMusic.play();
            }
            this.playerHealth?.setVisible(true);
            this.rugWizHealth?.setVisible(true);
        }
        if (!this.fighting) {
            this.battleMusic.pause();
            if (!this.ambientMusic.isPlaying) {
                this.ambientMusic.play();
            }
            if (this.cursor.left.isDown) {
                this.wizard?.setVelocityY(0);
                this.wizard?.setVelocityX(-260);
                this.wizard?.anims.play("left", true);
            } else if (this.cursor.right.isDown) {
                this.wizard?.setVelocityY(0);
                this.wizard?.setVelocityX(260);
                this.wizard?.anims.play("right", true);
            } else if (this.cursor.up.isDown) {
                this.wizard?.setVelocityX(0);
                this.wizard?.setVelocityY(-260);
                this.wizard?.anims.play("right", true);
            } else if (this.cursor.down.isDown) {
                this.wizard?.setVelocityX(0);
                this.wizard?.setVelocityY(260);
                this.wizard?.anims.play("left", true);
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
            const smileyPosition = this.smiley.getCenter();
            const hunterPosition = this.hunter.getCenter();

            const npcDistance = Phaser.Math.Distance.BetweenPoints(
                playerPosition,
                npcPosition
            );
            const enemyDistance = Phaser.Math.Distance.BetweenPoints(
                playerPosition,
                enemyPosition
            );
            const smileyDistance = Phaser.Math.Distance.BetweenPoints(
                playerPosition,
                smileyPosition
            );
            const hunterDistance = Phaser.Math.Distance.BetweenPoints(
                playerPosition,
                hunterPosition
            );
            if (npcDistance < 100) {
                this.directories = this.handleNPC.handleRoboInteraction(
                    this.fighting,
                    this.lsTutorial,
                    this.cdTutorial,
                    this.cdLsTut,
                    this.cdBackTut,
                    this.curDir,
                    this.foundFile,
                    this.won,
                    this.roboDialogue
                );
                this.fighting = this.directories.fighting;
                this.curDir = this.directories.curDir;
                this.roboDialogue = this.directories.dialogue;
                this.fightNumber = 0;
            } else {
                this.roboDialogue?.setText("");
            }

            if (enemyDistance < 100) {
                // Adjust the threshold as needed
                this.handleRuggedInteraction();
            } else {
                this.evilDialogue?.setText("");
            }

            if (hunterDistance < 100) {
                this.fightNumber = 12;
                this.directories = this.handleNPC2.handleHunterInteraction(
                    this.fighting,
                    this.curDir,
                    this.won2,
                    this.mkDirTut,
                    this.lsMkTest,
                    this.cdTest,
                    this.lsInTest,
                    this.lsMyFile,
                    this.touchMyFile,
                    this.createdFile,
                    this.roboDialogue
                );
                this.fighting = this.directories.fighting;
                this.curDir = this.directories.curDir;
                this.roboDialogue = this.directories.dialogue;
            }
            if (smileyDistance < 150) {
                if (!this.fighting) {
                    if (!this.won3) {
                        this.smileyDialogue.setText(
                            "Shades seems to be really 'triggered' today, mind smacking some sense into him?\nType 'cd boss' to confront him."
                        );
                    } else {
                        this.smileyDialogue.setText(
                            "Don't worry about him he chillen now...\nbut anyway I don't know if it's best to keep exploring this dungeon fleshy dude.\nMy boss will get angry at you."
                        );
                    }
                } else {
                    const tmp: string =
                        "Your task: enter his emotions directory, create and call a calm.sh file\nIn his head directory make a 'mental' directory,\nenter it then create and call a knockout.sh file";
                    this.smileyDialogue.setText(tmp);
                }
            } else {
                this.smileyDialogue.setText("");
            }
        }
    }
    handleRuggedInteraction = () => {
        // Display textbox with NPC dialogue
        this.evilDialogue?.setText("You better be careful...");
    };

    handleConsoleText = (text: string) => {
        if (text === "$> cd enemy" && !this.won) {
            this.wizard?.setX(300);
            this.wizard?.setY(400);
            this.robo?.setX(201);
            this.robo?.setY(400);
            this.fighting = true;
            this.curDir = "enemy";
            this.consoleDialogue?.setText("Enemy:");
            this.terminalManager = new TerminalManager(this.eventEmitter);
        } else if (
            text == "$> cd boss" &&
            this.won &&
            this.won2 &&
            !this.won3
        ) {
            this.wizard?.setX(950);
            this.wizard?.setY(1970);
            this.smiley.setX(801);
            this.smiley.setY(1970);
            this.fighting = true;
            this.curDir = "boss";
            this.consoleHelp.handleShadesBoss(
                "$> ls",
                this.curDir,
                this.won3,
                this.playerHealth!,
                this.shadesHealth!,
                this.consoleDialogue
            );
            this.fightNumber = 3;
        } else if (text == "$> cd rat" && this.won && !this.won2) {
            this.wizard?.setX(950);
            this.wizard?.setY(1300);
            this.hunter.setX(860);
            this.hunter.setY(1300);
            this.fighting = true;
            this.curDir = "rat";
            this.consoleDialogue?.setText("");
            this.consoleHelp.handleLevel2Console(
                this.curDir!,
                this.won2,
                this.consoleDialogue!,
                text,
                this.fighting,
                this.mkDirTut,
                this.lsMkTest,
                this.cdTest,
                this.lsInTest,
                this.lsMyFile,
                this.touchMyFile,
                this.playerHealth!,
                this.createdFile
            );
            this.fightNumber = 12;
        } else {
            switch (this.fightNumber) {
                case 12:
                    this.level2InterfaceObj =
                        this.consoleHelp.handleLevel2Console(
                            this.curDir!,
                            this.won2,
                            this.consoleDialogue!,
                            text,
                            this.fighting,
                            this.mkDirTut,
                            this.lsMkTest,
                            this.cdTest,
                            this.lsInTest,
                            this.lsMyFile,
                            this.touchMyFile,
                            this.playerHealth!,
                            this.createdFile
                        );
                    text = this.level2InterfaceObj.text;
                    this.fighting = this.level2InterfaceObj.fighting;
                    this.curDir = this.level2InterfaceObj.curDir;
                    this.won2 = this.level2InterfaceObj.won;
                    this.mkDirTut = this.level2InterfaceObj.mkDirTut;
                    this.lsMkTest = this.level2InterfaceObj.lsMkTest;
                    this.cdTest = this.level2InterfaceObj.cdTest;
                    this.lsInTest = this.level2InterfaceObj.lsInTest;
                    this.lsMyFile = this.level2InterfaceObj.lsMyFile;
                    this.touchMyFile = this.level2InterfaceObj.touchMyFile;
                    this.createdFile = this.level2InterfaceObj.createdFile;
                    this.consoleDialogue = this.level2InterfaceObj.dialogue;
                    if (this.won2) {
                        this.ratHealth?.setFrame(3);
                        this.fighting = false;
                        this.curDir = "";
                        this.fightNumber = 0;
                        this.door2.setImmovable(false);
                    }
                    break;

                case 2:
                    break;
                case 3:
                    this.shadesInterfaceObj = this.consoleHelp.handleShadesBoss(
                        text,
                        this.curDir!,
                        this.won3,
                        this.playerHealth!,
                        this.shadesHealth!,
                        this.consoleDialogue
                    );
                    this.curDir = this.shadesInterfaceObj.curDir;
                    this.won3 = this.shadesInterfaceObj.won;
                    this.consoleDialogue = this.shadesInterfaceObj.dialogue;

                    if (this.won3) {
                        this.shadesHealth?.setFrame(3);
                        this.fighting = false;
                        this.anims.remove("shades_bounce");
                        this.curDir = "";
                        this.consoleDialogue?.setText("");
                        this.fightNumber = 0;
                        this.door3.setImmovable(false);
                    }
                    break;
                default:
                    this.ConsoleHelperObj = this.consoleHelp.handleConsoleText(
                        text,
                        this.fighting,
                        this.lsTutorial,
                        this.cdTutorial,
                        this.cdLsTut,
                        this.cdBackTut,
                        this.curDir!,
                        this.foundFile,
                        this.won,
                        this.playerHealth!,
                        this.consoleDialogue
                    );
                    text = this.ConsoleHelperObj.text;
                    this.fighting = this.ConsoleHelperObj.fighting;
                    this.lsTutorial = this.ConsoleHelperObj.lsTutorial;
                    this.cdTutorial = this.ConsoleHelperObj.cdTutorial;
                    this.cdLsTut = this.ConsoleHelperObj.cdLsTut;
                    this.cdBackTut = this.ConsoleHelperObj.cdBackTut;
                    this.curDir! = this.ConsoleHelperObj.curDir;
                    this.foundFile = this.ConsoleHelperObj.foundFile;
                    this.won = this.ConsoleHelperObj.won;
                    this.consoleDialogue =
                        this.ConsoleHelperObj.consoleDialogue;
                    if (this.won) {
                        this.rugWizHealth?.setFrame(3);
                        this.door1.setImmovable(false);
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
