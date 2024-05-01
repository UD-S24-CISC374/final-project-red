import Phaser from "phaser";
import { ConsoleHelperInterface } from "../interfaces/consoleHelperInterface";

export class ConsoleHelper {
    private stack: string[] = [];
    private hashmap = new Map<string, string>();
    private mapFillFlag: boolean = false;

    constructor() {}

    handleShadesBoss = (
        text: string,
        curDir: string,
        consoleDialogue?: Phaser.GameObjects.Text
    ) => {
        if (!this.mapFillFlag) {
            this.hashmap.set(
                "boss",
                "boss: [color=white]shades.txt cartridge arms legs"
            );
            this.hashmap.set("cartridge", "cartridge: head shell powder");
            this.hashmap.set("head", "head: mental emotions");
            this.hashmap.set("mental", "mental: ");
            this.hashmap.set("emotions", "emotions: ");
            this.mapFillFlag = true;
            console.log(this.hashmap);
        }
        if (text === "$> ls") {
            console.log(curDir);
            consoleDialogue?.setText(this.hashmap.get(curDir)!);
        }
        if (text === "$> cd cartridge") {
            this.stack.push("cartridge");
            curDir = this.stack[this.stack.length - 1];
            consoleDialogue?.setText(this.hashmap.get(curDir)!);
        }
        return;
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
