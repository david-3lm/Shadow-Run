import wsManager from './wsManager.js';
import CodeLevel from './codeLevel.js';
var rojo=null;
var connection=null;
export default class Lobby extends Phaser.Scene {
    constructor() {
        super({key: "Lobby"});
    }
	
    preload(){
        this.load.image("busq", "assets/menu/BUSCANDO.png");
        this.load.image("orb", "assets/menu/CUERPO_ORBECARGA.png");
        this.load.image("orbGira", "assets/menu/GIRO_ORBECARGA.png");
        this.scene.launch("wsManager",wsManager);
        this.load.image("rojo", "assets/menu/ROJOENCONTRADO.png");
        this.load.image("azul", "assets/menu/AZULENCONTRADO.png");

    }

    create(){
		this.cameras.main.fadeIn(1000, 0, 0, 0)
        this.fondo = this.add.image(400, 300, "busq");
		this.orbG= this.add.image(400,400,"orbGira").setScale(0.15);
		this.orb= this.add.image(400,400,"orb").setScale(0.15);
		this.cursors = this.input.keyboard.createCursorKeys();
		
    	
    }

    update(){
		if(connection==null){
			connection=this.scene.get('wsManager').connection;
		}
		this.orbG.rotation+=0.06;
		//this.orb.rotation+=0.01;

		rojo= this.scene.get('wsManager').rojo;
		if(rojo==true) this.fondo=this.add.image(400,300,"rojo");
		if(rojo==false)this.fondo=this.add.image(400,300,"azul");
		
        if(this.cursors.space.isDown){
			this.cameras.main.fadeOut(1000, 0, 0, 0)
			connection.send("Dale");
			this.inicioGame();
			
		}
    }
    
    inicioGame(){
			this.scene.launch("CodeLevel");
            this.scene.stop("Lobby");
            this.scene.stop("MenuBackground");
            rojo=null;
	}
    
    
}
