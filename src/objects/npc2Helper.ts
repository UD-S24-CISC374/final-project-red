import { Directories } from "../interfaces/directories";
import Phaser from "phaser";

export class Npc2Helper {
    constructor() {}

    public handleHunterInteraction(
        fighting: boolean,
        curDir: string | undefined, 
        won: boolean,
        mkDirTut: boolean,
        lsMkTest: boolean,
        cdTest: boolean,
        lsInTest: boolean,
        lsMyFile: boolean,
        touchMyFile: boolean,
        createdFile: boolean,
        dialogue?: Phaser.GameObjects.Text | undefined,
    ): Directories {
        if (won) {
            dialogue?.setText(
                "You beat the Rat King! Go on and keep exploring!"
            );
            curDir = "";
            fighting = false;
        } else {
            if (!fighting) {
                dialogue?.setText(
                    "Welcome! I need help defeating the Rat King.\nI'll teach you how to make a directory! Try 'mkdir Test'"
                );
                if (mkDirTut) {
                    dialogue?.setText(
                        "Check if the new directory was created by listing everything.\nYou learned this earlier!"
                    );
                }
                if (lsMkTest) {
                    dialogue?.setText(
                        "There's your new directory Test!\nDo you remember how to move into directories? Move into Test"
                    );
                }
                if (cdTest) {
                    dialogue?.setText(
                        "List everything in this directory.\nYou'll see it's empty - I'll show you how to change that!"
                    );
                }
                if (lsInTest) {
                    dialogue?.setText(
                        "Let's create a file. To create a file, there is a spell called 'touch'\nTry typing 'touch myFile.txt'"
                    );
                }
                if (lsMyFile) {
                    dialogue?.setText(
                        "Type ls to see your new file!"
                    )
                }
                if (touchMyFile) {
                    dialogue?.setText(
                        "Cool, now you know how to create files!\nI think I've prepared you to take on the Rat King. Type cd rat to start your battle!"
                    )
                }
            }
            else {
                if (!createdFile) {
                    dialogue?.setText(
                        "Create a directory called Core\nInisde Core, create a file called 'turnOff.sh'"
                    );
                }
                if (createdFile) {
                    dialogue?.setText(
                        "Nice! Now just type ls to see your file, then type turnOff.sh to defeat the Rat King!"
                    );
                    won = true;
            }
        }
    } 
    return {
            fighting,
            curDir,
            dialogue,
        };
    }
}