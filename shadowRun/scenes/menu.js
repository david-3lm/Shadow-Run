export default class Menu extends Phaser.Scene {

    constructor(){
        super({key:"Menu"});
    }

preload()
{
    // //carga de imagenes
    // this.load.image();
    // //carga de sprites
    // this.load.spritesheet();

    console.log("menu");
}

create()
{
    // //limites camara (fuera escena)
    // this.cameras.main.setBounds();
    // this.add.image();
    // //colisiones con obstaculos
    // this.physics.add.collider();
    // //camara que seguirá a jugador
    // this.cameras.main.startFollow();
    // //comprobar overlap con orbes 
    // this.physics.add.overlap();
    // //objeto cursor para uso teclado;
    // this.cursors = this.input.keyboard.createCursorKeys();
}

update(time, delta)
{
//     //comprobacion teclas pulsadas
//     if ( this.cursors.left.isDown ) {}

//     else if (this.cursors.right.isDown){}

//     else if (this.cursors.up.isDown){}

 }

}