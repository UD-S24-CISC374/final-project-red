import { Directories } from "../interfaces/directories";
import Phaser from "phaser";

export class NpcHelper {
    constructor() {}

    public handleRoboInteraction(
        fighting: boolean,
        lsTutorial: boolean,
        cdTutorial: boolean,
        cdLsTut: boolean,
        cdBackTut: boolean,
        curDir: string | undefined,
        foundFile: boolean,
        won: boolean,
        dialogue?: Phaser.GameObjects.Text | undefined
    ): Directories {
        // Display textbox with NPC dialogue?
        if (!won) {
            if (!fighting) {
                dialogue?.setText(
                    "Hello! To get past that door, get through that evil mage!\nWe'll need to learn how to use the spell 'ls.' Test it out here!"
                );

                if (lsTutorial) {
                    dialogue?.setText(
                        "ls lists the files and directories inside your current directory!\nThere is another spell 'cd' - Try doing cd aboutMe"
                    );

                    curDir = "aboutMe";
                }
                if (cdTutorial) {
                    dialogue?.setText(
                        "cd lets you navigate filesystems and move around to different directories.\nNow, try using the spell you just learned to list everything in here!"
                    );
                }
                if (cdLsTut) {
                    dialogue?.setText(
                        "Nice, here's everything inside the aboutMe folder.\nTo go back to the previous directory, do 'cd ..'"
                    );
                }
                if (cdBackTut) {
                    dialogue?.setText(
                        "Great - we'll learn more later!\nYou are ready to take on your first enemy!\nFair warning, any typos during combat will cause damage\nType 'cd enemy'"
                    );
                }
            }

            if (fighting) {
                if (!foundFile) {
                    dialogue?.setText(
                        "There is a file somewhere that will disable the mage.\nIt might be hidden, so use ls and cd to find it."
                    );
                }
                if (foundFile) {
                    dialogue?.setText(
                        "You found it! Now we just need to call it.\nType ./selfDestruct.sh to defeat the mage!"
                    );
                }
            }
        } else {
            dialogue?.setText(
                "You beat the evil mage! Now you can explore past him!\nTry pushing that door now."
            );
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
