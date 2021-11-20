export default class Config extends Phaser.Scene {
    constructor() {
        super({key: "Config"});
    }

    preload(){
        this.load.image("config", "assets/menu/CONFIG_MENU.png");
        this.load.image("back", "assets/menu/BACK_OPTION.png");
        this.load.image("controles", "assets/menu/CONTROLES.png");
        this.load.audio("a_back", "assets/SFX/Menu_back.mp3");
    }

    create(){
        this.fondo = this.add.image(500, 310, "config");
        this.back = this.add.image(670, 110, "back").setScale(0.7);
        this.back = this.add.image(530, 440, "controles").setScale(0.67);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.a_back = this.sound.add("a_back");
    }

    update(){
        if(this.cursors.right.isDown){
            this.a_back.play();
            this.scene.stop("Config");
            this.scene.wake("Menu");
        }
    }
}
