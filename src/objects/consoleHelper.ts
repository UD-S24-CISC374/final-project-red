import Phaser from "phaser";
import { ConsoleHelperInterface } from "../interfaces/consoleHelperInterface";
import { ShadesInterface } from "../interfaces/shadesInterface";

export class ConsoleHelper {
    private stack: string[] = [];
    private hashmap = new Map<string, string>();
    private mapFillFlag: boolean = false;
    private calmFlag: boolean = false;
    private knockoutFlag: boolean = false;

    constructor() {}

    handleShadesBoss = (
        text: string,
        curDir: string,
        won3: boolean,
        consoleDialogue?: Phaser.GameObjects.Text
    ): ShadesInterface => {
        if (!this.mapFillFlag) {
            this.hashmap.set("boss", "boss: shades.txt cartridge arms legs");
            this.hashmap.set("cartridge", "cartridge: head shell powder");
            this.hashmap.set("head", "head: emotions");
            this.hashmap.set("emotions", "emotions: ");
            this.stack.push("boss");
            this.mapFillFlag = true;
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
            consoleDialogue?.setText("");
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
            consoleDialogue?.setText("Executed calm.sh!!");
        } else if (
            curDir === "mental" &&
            this.hashmap.get("mental") === "mental: knockout.sh" &&
            text === "$> ./knockout.sh"
        ) {
            this.knockoutFlag = true;
            consoleDialogue?.setText("Executed knockout.sh!!");
        }
        if (this.knockoutFlag && this.calmFlag) {
            console.log("win");
            return { curDir: curDir, won: true, dialogue: consoleDialogue };
        }
        return { curDir: curDir, won: won3, dialogue: consoleDialogue };
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
        consoleDialogue?: Phaser.GameObjects.Text
    ): ConsoleHelperInterface => {
        if (!fighting) {
            if (text === "$> ls" && curDir === "") {
                consoleDialogue?.setText("aboutMe dungeon.txt");
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
                        "Enemy: evilStuff  evilThings evil.txt"
                    );
                }
                if (text === "$> cd evilStuff") {
                    curDir = "evilStuff";
                    consoleDialogue?.setText("evilStuff:");
                }
                if (text === "$> cd evilThings") {
                    curDir = "evilThings";
                    consoleDialogue?.setText("evilThings:");
                }
            }
            if (curDir === "evilStuff") {
                if (text === "$> ls") {
                    consoleDialogue?.setText("evilStuff: notHere.txt mage.txt");
                }
                if (text === "$> cd ..") {
                    curDir = "enemy";
                    consoleDialogue?.setText("enemy:");
                }
            }
            if (curDir === "evilThings") {
                if (text === "$> ls") {
                    consoleDialogue?.setText("evilThings: doNotLook");
                }
                if (text === "$> cd doNotLook") {
                    curDir = "doNotLook";
                    consoleDialogue?.setText("doNotLook:");
                }
                if (text === "$> cd ..") {
                    curDir = "enemy";
                    consoleDialogue?.setText("enemy:");
                }
            }
            if (curDir === "doNotLook") {
                if (text === "$> ls") {
                    consoleDialogue?.setText("doNotLook: selfDestruct.sh");
                    foundFile = true;
                }
                if (text === "$> selfDestruct.sh") {
                    won = true;
                    consoleDialogue?.setText("");
                }
            }
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
            consoleDialogue,
        };
    };
}
