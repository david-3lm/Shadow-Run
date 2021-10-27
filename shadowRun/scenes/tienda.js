import Menu from "./menu.js";

export default class Tienda extends Phaser.Scene {
    constructor() {
        super({key: "Tienda"});
    }

    preload(){
        this.load.image("tienda", "assets/menu/TIENDA_MENU.png");
        this.load.image("back", "assets/menu/BACK_OPTION.png");
        this.load.audio("a_back", "assets/menu/Menu_back.mp3");
    }

    create(){
        this.fondo = this.add.image(400, 300, "tienda");
        this.back = this.add.image(110, 110, "back").setScale(0.7);
        this.back.angle = -90;
        this.cursors = this.input.keyboard.createCursorKeys();
        this.a_back = this.sound.add("a_back");
    }

    update(){
        if(this.cursors.up.isDown){
            this.a_back.play();
            this.scene.launch("Menu",Menu);
            this.scene.stop("Tienda", Tienda);
        }
    }
}