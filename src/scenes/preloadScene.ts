import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: "PreloadScene" });
    }

    preload() {
        this.load.image("startBackground", "assets/startBackground.png");
        this.load.image("startBtn", "assets/startBtn.png");
        this.load.image("wizard", "assets/cultistIdle.png");
        this.load.image("platform", "assets/dungeonFloor.png");
        this.load.image("background", "assets/background.png");
        this.load.image("robo_guy", "assets/robo.png");
        this.load.image("rugged_wizard", "assets/rugged_wizard.png");
        this.load.image("door", "assets/door.png");
        this.load.image("tiles", "assets/dungeon_tiles_v4.png");
        this.load.image("resourceful_rat", "assets/resourceful_rat.png");
        this.load.image("hunter", "assets/Hunter.png");
        this.load.tilemapTiledJSON("dungeon", "assets/DungeonMap.json");
    }

    create() {
        this.scene.start("StartScene");
    }
}
