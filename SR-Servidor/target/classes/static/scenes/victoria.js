import Menu from "./menu.js";
import MenuBackground from "./menuBackground.js";

export default class Victoria extends Phaser.Scene {
	
	 constructor(){
			 super({key:"Victoria"});
		}
	
	preload(){
		this.load.image("win", "assets/sprites/VICTORIA.png");	
		this.scene.launch("MenuBackground",MenuBackground);
		this.scene.sendToBack("MenuBackground");
	}
	
	create(){
		this.fondo = this.add.image(400, 300, "win");
		this.cursors = this.input.keyboard.createCursorKeys();
	}
	
	update(){
		if(this.cursors.space.isDown){
            this.scene.stop("Victoria");
            this.scene.stop("MenuBackground");
            this.scene.get('wsManager').connection=null;
            this.scene.stop("wsManager");
            this.scene.launch("Menu",Menu);
        }
	}
	
	}
	
	