import Menu from "./menu.js";

export default class Config extends Phaser.Scene {
    constructor() {
        super({key: "Config"});
    }

    preload(){
        this.load.image("config", "assets/menu/CONFIG_MENU.png");
        this.load.image("back", "assets/menu/BACK_OPTION.png");
        this.load.image("controles", "assets/menu/CONTROLES.png");
    }

    create(){
        this.fondo = this.add.image(500, 310, "config");
        this.back = this.add.image(670, 110, "back").setScale(0.7);
        this.back = this.add.image(530, 440, "controles").setScale(0.67);
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update(){
        if(this.cursors.right.isDown){
            this.scene.launch("Menu",Menu);
            this.scene.stop("Config", Config);
        }
    }
}