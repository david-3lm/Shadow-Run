export default class Level extends Phaser.Scene {

    constructor(){
        super({key:"Level"});

        
    }

preload()
{
    
    //carga de imagenes
    this.load.image("dino", "../assets/spritesheets/png/Run (3).png");
    this.load.image("bg", "../assets/sprites/Background.png");
    this.load.image("platform", "../assets/sprites/platform.png");
    // //carga de sprites
    // this.load.spritesheet();

    console.log("level");
}

create()
{
    //limites camara (fuera escena)
    this.cameras.main.setBounds(0, 0, 900 * 2, 600 * 2);
    this.physics.world.setBounds(0, 0, 900*2, 600*2);



    this.add.image(0, 0, 'bg').setOrigin(0);
    this.add.image(900, 0, 'bg').setOrigin(0).setFlipX(true);
    this.add.image(0, 600, 'bg').setOrigin(0).setFlipY(true);
    this.add.image(900, 600, 'bg').setOrigin(0).setFlipX(true).setFlipY(true);

    this.p=this.physics.add.staticImage(400,600, 'platform');


    this.player= this.physics.add.image(400,300,"dino").setScale(0.25);


    this.physics.add.collider(this.player,this.p);
    this.player.setCollideWorldBounds(true);

    // //colisiones con obstaculos
    // this.physics.add.collider();
    //camara que seguirá a jugador
    this.cameras.main.startFollow(this.player, true, 0.2, 0.02);

    this.cameras.main.followOffset.set(-150,0)

    // //comprobar overlap con orbes 
    // this.physics.add.overlap();
     //objeto cursor para uso teclado;
    this.cursors = this.input.keyboard.createCursorKeys();
}

update(time, delta)
{
    this.player.setVelocityX(0);
    if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-500);
            this.cameras.main.followOffset.x = 100;
        }
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(500);
            this.cameras.main.followOffset.x = -100;
        }
        if (this.cursors.up.isDown && this.player.body.touching.down) 
        {

            this.player.setVelocityY(-500);
        }
}

}