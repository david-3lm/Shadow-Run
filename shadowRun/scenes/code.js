import Menu from "./menu.js";

export default class Code extends Phaser.Scene {
    constructor() {
        super({key: "Code"});
    }

    preload(){
        this.load.image("code", "assets/menu/CODE_MENU.png");
        this.load.image("back", "assets/menu/BACK_OPTION.png");
    }

    create(){
        this.fondo = this.add.image(300, 300, "code");
        this.back = this.add.image(670, 110, "back").setScale(0.7);
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update(){
        if(this.cursors.right.isDown){
            this.scene.launch("Menu",Menu);
            this.scene.stop("Code", Code);
        }
    }
}