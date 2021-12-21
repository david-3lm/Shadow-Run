export default class Code extends Phaser.Scene {
    constructor() {
        super({key: "Code"});
    }

    preload(){
        this.load.image("code", "assets/menu/CODE_MENU.png");
        this.load.image("back", "assets/menu/BACK_OPTION.png");
        this.load.audio("a_back", "assets/SFX/Menu_back.mp3");
    }

    create(){
        this.fondo = this.add.image(300, 300, "code");
        this.back = this.add.image(670, 110, "back").setScale(0.7);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.a_back = this.sound.add("a_back");
    }

    update(){
        if(this.cursors.right.isDown){
            this.a_back.play();
            this.scene.stop("Code");
            this.scene.wake("Menu");
        }
    }
}
