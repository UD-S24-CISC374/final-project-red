import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: "PreloadScene" });
    }

    preload() {
        this.load.image("startBackground", "assets/startBackground.png");
        this.load.image("startBtn", "assets/startBtn.png");
        this.load.image("platform", "assets/dungeonFloor.png");
        this.load.image("background", "assets/background.png");
        this.load.image("robo_guy", "assets/robo.png");
        this.load.image("rugged_wizard", "assets/rugged_wizard.png");
        this.load.audio("battleMusic", "assets/battle.mp3");
        this.load.audio("ambientMusic", "assets/ambient.mp3");
        this.load.audio("gameoverSfx", "assets/gameover.mp3");
        this.load.audio("damageSfx", "assets/damage.mp3");
        this.load.audio("victorySfx", "assets/victory.mp3");
        this.load.image("door", "assets/door.png");
        this.load.image("tiles", "assets/dungeon_tiles_v4.png");
        this.load.image("resourceful_rat", "assets/resourceful_rat.png");
        this.load.image("hunter", "assets/Hunter.png");
        this.load.tilemapTiledJSON("dungeon", "assets/DungeonMap.json");
        this.load.spritesheet("shades", "assets/shades_sheet.png", {
            frameWidth: 129,
            frameHeight: 162,
        });
        this.load.spritesheet("smiley", "assets/smiley_sheet.png", {
            frameWidth: 133,
            frameHeight: 164,
        });
        this.load.spritesheet("hearts", "assets/hearts.png", {
            frameWidth: 33,
            frameHeight: 19.25,
        });
        this.load.spritesheet("wizard", "assets/cultist_sheet.png", {
            frameWidth: 48,
            frameHeight: 70,
        });
        this.load.image("creditsBtn", "assets/credits-btn.png");
        this.load.image("controlsBtn", "assets/controlsBtn.png");
        this.load.image("creditsBackground", "assets/creditsBkd.png");
        this.load.image("backBtn", "assets/backBtn.png");
        this.load.image("mainBtn", "assets/mainBtn.png");
        
    }

    create() {
        this.scene.start("StartScene");
    }
}
