export default class Credits extends Phaser.Scene {
    constructor() {
        super({key: "Credits"});
    }

    preload(){
        this.load.image("credits", "assets/menu/CREDITOS_MENU.png");
        this.load.image("back", "assets/menu/BACK_OPTION.png");
        this.load.audio("a_back", "assets/SFX/Menu_back.mp3");
    }

    create(){
        this.fondo = this.add.image(400, 300, "credits");
        this.back = this.add.image(110, 110, "back").setScale(0.7);
        console.log(this.back)
        this.back.flipX = true;
        this.cursors = this.input.keyboard.createCursorKeys();
        this.a_back = this.sound.add("a_back");
    }

    update(){
        if(this.cursors.left.isDown){
            this.a_back.play();
            this.scene.stop("Credits");
            this.scene.wake("Menu");
        }
    }
}
