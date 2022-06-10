import SceneBackground from "./sceneBackground.js";
import Menu from "./menu.js";
import wsManager from './wsManager.js';


var teclaDBWS = false;
var teclaLBWS = false;
var teclaUp = false;
var self = null;
var rojo=null;
var connection=null;


export default class CodeLevel extends Phaser.Scene {

    constructor(){
        super({key:"CodeLevel"});
        this.velocityR=600;
        this.jumpR=-800;
        this.buffR=false;
        this.velocityB=600;
        this.jumpB=-800;
        this.buffB=false;
        this.particles = null;
        this.grav= 2000;

        this.emitterPB=null;
        this.emitterPR=null;
        this.emitterB=null;
        this.emitterR=null;

        this.playerB=null;
        this.playerR=null;

        this.keyA;
        this.keyW;
        this.keyD;
        
        this.fin;

        this.camera;
		
        
    }

preload()
{
    
    //carga de imagenes
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
    this.load.spritesheet("pjR", "assets/spritesheets/RED2.png",{ frameWidth: 408,frameHeight: 363, endFrame: 9});

    
    //particulas
    this.load.atlas('flares', 'assets/sprites/flares.png', 'assets/sprites/flares.json');

    //carga de plataformas
    this.load.image("Platform1","assets/sprites/Platform1.png");
    this.load.image("Platform2","assets/sprites/Platform2.png");
    this.load.image("Platform3","assets/sprites/Platform3.png");
    this.load.image("PlatformM","assets/sprites/MovingPlatform.png");

    //Señal muerte
    this.load.image("Death", "assets/sprites/DEATH_SENTENCE.png");

    //Señal flecha
    this.load.image("Arrow", "assets/menu/flechita2.png");



    //Bandera
    this.load.image("flag", "assets/sprites/Flag.png");

    //LASER
    this.load.image("laser", "assets/sprites/Laser.png");
    
    //carga audio
    this.load.audio("techcity", "assets/SFX/techCity.mp3");
    this.load.audio("jumpA", "assets/SFX/Jump.mp3");
    this.load.audio("death", "assets/SFX/Death.mp3");
    this.load.audio("lost", "assets/SFX/Lose.mp3");
    this.load.audio("won", "assets/SFX/Victory.mp3");
    this.load.audio("orbBad", "assets/SFX/Orb_bad.mp3");
    this.load.audio("orbFine", "assets/SFX/Orb_fine.mp3");


    //Tutorial
    this.load.image("tutorial", "assets/sprites/tutorial.png");
   
   

  
}

create()
{
	connection=this.scene.get('wsManager').connection;
	
	this.cameras.main.fadeIn(1000, 0, 0, 0)

	rojo= this.scene.get('wsManager').rojo;
    this.scene.get("Menu").music.stop();
    //audio para el nivel
    this.musicLvl = this.sound.add("techcity");

    this.jumpA = this.sound.add("jumpA");
    this.death = this.sound.add("death");
    this.lostA = this.sound.add("lost");
    this.winA = this.sound.add("won");
    this.orbBad = this.sound.add("orbBad");
    this.orbFine = this.sound.add("orbFine");



    
    //configuracion audio
    
    
    //activa la musica(audio)
    //this.musicLvl.play(mConfig);
    
    //limites camara (fuera escena)
    this.cameras.main.setBounds(0, -600*5, 900 * 200, 600 * 10);
    this.physics.world.setBounds(0, -600*5, 900*200, 600*10);

    this.scene.launch("SceneBackground",SceneBackground);
    this.scene.sendToBack("SceneBackground");

	//Creacion de los orbes y particulas
    this.particles=this.add.particles('flares');
   
    this.orbGroupB = this.physics.add.staticGroup({
        key: 'orbBlueV',
        frameQuantity: 9,
        immovable: true
    });
    
    this.orbGroupR = this.physics.add.staticGroup({
        key: 'orbRedV',
        frameQuantity: 9,
        immovable: true
    });

    this.orbGroupB2 = this.physics.add.staticGroup({

        key: 'orbBlueJ',
        frameQuantity: 6,
        immovable: true
    });

    this.orbGroupR2 = this.physics.add.staticGroup({
        key: 'orbRedJ',
        frameQuantity: 6,
        immovable: true
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

    this.emitterPR=this.particles.createEmitter({
        frame: 'red',
        lifespan: 600,
        speed: { min: 10, max: 200 },

        gravityY: 300,
        scale: { start: 0.4, end: 0 },
        quantity: 0.003,
        blendMode: 'ADD'
    });
    
    //Posiciones de los orbes

    var childrenB = this.orbGroupB.getChildren();
    childrenB[0].setPosition(3600,400).setScale(0.5).refreshBody();
    childrenB[1].setPosition(10100,272).setScale(0.5).refreshBody();
    childrenB[2].setPosition(25200,-350).setScale(0.5).refreshBody();
    childrenB[3].setPosition(32300,400).setScale(0.5).refreshBody();
    childrenB[4].setPosition(38200,-478).setScale(0.5).refreshBody();
    childrenB[5].setPosition(40650,400).setScale(0.5).refreshBody();
    childrenB[6].setPosition(41900,300).setScale(0.5).refreshBody();
    childrenB[7].setPosition(43900,300).setScale(0.5).refreshBody();
    childrenB[8].setPosition(45900,300).setScale(0.5).refreshBody();


    var childrenR = this.orbGroupR.getChildren();
    childrenR[0].setPosition(3600,530).setScale(0.5).refreshBody();
    childrenR[1].setPosition(10100,400).setScale(0.5).refreshBody();
    childrenR[2].setPosition(25200,-220).setScale(0.5).refreshBody();
    childrenR[3].setPosition(32300,530).setScale(0.5).refreshBody();
    childrenR[4].setPosition(38200,-348).setScale(0.5).refreshBody();
    childrenR[5].setPosition(40700,540).setScale(0.5).refreshBody();
    childrenR[6].setPosition(42900,300).setScale(0.5).refreshBody();
    childrenR[7].setPosition(44900,300).setScale(0.5).refreshBody();
    childrenR[8].setPosition(46900,300).setScale(0.5).refreshBody();


    var childrenB2 = this.orbGroupB2.getChildren();
    childrenB2[0].setPosition(21050,400).setScale(0.5).refreshBody();
    childrenB2[1].setPosition(29400,250).setScale(0.5).refreshBody();
    childrenB2[2].setPosition(40700,400).setScale(0.5).refreshBody();
    childrenB2[3].setPosition(42100,300).setScale(0.5).refreshBody();
    childrenB2[4].setPosition(44100,300).setScale(0.5).refreshBody();
    childrenB2[5].setPosition(46100,300).setScale(0.5).refreshBody();


    var childrenR2 = this.orbGroupR2.getChildren();
    childrenR2[0].setPosition(21050,540).setScale(0.5).refreshBody();
    childrenR2[1].setPosition(29400,540).setScale(0.5).refreshBody();
    childrenR2[2].setPosition(40750,540).setScale(0.5).refreshBody();
    childrenR2[3].setPosition(43100,300).setScale(0.5).refreshBody();
    childrenR2[4].setPosition(45100,300).setScale(0.5).refreshBody();
    childrenR2[5].setPosition(47100,300).setScale(0.5).refreshBody();



	//Animaciones de los orbes
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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
								//Jugadores//
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.playerR= this.physics.add.sprite(150,300,"pjR").setScale(0.25);
    this.playerR.buff=0;
    this.playerR.jump=0;
    this.playerR.run=false;
    this.playerR.right=true;
    this.playerR.animsKey='runR';
	this.playerR.stopKey='idleR';
	this.playerR.jumpKey='jumpR';
	this.playerR.body.setSize(150);

    this.playerB= this.physics.add.sprite(500,300,"pj").setScale(0.25); //Solo pàra pruebas eliminar después y usar la de arriba.
	this.playerB.buff=0;
	this.playerB.jump=0;
	this.playerB.run=false;
	this.playerB.right=true;
	this.playerB.animsKey= 'run';
	this.playerB.stopKey='idle';
	this.playerB.jumpKey='jump';
	this.playerB.body.setSize(150);
	
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	
    this.tt=this.add.image(400,260,"tutorial").setScale(1.2);
    this.tuto=true;

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

    this.anims.create({
        key: 'runR',
        frames: this.anims.generateFrameNumbers('pjR', { frames: [ 0,1,2,3,4,5,6 ] }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'idleR',
        frames: this.anims.generateFrameNumbers('pjR', { frames: [8 ] }),
        frameRate: 8,
        repeat: -1
    });
    this.anims.create({
        key: 'jumpR',
        frames: this.anims.generateFrameNumbers('pjR', { frames: [9 ] }),
        frameRate: 8,
        repeat: -1
    });

    this.playerR.anims.play('idleR');
    this.playerB.anims.play('idle');


	this.plataformas();

 
    this.laser= this.physics.add.image(-1500,0,"laser").setScale(2);









    //camara que seguirá a jugador
    this.camera=this.cameras.main;
    this.camera=this.cameras.main.followOffset.set(-100,0);


    // //comprobar overlap con orbes 
    
    this.physics.add.overlap(this.playerB,this.orbGroupB,this.orbeVelocidadBV, null, this);
    this.physics.add.overlap(this.playerB,this.orbGroupR,this.orbeVelocidadRV, null, this);
    this.physics.add.overlap(this.playerB,this.orbGroupB2,this.orbeVelocidadBJ, null, this);
    this.physics.add.overlap(this.playerB,this.orbGroupR2,this.orbeVelocidadRJ, null, this);

    this.physics.add.overlap(this.playerR,this.orbGroupB,this.orbeVelocidadBV, null, this);
    this.physics.add.overlap(this.playerR,this.orbGroupR,this.orbeVelocidadRV, null, this);
    this.physics.add.overlap(this.playerR,this.orbGroupB2,this.orbeVelocidadBJ, null, this);
    this.physics.add.overlap(this.playerR,this.orbGroupR2,this.orbeVelocidadRJ, null, this);

    this.physics.add.overlap(this.playerB,this.laser,this.gameOver,null,this);
    this.physics.add.overlap(this.playerR,this.laser,this.gameOver,null,this);
    this.physics.add.overlap(this.playerB,this.playerR,this.catch,null,this);
    
        

    //objeto cursor para uso teclado;
    this.cursors = this.input.keyboard.createCursorKeys();

    this.keyA= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyW= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyD= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);





    
    this.fin=false;
}

update(time, delta)
{ 
	
	
	
    if(this.fin==false && this.tuto==false){
    this.playerB.setVelocityX(0);
    this.playerR.setVelocityX(0);
    
    
    if(this.buffB!=true ||this.newBuffB==true){
        this.timerB=time;
        this.newBuffB=false;
    }else if(time-this.timerB>3000){
        this.buffB=false;
        this.playerB.buff=0;
        this.playerB.jump=0;
        this.emitterPB.stop();
        this.emitterPR.stop();
    }
    if(this.buffR!=true || this.newBuffR==true){
        this.timerR=time;
        this.newBuffR=false;
    }else if(time-this.timerR>3000){
        this.buffR=false;
        this.playerR.buff=0;
        this.playerR.jump=0;
        this.emitterPB.stop();
        this.emitterPR.stop();

    }

	//LASER
	
	/*
    this.laser.y=this.playerB.y;
    this.laser.x+=delta/3;
    if(this.laser.x>25000)this.laser.x+=delta/2.25;
	*/

    if(this.playerB.y>950){
        this.gameOver(this.playerB);
    }
    if(this.playerR.y>950){
        this.gameOver(this.playerR);
    }
    if(this.playerB.x>48500){
        this.victory();
    }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //Actualización del hitbox de las plataformas móviles
    this.platformsM.children.iterate((c)=>{
        c.refreshBody();
    });

  self = this;
  	//EVENTO LEVANTAR TECLAS


    if(this.playerB.body.touching.down==false){
        this.playerB.anims.play('jump');
        this.running=false;
    }



    //Controles del Jugador


    if (this.keyA.isDown){   
		if(rojo==true){
			this.movimientoI(this.playerR);
		}else{
			this.movimientoI(this.playerB);
		}

    }else if (this.keyD.isDown){
		if(rojo==true){
			this.movimientoD(this.playerR);
		}else{
			this.movimientoD(this.playerB);
		}

    }else if(this.keyD.isUp && this.keyA.isUp ){
        if(rojo==true){
			this.parar(this.playerR);
		}else{
			this.parar(this.playerB);
		}
    }

    if (this.keyW.isDown) 
    {
        if(rojo== true  && this.playerR.body.touching.down){
        	this.salto(this.playerR);
        }else if (rojo==false  && this.playerB.body.touching.down){
			this.salto(this.playerB);
	}
	}
   

    if(this.playerR.body.touching.down==false){
        this.playerR.anims.play('jumpR');
        this.playerR.run=false;
    }
    
     if(this.playerB.body.touching.down==false){
        this.playerB.anims.play('jump');
        this.playerB.run=false;
    }
   

	}else if(this.fin==true){
	    this.playerB.body.gravity.y=-2000;
    	this.playerR.body.gravity.y=-2000;
	    this.playerB.setVelocityX(0);
	    this.playerR.setVelocityX(0);
	    this.playerB.setVelocityY(0);
	    this.playerR.setVelocityY(0);
	    
	
	    if(this.cursors.space.isDown){
	        this.musicLvl.stop();
	        this.scene.launch("Menu", Menu);
	        this.scene.stop("CodeLevel",CodeLevel);
	        }
	}else if(this.tuto==true){
		this.playerB.body.gravity.y=-2000;
    	this.playerR.body.gravity.y=-2000;
	    if(this.cursors.space.isDown){
	        this.tuto=false;
			this.playerR.body.gravity.y=0;
			this.playerB.body.gravity.y=0;
	        if(rojo==true){
			
	        this.camera=this.cameras.main.startFollow(this.playerR, true, 0.2, 0.2);
	        }else{

			this.camera=this.cameras.main.startFollow(this.playerB, true, 0.2, 0.2);
			}
	        this.musicLvl.play({
	            mute: false,
	            volume: 0.15,
	            rate: 1,
	            detune: 0,
	            seek: 0,
	            loop: true,
	            delay: 0
	        });
		}
	}
 
 	///////////////////////////FUNCION QUE ENVIE POSICIONES//////////////////////// 
   	// si rojo envia las de rojo y vice
   	 if(rojo){this.enviarMSG(this.playerR);}
   	 else{this.enviarMSG(this.playerB);}
   	
   	
   	
   	//////////////////////////FUERA DEL UPDATE FUNCION QUE ACTUALICE EL OTRO JUGADOR////////////
}

inicioGame(){
	this.tuto=false;
	this.grav=0;
    
}

movimientoI(player){
	player.setVelocityX(-600-player.buff);
	player.right=false
    player.flipX = player.right;
    if(!player.run&&player.body.touching.down) player.anims.play(player.animsKey); player.run=true;
}

movimientoD(player){
	player.setVelocityX(600+player.buff);
	player.right =true;
    player.flipX = player.right;
    if(!player.run&&player.body.touching.down) player.anims.play(player.animsKey); player.run=true;
}

animacion(run,r){
	if(rojo==true) var player= this.playerB;
	else var player= this.playerR;
	player.flipX = r;
	if(!player.run&&run){
		player.anims.play(player.animsKey); 
		player.run=true
	}
	else if(!run&&player.run){
		 player.run=false; 
		 player.anims.play(player.stopKey); 
	}
}

disconnectPlayer(){
    this.fin=true;
    this.musicLvl.stop();
    this.lostA.play();
	this.scene.stop("CodeLevel");
    this.scene.launch("oponenteDesc");
}

enviarMSG(player){
	this.wsPlayerPosition(player.x,player.y,player.run,player.right, false, false);
}

victoriaRojo(){
	this.wsPlayerPosition(0,0,0,0, true, true);
}
victoriaAzul(){
	this.wsPlayerPosition(0,0,0,0, true, false);
}

parar(player){
	player.run=false;
	player.anims.play(player.stopKey);
}

salto(player){
	player.setVelocityY(-800-player.jump);
}


orbeVelocidadBV(player,orbe) {
	
		if(player.buff<0){
			return;
		}

        this.emitterPB.start();
        this.emitterPB.startFollow(player);
        this.orbGroupB.killAndHide(orbe);
        orbe.body.enable = false;

		
		
        if(player==this.playerB){
        this.orbFine.play();

        this.newBuffB=true;
        this.buffB=true;
        //-----------------//
        player.buff=400;
        
        }else if(player== this.playerR){
        this.orbBad.play();

        this.newBuffR=true;
        this.buffR=true;
        //----------------//
        player.buff=-400;
        
    }
       
}
orbeVelocidadRV(player,orbe) {
		if(player.buff<0){
			return;
		}
		
        this.emitterPR.start();
        this.emitterPR.startFollow(player);
        this.orbGroupR.killAndHide(orbe);
        orbe.body.enable = false;


        if(player==this.playerR){
        this.orbFine.play();

        this.newBuffR=true;
        this.buffR=true;
        //-----------------//
        player.buff=400;
        
        }else if(player==this.playerB){
        this.orbBad.play();

        this.newBuffB=true;
        this.buffB=true;
        //-----------------//
        player.buff=-400;
        
    }
}
orbeVelocidadBJ(player,orbe) {

    this.emitterPB.start();
        this.emitterPB.startFollow(player);
        this.orbGroupB2.killAndHide(orbe);
        orbe.body.enable = false;


        if(player==this.playerB){
        this.orbFine.play();

        player.jump=400;
        this.newBuffB=true;
        this.buffB=true;
        }else if(player== this.playerR){
        this.orbBad.play();

        player.buff=-400;
        this.newBuffR=true;
        this.buffR=true;
        
    }
}
orbeVelocidadRJ(player,orbe) {

    this.emitterPR.start();
    this.emitterPR.startFollow(player);
    this.orbGroupR2.killAndHide(orbe);
    orbe.body.enable = false;
    //this.emitterR.stop();

    if(player==this.playerR){
    this.orbFine.play();
    //this.jumpR=-1200;
    player.jump=400;
    this.newBuffR=true;
    this.buffR=true;
    }else if(player==this.playerB){
    this.orbBad.play();
    //this.velocityB=300;
    player.buff=-400;
    this.newBuffB=true;
    this.buffB=true;
    
}
}

gameOver(player){
    this.fin=true;
    this.musicLvl.stop();
    this.lostA.play();
    
    
    if(player==this.playerR){
		/*
        Evento victoria azul
        */
        this.victoriaAzul();
        
        if(rojo==true){
			this.scene.stop("CodeLevel");
            this.scene.launch("Derrota");
		}else{
			this.scene.stop("CodeLevel");
            this.scene.launch("Victoria");
		}
		
    }else if(player==this.playerB){
		/*
        Evento victoria rojo   
        */
        this.victoriaRojo();
        
        if(rojo==true){
			this.scene.stop("CodeLevel");
            this.scene.launch("Victoria");
		}else if(rojo==false){
			this.scene.stop("CodeLevel");
        	this.scene.launch("Derrota");
		}
        
    }
    this.scene.get("wsManager").connection.close();
    
}

recibeMSGFin(victoriaRoja){
	
    if(!victoriaRoja){

        if(rojo==true){
			this.scene.stop("CodeLevel");
            this.scene.launch("Derrota");
		}else{
			this.scene.stop("CodeLevel");
            this.scene.launch("Victoria");
		}
    }else{
        if(rojo==true){
			this.scene.stop("CodeLevel");
            this.scene.launch("Victoria");
		}else if(rojo==false){
			this.scene.stop("CodeLevel");
        	this.scene.launch("Derrota");
		}
        
    }
    this.musicLvl.stop();
    this.scene.get("wsManager").connection.close();
}

catch(){

    this.victoriaRojo();
    if(rojo==true){
		this.scene.stop("CodeLevel");
        this.scene.launch("Victoria");
	}else if(rojo==false){
		this.scene.stop("CodeLevel");
    	this.scene.launch("Derrota");
	}
	this.musicLvl.stop();
	this.scene.get("wsManager").connection.close();
}

victory(){
    this.winA.play();
    this.fin=true;
    this.musicLvl.stop();
    this.scene.stop("CodeLevel");
    this.scene.launch("Victoria");
    this.victoriaAzul();
}

getWsPlayerPos(x,y){
	if(rojo){
		this.playerB.x = x;
		this.playerB.y= y;
	}else{
		this.playerR.x = x;
		this.playerR.y= y;
	}
}

wsPlayerPosition(x,y,run,r,f,wR){
	 var mssg = { 
		posX : x,
		posY : y,
		running : run,
		right :r,
		fin: f,
		winRed: wR
	 };
    	var mssgJson = JSON.stringify(mssg);
		connection.send(mssgJson);
}






plataformas(){
	

    //----------------Plataformas---------------
    this.platforms = this.physics.add.staticGroup();
    this.platformsM = this.physics.add.staticGroup();
    this.deathsign = this.physics.add.staticGroup();
    this.arrows = this.physics.add.staticGroup();

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

    this.arrows.create(512,600,'Arrow').setScale(0.5).setOrigin(0,0).refreshBody();
    this.arrows.create(1024,600,'Arrow').setScale(0.5).setOrigin(0,0).refreshBody();

    //2
    this.platforms.create(2048,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(2304,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(2560,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(2816,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(3072,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(3328,600,'Platform1').setOrigin(0,0).refreshBody();

    this.platforms.create(2304,472,'Platform3').setOrigin(0,0).refreshBody();
    this.platforms.create(2816,472,'Platform3').setOrigin(0,0).refreshBody();

    this.platforms.create(2304,-40,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(2816,-40,'Platform1').setOrigin(0,0).refreshBody();

    this.arrows.create(2816,600,'Arrow').setScale(0.5).setOrigin(0,0).refreshBody();
    this.arrows.create(2304,-40,'Arrow').setScale(0.5).setOrigin(0,0).refreshBody();
    this.arrows.create(2816,-40,'Arrow').setScale(0.5).setOrigin(0,0).refreshBody();

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

    this.arrows.create(4864,600,'Arrow').setScale(0.5).setOrigin(0,0).refreshBody();
    this.arrows.create(5248,-40,'Arrow').setScale(0.5).setOrigin(0,0).refreshBody();
    this.arrows.create(5376,600,'Arrow').setScale(0.5).setOrigin(0,0).refreshBody();

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

    this.platformsM.create(5738,-40,'PlatformM').setOrigin(0,0).refreshBody();
    this.platformsM.create(6378,-40,'PlatformM').setOrigin(0,0).refreshBody();
    this.platforms.create(7168,-40,'Platform2').setOrigin(0,0).refreshBody();

    this.arrows.create(6912,600,'Arrow').setScale(0.5).setOrigin(0,0).refreshBody();
    this.arrows.create(7424,344,'Arrow').setScale(0.5).setOrigin(0,0).refreshBody();
    
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

    this.arrows.create(8832,344,'Arrow').setScale(0.5).setOrigin(0,0).refreshBody();
    this.arrows.create(10112,600,'Arrow').setScale(0.5).setOrigin(0,0).refreshBody();

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

    this.arrows.create(11136,600,'Arrow').setScale(0.5).setOrigin(0,0).refreshBody();

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

    this.arrows.create(11648,-936,'Arrow').setScale(0.5).setOrigin(0,0).refreshBody();


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

    this.platformsM.create(12650,-552,'PlatformM').setOrigin(0,0).refreshBody();
    this.platformsM.create(13162,-552,'PlatformM').setOrigin(0,0).refreshBody();

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

    this.arrows.create(13184,-168,'Arrow').setScale(0.5).setOrigin(0,0).refreshBody();
    this.arrows.create(12928,600,'Arrow').setScale(0.5).setOrigin(0,0).refreshBody();
    this.arrows.create(14976,88,'Arrow').setScale(0.5).setOrigin(0,0).refreshBody();
    this.arrows.create(13696,856,'Arrow').setScale(0.5).setOrigin(0,0).refreshBody();


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

    this.platformsM.create(18950,600,'PlatformM').setOrigin(0,0).refreshBody();
    this.platformsM.create(19400,600,'PlatformM').setOrigin(0,0).refreshBody();

    this.platforms.create(20096,856,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(20096,600,'Platform1').setOrigin(0,0).refreshBody();

    this.deathsign.create(20550,456,'Death');

    this.arrows.create(16384,856,'Arrow').setScale(0.5).setOrigin(0,0).refreshBody();
    this.arrows.create(17152,856,'Arrow').setScale(0.5).setOrigin(0,0).refreshBody();
    this.arrows.create(18432,856,'Arrow').setScale(0.5).setOrigin(0,0).refreshBody();


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

    this.arrows.create(21248,600,'Arrow').setScale(0.5).setOrigin(0,0).refreshBody();
    this.arrows.create(23000,600,'Arrow').setScale(0.5).setOrigin(0,0).refreshBody();
    this.arrows.create(23552,-296,'Arrow').setScale(0.5).setOrigin(0,0).refreshBody();

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

    this.arrows.create(25216,-168,'Arrow').setScale(0.5).setOrigin(0,0).refreshBody();
    this.arrows.create(26368,600,'Arrow').setScale(0.5).setOrigin(0,0).refreshBody();
    this.arrows.create(28032,600,'Arrow').setScale(0.5).setOrigin(0,0).refreshBody();



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

    this.arrows.create(29568,600,'Arrow').setScale(0.5).setOrigin(0,0).refreshBody();
    this.arrows.create(29952,344,'Arrow').setScale(0.5).setOrigin(0,0).refreshBody();
    this.arrows.create(30720,344,'Arrow').setScale(0.5).setOrigin(0,0).refreshBody();
    this.arrows.create(31488,344,'Arrow').setScale(0.5).setOrigin(0,0).refreshBody();


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

    this.arrows.create(33536,600,'Arrow').setScale(0.5).setOrigin(0,0).refreshBody();
    this.arrows.create(35840,600,'Arrow').setScale(0.5).setOrigin(0,0).refreshBody();


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

    this.platformsM.create(36714,88,'PlatformM').setOrigin(0,0).refreshBody();
    this.platformsM.create(36714,-296,'PlatformM').setOrigin(0,0).refreshBody();
    this.platformsM.create(37226,-296,'PlatformM').setOrigin(0,0).refreshBody();

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

    this.arrows.create(36608,600,'Arrow').setScale(0.5).setOrigin(0,0).refreshBody();
    
       
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

    this.arrows.create(38400,-168,'Arrow').setScale(0.5).setOrigin(0,0).refreshBody();
    this.arrows.create(38912,88,'Arrow').setScale(0.5).setOrigin(0,0).refreshBody();


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
    this.platforms.create(47616,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(47872,600,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(48128,600,'Platform1').setOrigin(0,0).refreshBody();

    this.platforms.create(48128,344,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(47872,472,'Platform3').setOrigin(0,0).refreshBody();

    this.arrows.create(40192,600,'Arrow').setScale(0.5).setOrigin(0,0).refreshBody();
    this.arrows.create(41728,600,'Arrow').setScale(0.5).setOrigin(0,0).refreshBody();
    this.arrows.create(43008,600,'Arrow').setScale(0.5).setOrigin(0,0).refreshBody();
    this.arrows.create(44544,600,'Arrow').setScale(0.5).setOrigin(0,0).refreshBody();
    this.arrows.create(45312,600,'Arrow').setScale(0.5).setOrigin(0,0).refreshBody();
    this.arrows.create(46592,600,'Arrow').setScale(0.5).setOrigin(0,0).refreshBody();
    this.arrows.create(47360,600,'Arrow').setScale(0.5).setOrigin(0,0).refreshBody();
    this.arrows.create(48128,600,'Arrow').setScale(0.5).setOrigin(0,0).refreshBody();


    //Bandera final
    this.add.image(48500,92,"flag");

    //17
    this.platforms.create(48384,344,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(48640,344,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(48896,344,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(48128,-168,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(48384,-168,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(48640,-168,'Platform1').setOrigin(0,0).refreshBody();
    this.platforms.create(48896,-168,'Platform1').setOrigin(0,0).refreshBody();



    // //colisiones con obstaculos y mundo
    this.physics.add.collider(this.playerB, this.platforms);
    this.physics.add.collider(this.playerR, this.platforms);
    this.physics.add.collider(this.playerB, this.platformsM);
    this.physics.add.collider(this.playerR, this.platformsM);
    this.playerB.setCollideWorldBounds(true);

    //Movimiento de las plataformas móviles
    this.platformsM.children.iterate((c)=>{
        let tween=  this.tweens.add({
        targets: c,
        props: {
            x:{
                duration:750,
                value: c.x+150
             },
                         
        },
        repeat: -1,
        yoyo: true,
        ease: function (t) {
            return Math.pow(Math.sin(t * 500/360), 2);
        }
        })
    });


    //--------------Fin plataformas-------------//
}
}
