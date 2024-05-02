import Phaser from "phaser";
import { Directories } from "../interfaces/directories";

export class Npc2Helper {
    constructor() {}

    public handleHunterInteraction(
        fighting: boolean,
        curDir: string | undefined, 
        won2: boolean,
        mkDirTut: boolean,
        lsMkTest: boolean,
        cdTest: boolean,
        lsInTest: boolean,
        lsMyFile: boolean,
        touchMyFile: boolean,
        createdFile: boolean,
        dialogue?: Phaser.GameObjects.Text | undefined,
    ): Directories {
        if (!won2) {
            if (!fighting) {
                dialogue?.setText(
                    "Welcome! I need help defeating the Rat King.\nI'll teach you how to make a directory! Try 'mkdir Test'"
                    //mkDirTut
                );
                if (mkDirTut) {
                    console.log("mkDirTut");
                    dialogue?.setText(
                        "Check if the new directory was created by listing everything. You learned this earlier!"
                    );
                    //lsMkTest
                }
                if (lsMkTest) {
                    dialogue?.setText(
                        "There's your new directory Test! Do you remember how to move into directories? Move into Test"
                    );
                    //cdTest
                }
                if (cdTest) {
                    dialogue?.setText(
                        "List everything in this directory. You'll see it's empty - I'll show you how to change that!"
                    );
                    //lsintest
                }
                if (lsInTest) {
                    dialogue?.setText(
                        "Let's create a file. To create a file, there is a spell called 'touch'\nTry typing 'touch myFile.txt'"
                    );
                    //lsMyFile
                }
                if (lsMyFile) {
                    dialogue?.setText(
                        "Type ls to see your new file!"
                    )
                    //touchMyFile
                }
                if (touchMyFile) {
                    dialogue?.setText(
                        "Cool, now you know how to create files!\nI think I've prepared you to take on the Rat King. Type cd rat to start your battle!"
                    )
                    //rat
                }
            }

            if (fighting) {
                if (!createdFile) {
                    dialogue?.setText(
                        "Find a directory called 'Core', then create a directory called 'Off'\nInisde off, create a file called 'turnOff.sh'"
                    );
                }
                if (createdFile) {
                    dialogue?.setText(
                        "Nice! Now just type turnOff.sh to defeat the Rat King!"
                    );
                }
            }
        }
        else {
            dialogue?.setText("Yay! You beat the Rat King. Keep exploring!");
            curDir = "";
            fighting = false;
        }

        return {
            fighting,
            curDir,
            dialogue,
        };
    }
}