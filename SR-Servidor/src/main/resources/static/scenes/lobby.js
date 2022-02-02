export default class Lobby extends Phaser.Scene {
    constructor() {
        super({key: "Lobby"});
    }

    preload(){
        this.load.image("busq", "assets/menu/BUSCANDO.png");
        this.load.image("orb", "assets/menu/CUERPO_ORBECARGA.png");
        this.load.image("orbGira", "assets/menu/GIRO_ORBECARGA.png");

    }

    create(){
        this.fondo = this.add.image(400, 300, "busq");
		this.orbG= this.add.image(400,400,"orbGira").setScale(0.15);
		this.orb= this.add.image(400,400,"orb").setScale(0.15);
    }

    update(){
		this.orbG.rotation+=0.06;
		//this.orb.rotation+=0.01;
        
    }
    
    wsConnection(){
	//var self = this;
	if(connection==null){
		connection = new WebSocket('ws://192.168.1.130:8080/game');
	}
	
		connection.onerror = function(e) {
		  console.log("WS error: " + e);
		}
		
		connection.onmessage = function(msg){
			//console.log(this);
		  console.log("WS message: " + msg.data);
		  //var parseMsgX = JSON.parse(msg.data).posX;
		  //var parseMsgY = JSON.parse(msg.data).posY;
		  //console.log(parseMsgX);
		  //console.log(parseMsgY);
		 var parseKey = JSON.parse(msg.data).key;
		 //console.log(JSON.parse(msg.data).key);
		 
		 
		 //self.wsPlayerBPosition(parseKey);
		 //self.wsPlayerAPosition(5,5);
		  //$('#chat').append(msg.data)
		}
		connection.onclose = function() {
			console.log("Closing socket");
		}
		connection.onopen = function() {
			 console.log("hola");
			}
			    
}
}
