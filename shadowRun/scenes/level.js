import SceneBackground from "./sceneBackground.js";

export default class Level extends Phaser.Scene {

    constructor(){
        super({key:"Level"});
        this.velocityR=600;
        this.jumpR=-800;
        this.buffR=false;
        this.velocityB=600;
        this.jumpB=-800;
        this.buffB=false;
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
    this.load.image("orbBlueJ", "assets/spritesheets/blue_orbs_3_sprite.png");
    this.load.image("orbRedV", "assets/spritesheets/red_orbs_2_sprite.png");
    this.load.image("orbRedJ", "assets/spritesheets/red_orbs_3_sprite.png");

    //pjs
    //this.load.spritesheet("pj", "assets/spritesheets/Prueba.jpeg",{frameWidth:300,frameHeight:450,endFrame:5});
    this.load.spritesheet("pj", "assets/spritesheets/BLUE2.png",{ frameWidth: 408,frameHeight: 363, endFrame: 9});

    
    //particulas
    this.load.atlas('flares', 'assets/sprites/flares.png', 'assets/sprites/flares.json');

    //carga de plataformas
    this.load.image("Platform1","assets/sprites/Platform1.png");
    this.load.image("Platform2","assets/sprites/Platform2.png");
    this.load.image("Platform3","assets/sprites/Platform3.png");
    this.load.image("PlatformM","assets/sprites/MovingPlatform.png");

    //Señal muerte
    this.load.image("Death", "assets/sprites/DEATH_SENTENCE.png");

    //LASER
    this.load.image("laser", "assets/sprites/Laser.png");
   
   

  
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

    this.orbGroupB2 = this.physics.add.staticGroup({
        key: 'orbBlueJ',
        frameQuantity: 1,
        immovable: true
    });

    this.orbGroupR2 = this.physics.add.staticGroup({
        key: 'orbRedJ',
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
    childrenB[0].setPosition(500,400).setScale(0.5).refreshBody();
    this.emitterB.startFollow(childrenB[0]);

    var childrenR = this.orbGroupR.getChildren();
    childrenR[0].setPosition(700,400).setScale(0.5).refreshBody();
    this.emitterR.startFollow(childrenR[0]);

    var childrenB2 = this.orbGroupB2.getChildren();
    childrenB2[0].setPosition(200,400).setScale(0.5).refreshBody();
    this.emitterB.startFollow(childrenB2[0]);

    var childrenR2 = this.orbGroupR2.getChildren();
    childrenR2[0].setPosition(900,400).setScale(0.5).refreshBody();
    this.emitterR.startFollow(childrenR2[0]);

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

    this.orbGroupB2.children.iterate((c)=>{
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
    this.orbGroupR2.children.iterate((c)=>{
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
    this.orbGroupB2.refresh();
    this.orbGroupR2.refresh();


    this.playerR= this.physics.add.image(400,300,"dino").setScale(0.5);
    // this.anims.create({
    //     key: 'run',
    //     frames: this.anims.generateFrameNumbers('pj', { frames: [ 0, 1, 2, 3 ] }),
    //     frameRate: 8,
    //     repeat: -1
    // });
    // this.playerR.anims.play('run');


    //this.playerB= this.physics.add.sprite(0,-300,"dino").setScale(0.5);
    this.playerB= this.physics.add.sprite(200,-300,"pj").setScale(0.25); //Solo pàra pruebas eliminar después y usar la de arriba.


    this.anims.create({
        key: 'run',
        frames: this.anims.generateFrameNumbers('pj', { frames: [ 0,1,2,3,4,5,6 ] }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('pj', { frames: [8 ] }),
        frameRate: 8,
        repeat: -1
    });
    this.anims.create({
        key: 'jump',
        frames: this.anims.generateFrameNumbers('pj', { frames: [9 ] }),
        frameRate: 8,
        repeat: -1
    });
    // this.dataAnim= this.cache.json.get('blue2_anim');
    // this.anims.fromJSON(this.dataAnim);
    // this.playerB.anims.play('runB');

    this.playerB.anims.play('run');



    //----------------Plataformas---------------
    this.platforms = this.physics.add.staticGroup();
    this.deathsign = this.physics.add.staticGroup();

    //1 
    this.platforms.create(0,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(256,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(512,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(768,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(1024,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(1280,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(1536,600,'Platform1').setOrigin(0,0).refreshBody();

    this.deathsign.create(1920,400,'Death');

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

    this.deathsign.create(7872,144,'Death');

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

    this.deathsign.create(15936,656,'Death');

    //9
    this.platforms.create(16128,856,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(16384,856,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(16640,856,'Platform1').setOrigin(0,0).refreshBody();

    this.platforms.create(16640,728,'Platform3').setOrigin(0,0).refreshBody();

    this.deathsign.create(17000,528,'Death');

    this.platforms.create(17152,856,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(17152,600,'Platform1').setOrigin(0,0).refreshBody();

    this.deathsign.create(17600,456,'Death');

    this.platforms.create(17792,856,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(17792,600,'Platform1').setOrigin(0,0).refreshBody();

    this.deathsign.create(18240,456,'Death');

    this.platforms.create(18432,856,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(18432,600,'Platform1').setOrigin(0,0).refreshBody();

    this.deathsign.create(18840,400,'Death');

    this.platforms.create(18944,600,'PlatformM').setOrigin(0,0).refreshBody();
    this.platforms.create(19456,600,'PlatformM').setOrigin(0,0).refreshBody();

    this.platforms.create(20096,856,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(20096,600,'Platform1').setOrigin(0,0).refreshBody();

    this.deathsign.create(20550,456,'Death');

    //10
    this.platforms.create(20736,856,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(20736,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(20992,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(21248,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(21504,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(21760,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(22016,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(22272,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(22528,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(22784,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(23040,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(23296,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(23552,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(23808,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(24064,600,'Platform1').setOrigin(0,0).refreshBody();
    
    this.platforms.create(24064,344,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(24064,88,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(24064,-40,'Platform3').setOrigin(0,0).refreshBody();
    this.platforms.create(23808,472,'Platform3').setOrigin(0,0).refreshBody();

    this.platforms.create(24320,344,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(24320,88,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(24320,-40,'Platform3').setOrigin(0,0).refreshBody();

    this.platforms.create(24576,344,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(24576,88,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(24576,-40,'Platform3').setOrigin(0,0).refreshBody();

    this.platforms.create(21376,344,'Platform3').setOrigin(0,0).refreshBody();
    this.platforms.create(21760,216,'Platform3').setOrigin(0,0).refreshBody();
    this.platforms.create(22144,88,'Platform3').setOrigin(0,0).refreshBody();
    this.platforms.create(22528,-40,'Platform3').setOrigin(0,0).refreshBody();
    this.platforms.create(23040,-168,'Platform3').setOrigin(0,0).refreshBody();

    this.platforms.create(22144,472,'Platform3').setOrigin(0,0).refreshBody();
    this.platforms.create(22528,344,'Platform3').setOrigin(0,0).refreshBody();
    this.platforms.create(23040,216,'Platform3').setOrigin(0,0).refreshBody();
    this.platforms.create(23424,344,'Platform3').setOrigin(0,0).refreshBody();

    this.platforms.create(23296,-296,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(23552,-296,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(23296,-808,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(23296,-1064,'Platform1').setOrigin(0,0).refreshBody();    

    this.platforms.create(23808,-296,'Platform3').setOrigin(0,0).refreshBody();
    this.platforms.create(24448,-296,'Platform3').setOrigin(0,0).refreshBody();
    this.platforms.create(24320,-424,'Platform3').setOrigin(0,0).refreshBody();
    
    this.platforms.create(23552,88,'Platform2').setOrigin(0,0).refreshBody();
    this.platforms.create(24192,-168,'Platform2').setOrigin(0,0).refreshBody();

    //11
    this.platforms.create(24704,-168,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(24960,-168,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(25216,-168,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(25216,88,'Platform1').setOrigin(0,0).refreshBody();

    this.platforms.create(25600,88,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(25600,344,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(25600,-40,'Platform3').setOrigin(0,0).refreshBody();

    this.platforms.create(25984,88,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(25984,344,'Platform1').setOrigin(0,0).refreshBody();

    this.platforms.create(26368,344,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(26368,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(26368,216,'Platform3').setOrigin(0,0).refreshBody();

    this.platforms.create(26752,344,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(26752,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(27008,344,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(27008,600,'Platform1').setOrigin(0,0).refreshBody();

    this.deathsign.create(27450,244,'Death');

    this.platforms.create(27648,344,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(27648,600,'Platform1').setOrigin(0,0).refreshBody();

    this.platforms.create(28032,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(28032,472,'Platform3').setOrigin(0,0).refreshBody();

    this.deathsign.create(28420,270,'Death');

    this.platforms.create(28544,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(28544,472,'Platform3').setOrigin(0,0).refreshBody();
    this.platforms.create(28800,600,'Platform1').setOrigin(0,0).refreshBody();

    //12
    this.platforms.create(29056,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(29312,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(29568,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(29568,856,'Platform1').setOrigin(0,0).refreshBody();

    this.platforms.create(29056,344,'Platform3').setOrigin(0,0).refreshBody();

    this.platforms.create(29824,856,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(30080,856,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(30336,856,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(30336,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(29824,728,'Platform2').setOrigin(0,0).refreshBody();
    this.platforms.create(29952,344,'Platform1').setOrigin(0,0).refreshBody();

    this.platforms.create(30592,856,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(30848,856,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(31104,856,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(31104,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(30592,728,'Platform2').setOrigin(0,0).refreshBody();
    this.platforms.create(30720,344,'Platform1').setOrigin(0,0).refreshBody();

    this.platforms.create(31360,856,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(31616,856,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(31872,856,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(31872,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(31360,728,'Platform2').setOrigin(0,0).refreshBody();
    this.platforms.create(31488,344,'Platform1').setOrigin(0,0).refreshBody();

    //13
    this.platforms.create(32128,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(32384,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(32640,600,'Platform1').setOrigin(0,0).refreshBody();

    this.deathsign.create(33090,400,'Death');

    this.platforms.create(33280,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(33536,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(33792,600,'Platform1').setOrigin(0,0).refreshBody();

    this.deathsign.create(34230,400,'Death');

    this.platforms.create(34432,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(34688,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(34944,600,'Platform1').setOrigin(0,0).refreshBody();

    this.deathsign.create(35380,400,'Death');

    this.platforms.create(35584,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(35840,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(36096,600,'Platform1').setOrigin(0,0).refreshBody();

    //14
    this.platforms.create(36352,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(36608,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(36864,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(37120,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(37376,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(37632,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(37888,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(38144,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(38144,344,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(38144,88,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(38144,-168,'Platform1').setOrigin(0,0).refreshBody();

    this.platforms.create(38016,472,'Platform3').setOrigin(0,0).refreshBody();
    this.platforms.create(36352,472,'Platform2').setOrigin(0,0).refreshBody();

    this.platforms.create(37504,344,'Platform3').setOrigin(0,0).refreshBody();
    this.platforms.create(37248,216,'Platform1').setOrigin(0,0).refreshBody();

    this.platforms.create(36864,88,'PlatformM').setOrigin(0,0).refreshBody();
    this.platforms.create(36864,-296,'PlatformM').setOrigin(0,0).refreshBody();
    this.platforms.create(37376,-296,'PlatformM').setOrigin(0,0).refreshBody();

    this.platforms.create(36352,88,'Platform3').setOrigin(0,0).refreshBody();
    this.platforms.create(36096,-40,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(35840,-40,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(35584,-40,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(35584,-296,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(35584,-552,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(35584,-808,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(35840,-168,'Platform1').setOrigin(0,0).refreshBody();

    this.platforms.create(36352,-296,'Platform3').setOrigin(0,0).refreshBody();

    this.platforms.create(37888,-296,'Platform2').setOrigin(0,0).refreshBody();
    
    //15
    this.platforms.create(38400,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(38400,344,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(38400,88,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(38400,-168,'Platform1').setOrigin(0,0).refreshBody();

    this.platforms.create(38656,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(38656,344,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(38656,88,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(38656,-40,'Platform3').setOrigin(0,0).refreshBody();

    this.platforms.create(38912,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(38912,344,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(38912,88,'Platform1').setOrigin(0,0).refreshBody();

    this.platforms.create(39168,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(39168,344,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(39168,216,'Platform3').setOrigin(0,0).refreshBody();

    this.platforms.create(39424,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(39424,344,'Platform1').setOrigin(0,0).refreshBody();

    this.platforms.create(39680,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(39680,472,'Platform3').setOrigin(0,0).refreshBody();

    this.platforms.create(39936,600,'Platform1').setOrigin(0,0).refreshBody();

    //16
    this.platforms.create(39936,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(40192,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(40448,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(40704,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(40960,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(41216,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(41472,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(41728,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(41984,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(42240,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(42496,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(42752,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(43008,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(43264,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(43520,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(43776,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(44032,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(44288,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(44544,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(44800,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(45056,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(45312,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(45568,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(45824,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(46080,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(46336,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(46592,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(46848,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(47104,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(47360,600,'Platform1').setOrigin(0,0).refreshBody();

    this.platforms.create(47360,344,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(47104,472,'Platform3').setOrigin(0,0).refreshBody();

    //17
    this.platforms.create(47616,344,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(47872,344,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(48128,344,'Platform1').setOrigin(0,0).refreshBody();
    //this.platforms.create(48128,88,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(47360,-168,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(47616,-168,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(47872,-168,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(48128,-168,'Platform1').setOrigin(0,0).refreshBody();



    // //colisiones con obstaculos y mundo
    this.physics.add.collider(this.playerB, this.platforms);
    this.physics.add.collider(this.playerR, this.platforms);
    this.playerB.setCollideWorldBounds(true);


    //--------------Fin plataformas-------------//

 
    this.laser= this.add.image(0,0,"laser").setScale(2);









    //camara que seguirá a jugador
    this.camera=this.cameras.main.startFollow(this.playerB, true, 0.2, 0.2);
    this.camera=this.cameras.main.followOffset.set(-100,0)

    // //comprobar overlap con orbes 
    
    this.physics.add.overlap(this.playerB,this.orbGroupB,this.orbeVelocidadBV, null, this);
    this.physics.add.overlap(this.playerB,this.orbGroupR,this.orbeVelocidadRV, null, this);
    this.physics.add.overlap(this.playerB,this.orbGroupB2,this.orbeVelocidadBJ, null, this);
    this.physics.add.overlap(this.playerB,this.orbGroupR2,this.orbeVelocidadRJ, null, this);

    this.physics.add.overlap(this.playerR,this.orbGroupB,this.orbeVelocidadBV, null, this);
    this.physics.add.overlap(this.playerR,this.orbGroupR,this.orbeVelocidadRV, null, this);
    this.physics.add.overlap(this.playerR,this.orbGroupB2,this.orbeVelocidadBJ, null, this);
    this.physics.add.overlap(this.playerR,this.orbGroupR2,this.orbeVelocidadRJ, null, this);
    

    

    //objeto cursor para uso teclado;
    this.cursors = this.input.keyboard.createCursorKeys();
}

update(time, delta)
{
    this.playerB.setVelocityX(0);
    this.playerR.setVelocityX(0);
    if(this.buffB!=true){
        this.timer=time;
    }else if(time-this.timer>3000){
        this.buffB=false;
        this.velocityB=600;
        this.jumpB=-800;
        this.emitterPR.stop();
        this.emitterPB.stop();
    }

    this.laser.y=this.playerB.y;
    this.laser.x+=delta/20;

  

    if (this.cursors.left.isDown)
        {   

        if(!this.running&&this.playerB.body.touching.down) this.playerB.anims.play('run'); this.running=true;
            
        this.playerB.setVelocityX(-this.velocityB);
        this.playerB.flipX = false;
        this.cameras.main.followOffset.x = -100;
        
    }
    else if (this.cursors.right.isDown)
        {
        if(this.running!=true)if(this.playerB.body.touching.down) this.playerB.anims.play('run'); this.running=true;

        this.playerB.setVelocityX(this.velocityB);
        this.playerB.flipX = true;
        this.cameras.main.followOffset.x = -200;
        }else if(this.cursors.right.isUp && this.cursors.left.isUp ){
        this.running=false;
        }

    if (this.cursors.up.isDown && this.playerB.body.touching.down) 
    {
        this.playerB.setVelocityY(this.jumpB);

    
    }else if (this.playerB.body.touching.down&& !this.running)
        {
        this.running=false;
        this.playerB.anims.play("idle");
        }

    if(this.playerB.body.touching.down==false){
        this.playerB.anims.play('jump');
        this.running=false;
    }
   
}

orbeVelocidadBV(player,orbe) {

        this.emitterPB.start();
        this.emitterPB.startFollow(player);
        this.orbGroupB.killAndHide(orbe);
        orbe.body.enable = false;
        this.emitterB.stop();

        if(player==this.playerB){
        this.velocityB=1000;
        this.buffB=true;
        }else if(player== this.playerR){
        this.velocityR=300;
        this.buffR=true;
        
    }
       
    }
orbeVelocidadRV(player,orbe) {

        this.emitterPR.start();
        this.emitterPR.startFollow(player);
        this.orbGroupR.killAndHide(orbe);
        orbe.body.enable = false;
        this.emitterR.stop();

        if(player==this.playerR){
        this.velocityR=1000;
        this.buffR=true;
        }else if(player==this.playerB){
        this.velocityB=300;
        this.buffB=true;
        
    }
}
orbeVelocidadBJ(player,orbe) {

    this.emitterPB.start();
        this.emitterPB.startFollow(player);
        this.orbGroupB2.killAndHide(orbe);
        orbe.body.enable = false;
        this.emitterB.stop();

        if(player==this.playerB){
        this.jumpB=-1200;
        this.buffB=true;
        }else if(player== this.playerR){
        this.velocityR=300;
        this.buffR=true;
        
    }
}
orbeVelocidadRJ(player,orbe) {

    this.emitterPR.start();
    this.emitterPR.startFollow(player);
    this.orbGroupR2.killAndHide(orbe);
    orbe.body.enable = false;
    this.emitterR.stop();

    if(player==this.playerR){
    this.jumpR=1000;
    this.buffR=true;
    }else if(player==this.playerB){
    this.velocityB=300;
    this.buffB=true;
    
}
}

gameOver(){
     console.log("end");
}


}     
    