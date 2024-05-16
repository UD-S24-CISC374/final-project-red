import Phaser from "phaser";
import { ConsoleHelperInterface } from "../interfaces/consoleHelperInterface";
import { ShadesInterface } from "../interfaces/shadesInterface";
import { Level2Interface } from "../interfaces/level2Interface";

export class ConsoleHelper {
    private stack: string[] = [];
    private hashmap = new Map<string, string>();
    private hashMapFillFlag: boolean = false;
    private calmFlag: boolean = false;
    private knockoutFlag: boolean = false;
    private damageTaken: number = 1;
    private damageDealt: number = 1;
    private damageSfx: Phaser.Sound.BaseSound;

    constructor(private scene: Phaser.Scene) {
        this.damageSfx = scene.sound.add('damageSfx');
    }

    handleShadesBoss = (
        text: string,
        curDir: string,
        won3: boolean,
        playerHealth: Phaser.GameObjects.Sprite,
        shadesHealth: Phaser.GameObjects.Sprite,
        consoleDialogue?: Phaser.GameObjects.Text
    ): ShadesInterface => {
        if (!this.hashMapFillFlag) {
            this.hashmap.set("boss", "boss: shades.txt, cartridge, arms, legs");
            this.hashmap.set("cartridge", "cartridge: head, shell");
            this.hashmap.set("head", "head: emotions");
            this.hashmap.set("emotions", "emotions: ");
            this.hashmap.set("arms", "arms: left.txt, right.txt: ");
            this.hashmap.set("legs", "legs: left_leg.txt, right_leg.txt ");
            this.hashmap.set("shell", "shell: powder.txt, metal.txt");
            this.stack.push("boss");
            this.hashMapFillFlag = true;
            console.log(this.hashmap);
        }
        if (text === "$> ls") {
            console.log(curDir);
            consoleDialogue?.setText(this.hashmap.get(curDir)!);
        } else if (curDir === "boss" && text === "$> cd cartridge") {
            this.stack.push("cartridge");
            curDir = this.stack[this.stack.length - 1];
            consoleDialogue?.setText("cartridge: ");
        } else if (text === "$> cd ..") {
            if (this.stack.length > 1) {
                this.stack.pop();
            }
            curDir = this.stack[this.stack.length - 1];
            consoleDialogue?.setText("");
        } else if (curDir === "cartridge" && text === "$> cd head") {
            this.stack.push("head");
            curDir = this.stack[this.stack.length - 1];
            consoleDialogue?.setText("head: ");
        } else if (curDir === "head" && text === "$> mkdir mental") {
            this.hashmap.set("mental", "mental: ");
            this.hashmap.set("head", "head: emotions mental");
            consoleDialogue?.setText(this.hashmap.get("head")!);
            shadesHealth.setFrame(this.damageDealt);
            this.damageDealt += 1;
            this.damageSfx.play();
        } else if (
            curDir === "head" &&
            text === "$> cd mental" &&
            this.hashmap.has("mental")
        ) {
            this.stack.push("mental");
            curDir = this.stack[this.stack.length - 1];
            consoleDialogue?.setText("mental: ");
        } else if (curDir === "head" && text === "$> cd emotions") {
            this.stack.push("emotions");
            curDir = this.stack[this.stack.length - 1];
            consoleDialogue?.setText("emotions: ");
        } else if (curDir === "emotions" && text === "$> touch calm.sh") {
            this.hashmap.set("emotions", "emotions: calm.sh");
        } else if (curDir === "mental" && text === "$> touch knockout.sh") {
            this.hashmap.set("mental", "mental: knockout.sh");
        } else if (
            curDir === "emotions" &&
            this.hashmap.get("emotions") === "emotions: calm.sh" &&
            text === "$> ./calm.sh"
        ) {
            this.calmFlag = true;
            shadesHealth.setFrame(this.damageDealt);
            this.damageDealt += 1;
            this.damageSfx.play();
            consoleDialogue?.setText("Executed calm.sh!");
        } else if (
            curDir === "mental" &&
            this.hashmap.get("mental") === "mental: knockout.sh" &&
            text === "$> ./knockout.sh"
        ) {
            this.knockoutFlag = true;
            consoleDialogue?.setText("Executed knockout.sh!!");
            shadesHealth.setFrame(this.damageDealt);
            this.damageDealt += 1;
            this.damageSfx.play();
        } else if (curDir === "boss" && text === "$> cd arms") {
            this.stack.push("arms");
            curDir = this.stack[this.stack.length - 1];
            consoleDialogue?.setText("arms: ");
        } else if (curDir === "boss" && text === "$> cd legs") {
            this.stack.push("legs");
            curDir = this.stack[this.stack.length - 1];
            consoleDialogue?.setText("legs: ");
        } else if (curDir === "cartridge" && text === "$> cd shell") {
            this.stack.push("shell");
            curDir = this.stack[this.stack.length - 1];
            consoleDialogue?.setText("shell: ");
        } else {
            playerHealth.setFrame(this.damageTaken);
            this.damageTaken += 1;
            this.damageSfx.play();
            if (this.damageTaken === 4) {
                curDir = "LOST GAME";
            }
        }
        if (this.knockoutFlag && this.calmFlag) {
            this.hashmap.clear();
            this.stack = [];
            //this.damageTaken = 1;
            this.damageDealt = 1;
            return {
                curDir: curDir,
                won: true,
                playerHealth: playerHealth,
                shadesHealth: shadesHealth,
                dialogue: consoleDialogue,
            };
        }
        return {
            curDir: curDir,
            won: won3,
            playerHealth: playerHealth,
            shadesHealth: shadesHealth,
            dialogue: consoleDialogue,
        };
    };

    handleLevel2Console = (
        curDir: string,
        won2: boolean,
        consoleDialogue: Phaser.GameObjects.Text,
        text: string,
        fighting: boolean,
        mkDirTut: boolean,
        lsMkTest: boolean,
        cdTest: boolean,
        lsInTest: boolean,
        lsMyFile: boolean,
        touchMyFile: boolean,
        playerHealth: Phaser.GameObjects.Sprite,
        createdFile: boolean
    ): Level2Interface => {
        if (!fighting) {
            if (curDir === "") {
                if (text === "$> ls") {
                    curDir = "home";
                    consoleDialogue.setText("Home: ");
                }
            } else if (curDir === "home") {
                if (text === "$> mkdir Test") {
                    consoleDialogue.setText("Home: ");
                    mkDirTut = true;
                }
                if (text === "$> ls" && !mkDirTut) {
                    consoleDialogue.setText("Home: ");
                }
                if (text === "$> ls" && mkDirTut) {
                    consoleDialogue.setText("Home: Test");
                    lsMkTest = true;
                }
                if (text === "$> cd Test" && mkDirTut) {
                    consoleDialogue.setText("Test:");
                    curDir = "test";
                    cdTest = true;
                }
            } else if (curDir === "test") {
                if (text === "$> ls" && !lsMyFile) {
                    consoleDialogue.setText("Test:");
                    lsInTest = true;
                }
                if (text === "$> touch myFile.txt") {
                    consoleDialogue.setText("Test:");
                    lsMyFile = true;
                }
                if (text === "$> ls" && lsMyFile) {
                    consoleDialogue.setText("Test: myFile.txt");
                    touchMyFile = true;
                }
            }
            if (text === "$> cd rat") {
                if (touchMyFile) {
                    console.log(touchMyFile);
                }
                //   fighting = true;
                curDir = "rat";
            }
        } else {
            if (text === "$> ls" && curDir === "rat") {
                consoleDialogue.setText("Rat: ");
            } else if (text === "$> mkdir Core") {
                consoleDialogue.setText("Rat: ");
                curDir = "rat-core";
            } else if (text === "$> ls" && curDir === "rat-core") {
                consoleDialogue.setText("Rat: Core");
            } else if (text === "$> cd Core") {
                consoleDialogue.setText("Core:");
                curDir = "core";
            } else if (text === "$> ls" && curDir === "core" && !createdFile) {
                consoleDialogue.setText("Core:");
            } else if (text === "$> touch turnOff.sh" && curDir === "core") {
                createdFile = true;
                curDir = "core";
            } else if (text === "$> ls" && curDir === "core" && createdFile) {
                consoleDialogue.setText("Core: turnOff.sh");
            } else if (text === "$> ./turnOff.sh") {
                won2 = true;
                consoleDialogue.setText("");
            } else if (text === "cd .." && curDir === "core") {
                curDir = "rate-core";
                consoleDialogue.setText("Rat: Core");
            } else if (text !== "$> cd rat") {
                playerHealth.setFrame(this.damageTaken);
                this.damageTaken += 1;
                this.damageSfx.play();
            }
            if (this.damageTaken === 4) {
                curDir = "LOST GAME";
            }
        }
        return {
            curDir,
            won: won2,
            dialogue: consoleDialogue,
            text,
            fighting,
            mkDirTut,
            lsMkTest,
            cdTest,
            lsInTest,
            lsMyFile,
            touchMyFile,
            playerHealth,
            createdFile,
        };
    };
    handleConsoleText = (
        text: string,
        fighting: boolean,
        lsTutorial: boolean,
        cdTutorial: boolean,
        cdLsTut: boolean,
        cdBackTut: boolean,
        curDir: string,
        foundFile: boolean,
        won: boolean,
        playerHealth: Phaser.GameObjects.Sprite,
        consoleDialogue?: Phaser.GameObjects.Text
    ): ConsoleHelperInterface => {
        if (!fighting) {
            if (text === "$> ls" && curDir === "") {
                consoleDialogue?.setText("aboutMe");
                lsTutorial = true;
            }
            if (text === "$> cd aboutMe") {
                consoleDialogue?.setText("aboutMe:");
                curDir = "aboutMe";
                cdTutorial = true;
            }
            if (text === "$> ls" && curDir === "aboutMe") {
                consoleDialogue?.setText("aboutMe: secret.txt");
                cdLsTut = true;
            }
            if (text === "$> cd .." && curDir === "aboutMe") {
                consoleDialogue?.setText("");
                cdBackTut = true;
            }
        } else {
            if (curDir === "enemy") {
                // enemy home directory
                if (text === "$> ls") {
                    consoleDialogue?.setText(
                        "Enemy: evilStuff,  evilThings, evil.txt"
                    );
                } else if (text === "$> cd evilStuff") {
                    curDir = "evilStuff";
                    consoleDialogue?.setText("evilStuff:");
                } else if (text === "$> cd evilThings") {
                    curDir = "evilThings";
                    consoleDialogue?.setText("evilThings:");
                } else {
                    playerHealth.setFrame(this.damageTaken);
                    this.damageTaken += 1;
                    this.damageSfx.play();
                }
            } else if (curDir === "evilStuff") {
                if (text === "$> ls") {
                    consoleDialogue?.setText("evilStuff: notHere.txt mage.txt");
                } else if (text === "$> cd ..") {
                    curDir = "enemy";
                    consoleDialogue?.setText("enemy:");
                } else {
                    playerHealth.setFrame(this.damageTaken);
                    this.damageTaken += 1;
                    this.damageSfx.play();
                }
            } else if (curDir === "evilThings") {
                if (text === "$> ls") {
                    consoleDialogue?.setText("evilThings: maybeHere");
                } else if (text === "$> cd maybeHere") {
                    curDir = "doNotLook";
                    consoleDialogue?.setText("maybeHere:");
                } else if (text === "$> cd ..") {
                    curDir = "enemy";
                    consoleDialogue?.setText("Enemy:");
                } else {
                    playerHealth.setFrame(this.damageTaken);
                    this.damageTaken += 1;
                    this.damageSfx.play();
                }
            } else if (curDir === "doNotLook") {
                if (text === "$> ls") {
                    consoleDialogue?.setText("maybeHere: selfDestruct.sh");
                    foundFile = true;
                } else if (text === "$> ./selfDestruct.sh") {
                    this.damageTaken = 1;
                    won = true;
                    curDir = "";
                    consoleDialogue?.setText("");
                } else {
                    playerHealth.setFrame(this.damageTaken);
                    this.damageTaken += 1;
                    this.damageSfx.play();
                }
            } else {
                playerHealth.setFrame(this.damageTaken);
                this.damageTaken += 1;
                this.damageSfx.play();
            }
        }
        if (this.damageTaken === 4) {
            curDir = "LOST GAME";
        }
        return {
            text,
            fighting,
            lsTutorial,
            cdTutorial,
            cdLsTut,
            cdBackTut,
            curDir,
            foundFile,
            won,
            playerHealth,
            consoleDialogue,
        };
    };
}
