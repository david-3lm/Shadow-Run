class example extends Phaser.Scene {

    constructor(){
        super('example');
    }

preload()
{
    //carga de imagenes
    this.load.image();
    //carga de sprites
    this.load.spritesheet();
}

create()
{
    //limites camara (fuera escena)
    this.cameras.main.setBounds();
    this.add.image();
    //colisiones con obstaculos
    this.physics.add.collider();
    //camara que seguirá a jugador
    this.cameras.main.startFollow();
    //comprobar overlap con orbes 
    this.physics.add.overlap();
    //objeto cursor para uso teclado;
    this.cursors = this.input.keyboard.createCursorKeys();
}

update()
{
    //comprobacion teclas pulsadas
    if ( this.cursors.left.isDown ) {}

    else if (this.cursors.right.isDown){}

    else if (this.cursors.up.isDown){}

}

}