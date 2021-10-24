import SceneBackground from "./sceneBackground.js";

export default class Level extends Phaser.Scene {

    constructor(){
        super({key:"Level"});

        
    }

preload()
{
    
    
    //carga de imagenes
    this.load.image("dino", "assets/spritesheets/png/Run (3).png");
   // this.load.image("bg", "assets/sprites/Background.png");
    this.load.image("platform", "assets/sprites/platform.png");
    this.load.image("orb","assets/sprites/orb.png");
  

    // //carga de sprites
    this.load.spritesheet("orbBlue", "assets/spritesheets/blue_orbs_sprite1.png",{frameWidth:140,frameHeight:512,endFrame:8});

   

  
}

create()
{
    //limites camara (fuera escena)
    this.cameras.main.setBounds(0, 0, 900 * 4, 600 * 2);
    this.physics.world.setBounds(0, 0, 900*4, 600*2);

    this.scene.launch("SceneBackground",SceneBackground);
    this.scene.sendToBack("SceneBackground");

 
    // this.anims.create({
    //     key: 'orbIdle',
    //     frames: this.anims.generateFrameNumbers('orbBlue', { start: 0, end: 6, first: 0 }),
    //     frameRate: 20,
    //     repeat: -1
    // });
    
    this.orbGroup = this.physics.add.staticGroup({
        key: 'orbBlue',
        frameQuantity: 1,
        immovable: true
    });

    var children = this.orbGroup.getChildren();
    children[0].setPosition(600,400).setScale(0.5);

    this.orbGroup.children.iterate((c)=>{
        let tween=  this.tweens.add({
        targets: c,
        props: {
            x:{
                duration:789,
                value: c.x+10
             },
            y:{
                duration:500,
               value: c.y+20
            },
        },
        repeat: -1,
        yoyo: true,
        ease: function (t) {
            return Math.pow(Math.sin(t * 500/360), 2);
        }
    })
    });

    
    this.orbGroup.refresh();

   

    this.p=this.physics.add.staticImage(400,600, 'platform').setScale(4);


    this.player= this.physics.add.image(400,300,"dino").setScale(0.25);



 

    // //colisiones con obstaculos y mundo
    this.physics.add.collider(this.player,this.p);
    this.player.setCollideWorldBounds(true);


    //camara que seguirá a jugador
    this.cameras.main.startFollow(this.player, true, 0.2, 0.02);
    this.cameras.main.followOffset.set(-100,0)

    // //comprobar overlap con orbes 
    this.physics.add.overlap(this.player,this.orbGroup,this.orbeVelocidad, null, this);

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

orbeVelocidad(player,orbe) {
        console.log(player);
        this.orbGroup.killAndHide(orbe);
        orbe.body.enable = false;
    }

}     
    