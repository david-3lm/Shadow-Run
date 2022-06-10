import Menu from "./menu.js";
import MenuBackground from "./menuBackground.js";

export default class oponenteDesc extends Phaser.Scene {
	
	 constructor(){
			 super({key:"oponenteDesc"});
		}
	
	preload(){
    	this.load.image("oponDesc", "assets/menu/OPONENTE_DESCONECTADO.png");
		this.scene.launch("MenuBackground",MenuBackground);
		this.scene.sendToBack("MenuBackground");
	}
	
	create(){
		this.fondo = this.add.image(400, 300, "oponDesc");
		this.cursors = this.input.keyboard.createCursorKeys();
	}
	
	update(){
		
		if(this.cursors.space.isDown){
            this.scene.stop("oponenteDesc");
            this.scene.stop("MenuBackground");
            this.scene.get('wsManager').connection=null;
            this.scene.stop("wsManager");
            this.scene.launch("Menu",Menu);
        }
        
	}
	}
	