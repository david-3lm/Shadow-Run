import Menu from "./menu.js";
import MenuBackground from "./menuBackground.js";

export default class Derrota extends Phaser.Scene {
	
	 constructor(){
			 super({key:"Derrota"});
		}
	
	preload(){
    	this.load.image("lose", "assets/sprites/DERROTA.png");
		this.scene.launch("MenuBackground",MenuBackground);
		this.scene.sendToBack("MenuBackground");
	}
	
	create(){
		this.fondo = this.add.image(400, 300, "lose");
		this.cursors = this.input.keyboard.createCursorKeys();
	}
	
	update(){
		if(this.cursors.space.isDown){
            this.scene.stop("Derrota");
            this.scene.stop("MenuBackground");
            this.scene.get('wsManager').connection=null;
            this.scene.stop("wsManager");
            this.scene.launch("Menu",Menu);
        }
	}
	}
	
	