import SceneBackground from "./sceneBackground.js";

export default class Level extends Phaser.Scene {

    constructor(){
        super({key:"Level"});
        this.velocity=600;
        this.jump=-800;
        this.buff=false;
        this.particles = null;

        this.emitterPB=null;
        this.emitterPR=null;
        this.emitterB=null;
        this.emitterR=null;

        this.playerB=null;
        this.playerR=null;
        
        
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
    //orbes
    this.load.image("orbBlueV", "assets/spritesheets/blue_orbs_2_sprite.png");
    this.load.image("orbBlueJ", "assets/spritesheets/blue_orbs_sprite.png");
    this.load.image("orbRedV", "assets/spritesheets/red_orbs_2_sprite.png");
    this.load.image("orbRedJ", "assets/spritesheets/red_orbs_sprite.png");

    //pjs
    //this.load.spritesheet("pj", "assets/spritesheets/Prueba.jpeg",{frameWidth:300,frameHeight:450,endFrame:5});
    this.load.spritesheet("pj", "assets/spritesheets/runBlueR.png",{ frameWidth: 64,frameHeight: 128, endFrame: 6});
    
    //particulas
    this.load.atlas('flares', 'assets/sprites/flares.png', 'assets/sprites/flares.json');

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

    this.particles=this.add.particles('flares');
   
    this.orbGroupB = this.physics.add.staticGroup({
        key: 'orbBlueV',
        frameQuantity: 1,
        immovable: true
    });
    this.orbGroupR = this.physics.add.staticGroup({
        key: 'orbRedV',
        frameQuantity: 1,
        immovable: true
    });

    this.emitterB=this.particles.createEmitter({
        frame: 'blue',
        lifespan: 600,
        speed: { min: 10, max: 200 },
        gravityY: 300,
        scale: { start: 0.4, end: 0 },
        quantity: 0.003,
        blendMode: 'ADD'
    });

    this.emitterPB=this.particles.createEmitter({
        frame: 'blue',
        lifespan: 600,
        speed: { min: 10, max: 200 },
        gravityY: 300,
        scale: { start: 0.4, end: 0 },
        quantity: 0.003,
        blendMode: 'ADD'
    });


    this.emitterR=this.particles.createEmitter({
        frame: 'red',
        lifespan: 600,
        speed: { min: 10, max: 200 },
        gravityY: 300,
        scale: { start: 0.4, end: 0 },
        quantity: 0.003,
        blendMode: 'ADD'
    });

    this.emitterPR=this.particles.createEmitter({
        frame: 'red',
        lifespan: 600,
        speed: { min: 10, max: 200 },
        gravityY: 300,
        scale: { start: 0.4, end: 0 },
        quantity: 0.003,
        blendMode: 'ADD'
    });

    var childrenB = this.orbGroupB.getChildren();
    childrenB[0].setPosition(500,400).setScale(0.5);
    this.emitterB.startFollow(childrenB[0]);

    var childrenR = this.orbGroupR.getChildren();
    childrenR[0].setPosition(700,400).setScale(0.5);
    this.emitterR.startFollow(childrenR[0]);

    this.orbGroupB.children.iterate((c)=>{
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
    this.orbGroupR.children.iterate((c)=>{
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

    
    this.orbGroupB.refresh();
    this.orbGroupR.refresh();


    this.playerR= this.physics.add.image(400,300,"dino").setScale(0.5);
    // this.anims.create({
    //     key: 'run',
    //     frames: this.anims.generateFrameNumbers('pj', { frames: [ 0, 1, 2, 3 ] }),
    //     frameRate: 8,
    //     repeat: -1
    // });
    // this.playerR.anims.play('run');


    this.playerB= this.physics.add.sprite(0,-300,"dino").setScale(0.5);

    this.anims.create({
        key: 'run',
        frames: this.anims.generateFrameNumbers('pj', { frames: [ 0, 1, 2, 3 ] }),
        frameRate: 8,
        repeat: -1
    });
    this.playerB.anims.play('run');





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
    


    // //colisiones con obstaculos y mundo
    this.physics.add.collider(this.playerB, this.platforms);
    this.physics.add.collider(this.playerR, this.platforms);
    this.playerB.setCollideWorldBounds(true);


    //--------------Fin plataformas-------------//

 









    //camara que seguirá a jugador
    this.cameras.main.startFollow(this.playerB, true, 0.2, 0.2);
    this.cameras.main.followOffset.set(-100,0)

    // //comprobar overlap con orbes 
    if(this.buff===false){
    this.physics.add.overlap(this.playerB,this.orbGroupB,this.orbeVelocidadBV, null, this);
    this.physics.add.overlap(this.playerB,this.orbGroupR,this.orbeVelocidadRV, null, this);
    this.physics.add.overlap(this.playerB,this.orbGroupB,this.orbeVelocidadBJ, null, this);
    this.physics.add.overlap(this.playerB,this.orbGroupR,this.orbeVelocidadRJ, null, this);

    this.physics.add.overlap(this.playerR,this.orbGroupB,this.orbeVelocidadBV, null, this);
    this.physics.add.overlap(this.playerR,this.orbGroupR,this.orbeVelocidadRV, null, this);
    this.physics.add.overlap(this.playerR,this.orbGroupB,this.orbeVelocidadBJ, null, this);
    this.physics.add.overlap(this.playerR,this.orbGroupR,this.orbeVelocidadRJ, null, this);
    }

    //objeto cursor para uso teclado;
    this.cursors = this.input.keyboard.createCursorKeys();
}

update(time, delta)
{
    this.playerB.setVelocityX(0);
    this.playerR.setVelocityX(0);
    if(this.buff!=true){
        this.timer=time;
    }else if(time-this.timer>3000){
        this.buff=false;
        this.velocity=600;
        this.jump=-800;
        this.emitterPR.stop();
        this.emitterPB.stop();
    }

    console.log(this.buff);

    if (this.cursors.left.isDown)
        {
            this.playerB.setVelocityX(-this.velocity);
            this.playerB.flipX = true;
            this.cameras.main.followOffset.x = -100;
        }
        else if (this.cursors.right.isDown)
        {
            this.playerB.setVelocityX(this.velocity);
            this.playerB.flipX = false;
            this.cameras.main.followOffset.x = -200;
           //this.player.play('run');
        }
        if (this.cursors.up.isDown && this.playerB.body.touching.down) 
        {
            this.playerB.setVelocityY(this.jump);
        } 

   
}

orbeVelocidadBV(player,orbe) {
        this.emitterPB.start();
        this.emitterPB.startFollow(player);
        this.orbGroupB.killAndHide(orbe);
        orbe.body.enable = false;
        this.emitterB.stop();

        if(player==this.playerB){
        this.velocity=1000;
        this.buff=true;
        }else if(player== this.playerR){
        this.velocity=300;
        this.buff=true;
        }
    }
orbeVelocidadRV(player,orbe) {
        this.emitterPR.start();
        this.emitterPR.startFollow(player);
        this.orbGroupR.killAndHide(orbe);
        orbe.body.enable = false;
        this.emitterR.stop();

        if(player==this.playerR){
        this.velocity=1000;
        this.buff=true;
        }else if(player==this.playerB){
        this.velocity=300;
        this.buff=true;
        }
}
orbeVelocidadBJ(player,orbe) {
    this.emitterPB.start();
        this.emitterPB.startFollow(player);
        this.orbGroupB.killAndHide(orbe);
        orbe.body.enable = false;
        this.emitterB.stop();

        if(player==this.playerB){
        this.jump=-1200;
        this.buff=true;
        }else if(player== this.playerR){
        this.jump=-300;
        this.buff=true;
        }
}
orbeVelocidadRJ(player,orbe) {
    this.emitterPR.start();
    this.emitterPR.startFollow(player);
    this.orbGroupR.killAndHide(orbe);
    orbe.body.enable = false;
    this.emitterR.stop();

    if(player==this.playerR){
    this.jump=1000;
    this.buff=true;
    }else if(player==this.playerB){
    this.velocity=300;
    this.buff=true;
    }
}


}     
    