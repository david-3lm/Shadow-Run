import SceneBackground from "./sceneBackground.js";

export default class Level extends Phaser.Scene {

    constructor(){
        super({key:"Level"});

        
    }

preload()
{
    
    //carga de imagenes
    //this.load.image("dino", "assets/spritesheets/png/Run (3).png");
    this.load.image("dino", "assets/spritesheets/png/Run (3) pruebas.png");
   // this.load.image("bg", "assets/sprites/Background.png");
    this.load.image("platform", "assets/sprites/platform.png");
    this.load.image("orb","assets/sprites/orb.png");
  

    // //carga de sprites
    this.load.spritesheet("orbBlue", "assets/spritesheets/blue_orbs_sprite1.png",{frameWidth:140,frameHeight:512,endFrame:8});
    

    //carga de plataformas
    this.load.image("Platform1","assets/sprites/Platform1.png");
    this.load.image("Platform2","assets/sprites/Platform2.png");
    this.load.image("Platform3","assets/sprites/Platform3.png");
    this.load.image("PlatformM","assets/sprites/MovingPlatform.png");
   
   

  
}

create()
{
    //limites camara (fuera escena)
    this.cameras.main.setBounds(0, -600*5, 900 * 200, 600 * 10);
    this.physics.world.setBounds(0, -600*5, 900*200, 600*10);

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

   

    //this.p=this.physics.add.staticImage(400,600, 'platform').setScale(4);


    //this.player= this.physics.add.image(400,300,"dino").setScale(0.25);
    this.player= this.physics.add.image(0,-300,"dino").setScale(0.5);






    //----------------Plataformas---------------
    this.platforms = this.physics.add.staticGroup();

    //1 
    this.platforms.create(0,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(256,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(512,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(768,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(1024,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(1280,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(1536,600,'Platform1').setOrigin(0,0).refreshBody();

    this.platforms.create(1024,472,'Platform2').setOrigin(0,0).refreshBody();

    //2
    this.platforms.create(2048,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(2304,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(2560,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(2816,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(3072,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(3328,600,'Platform1').setOrigin(0,0).refreshBody();

    this.platforms.create(2304,472,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(2816,472,'Platform1').setOrigin(0,0).refreshBody();

    this.platforms.create(2304,-40,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(2816,-40,'Platform1').setOrigin(0,0).refreshBody();

    //3
    //this.platforms.create(3584,600,'Platform1').setOrigin(0,0).refreshBody();
    //this.platforms.create(3840,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(4096,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(4352,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(4608,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(4864,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(5120,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(5376,600,'Platform1').setOrigin(0,0).refreshBody();

    this.platforms.create(3584,728,'Platform2').setOrigin(0,0).refreshBody();
    this.platforms.create(4608,472,'Platform2').setOrigin(0,0).refreshBody();
    this.platforms.create(5120,472,'Platform2').setOrigin(0,0).refreshBody();

    this.platforms.create(4224,344,'Platform3').setOrigin(0,0).refreshBody();
    this.platforms.create(4736,216,'Platform3').setOrigin(0,0).refreshBody();
    this.platforms.create(4992, 88,'Platform3').setOrigin(0,0).refreshBody();
    this.platforms.create(5248,-40,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(5248,-552,'Platform1').setOrigin(0,0).refreshBody();

    //4
    this.platforms.create(5632,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(6912,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(7168,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(7424,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(7424,344,'Platform1').setOrigin(0,0).refreshBody();

    this.platforms.create(5888,728,'Platform2').setOrigin(0,0).refreshBody();
    this.platforms.create(6400,728,'Platform2').setOrigin(0,0).refreshBody();

    this.platforms.create(6528,472,'Platform3').setOrigin(0,0).refreshBody();
    this.platforms.create(7040,344,'Platform3').setOrigin(0,0).refreshBody();

    this.platforms.create(5888,-40,'PlatformM').setOrigin(0,0).refreshBody();
    this.platforms.create(6528,-40,'PlatformM').setOrigin(0,0).refreshBody();
    this.platforms.create(7168,-40,'Platform2').setOrigin(0,0).refreshBody();

    //5
    this.platforms.create(8064,344,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(8320,344,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(8576,344,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(8832,344,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(9088,344,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(9344,344,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(9600,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(9856,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(10112,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(10368,600,'Platform1').setOrigin(0,0).refreshBody();


    this.platforms.create(8832,88,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(8576,216,'Platform3').setOrigin(0,0).refreshBody();

    this.platforms.create(8064,-40,'Platform2').setOrigin(0,0).refreshBody();
    this.platforms.create(9600,472,'Platform2').setOrigin(0,0).refreshBody();

    //6
    this.platforms.create(10624,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(10880,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(11136,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(11392,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(11648,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(11904,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(12160,600,'Platform1').setOrigin(0,0).refreshBody();

    this.platforms.create(11904,344,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(12160,344,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(12160,88,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(12160,-168,'Platform1').setOrigin(0,0).refreshBody();

    this.platforms.create(10624,88,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(10880,88,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(11136,88,'Platform1').setOrigin(0,0).refreshBody();

    this.platforms.create(10624,472,'Platform2').setOrigin(0,0).refreshBody();

    this.platforms.create(11648,472,'Platform3').setOrigin(0,0).refreshBody();
    this.platforms.create(11392,216,'Platform3').setOrigin(0,0).refreshBody();

    //7
    this.platforms.create(10240,-40,'Platform3').setOrigin(0,0).refreshBody();
    this.platforms.create(9856,-168,'Platform3').setOrigin(0,0).refreshBody();
    this.platforms.create(10368,-296,'Platform3').setOrigin(0,0).refreshBody();

    this.platforms.create(10624,-424,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(10880,-424,'Platform1').setOrigin(0,0).refreshBody();

    this.platforms.create(10624,-936,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(10880,-936,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(11136,-936,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(11392,-936,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(11648,-936,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(11904,-936,'Platform1').setOrigin(0,0).refreshBody();

    this.platforms.create(11136,-296,'Platform2').setOrigin(0,0).refreshBody();
    this.platforms.create(11648,-296,'Platform2').setOrigin(0,0).refreshBody();
    this.platforms.create(11392,-552,'Platform2').setOrigin(0,0).refreshBody();
    this.platforms.create(11904,-552,'Platform2').setOrigin(0,0).refreshBody();

    //8
    this.platforms.create(12416,88,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(12672,88,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(12928,88,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(13184,88,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(13440,88,'Platform1').setOrigin(0,0).refreshBody();

    this.platforms.create(13184,-168,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(13184,344,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(13184,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(12928,344,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(12928,600,'Platform1').setOrigin(0,0).refreshBody();
    
    this.platforms.create(12416,-40,'Platform3').setOrigin(0,0).refreshBody();
    this.platforms.create(12928,-40,'Platform3').setOrigin(0,0).refreshBody();
    this.platforms.create(13696,472,'Platform3').setOrigin(0,0).refreshBody();

    this.platforms.create(12800,-552,'PlatformM').setOrigin(0,0).refreshBody();
    this.platforms.create(13312,-552,'PlatformM').setOrigin(0,0).refreshBody();

    this.platforms.create(13952,-424,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(13952,-168,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(13952,88,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(13952,344,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(14208,-168,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(14464,-168,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(14720,88,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(14976,344,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(14976,88,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(14208,-296,'Platform3').setOrigin(0,0).refreshBody();
    this.platforms.create(14720,-40,'Platform3').setOrigin(0,0).refreshBody();

    this.platforms.create(15488,88,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(15488,-168,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(15488,-424,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(15488,-680,'Platform1').setOrigin(0,0).refreshBody();

    this.platforms.create(12928,856,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(13184,856,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(13440,856,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(13696,856,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(13952,856,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(14208,856,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(14464,856,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(14720,856,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(14976,856,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(15232,856,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(15488,856,'Platform1').setOrigin(0,0).refreshBody();

    this.platforms.create(14336,728,'Platform2').setOrigin(0,0).refreshBody();

    //9
    this.platforms.create(16128,856,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(16384,856,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(16640,856,'Platform1').setOrigin(0,0).refreshBody();

    this.platforms.create(16640,728,'Platform3').setOrigin(0,0).refreshBody();

    this.platforms.create(17152,856,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(17152,600,'Platform1').setOrigin(0,0).refreshBody();

    this.platforms.create(17792,856,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(17792,600,'Platform1').setOrigin(0,0).refreshBody();

    this.platforms.create(18432,856,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(18432,600,'Platform1').setOrigin(0,0).refreshBody();

    this.platforms.create(18944,600,'PlatformM').setOrigin(0,0).refreshBody();
    this.platforms.create(19456,600,'PlatformM').setOrigin(0,0).refreshBody();

    this.platforms.create(20096,856,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(20096,600,'Platform1').setOrigin(0,0).refreshBody();
    



    this.physics.add.collider(this.player, this.platforms);
    //--------------Fin plataformas-------------

 





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
            this.player.setVelocityX(-550);
            this.cameras.main.followOffset.x = 100;
        }
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(550);
            this.cameras.main.followOffset.x = -100;
        }
        if (this.cursors.up.isDown && this.player.body.touching.down) 
        {

            this.player.setVelocityY(-800);
        }
   
}

orbeVelocidad(player,orbe) {
        console.log(player);
        this.orbGroup.killAndHide(orbe);
        orbe.body.enable = false;
    }

}     
    