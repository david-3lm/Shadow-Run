
import Lobby from './lobby.js';
import codeLevel from './codeLevel.js';

export default class wsManager extends Phaser.Scene {
	rojo= null;
	partidaIniciada=false;
	tutoFin=false;
	cont= 0;
	
	connection;
	 constructor() {
        super({key: "wsManager"});
    
    	this.connection=null;
    	this.rojo=null;
	}
    preload(){
	console.log("Escena cargada");
    }

    create(){
	this.wsConnection();
    }

    
    selectorRol(m){
		if(m=="r")this.rojo=true;
		if(m=="a")this.rojo=false;
	}
	
	inicioPartida(){
		this.scene.get('Lobby').inicioGame();
	}
	
	tutoFinal(){
		this.scene.get('CodeLevel').inicioGame();
	}
	
	enviarPos(x,y,run,r){
		this.scene.get('CodeLevel').getWsPlayerPos(x,y);
		
		this.scene.get('CodeLevel').animacion(run,r)
	}
	
	disconnectJg(){
		this.scene.get('CodeLevel').disconnectPlayer();
	}
	
	wsConnection(){
	var self = this;
	var ip="ws://"+ window.location.hostname + ":8080/game";
	if(this.connection==null){
		this.connection = new WebSocket(ip);
		//this.connection = new WebSocket('ws://192.168.1.157:8080/game');
		self.rojo=null;
	}
	
		this.connection.onerror = function(e) {
		  console.log("WS error: " + e);
		}
		
		this.connection.onmessage = function(msg){
		 var ms= msg.data;
		 if(ms=="r" || ms=="a"){
		 	self.selectorRol(msg.data);

		 }else if(!this.partidaIniciada){
			this.partidaIniciada=true;
			self.inicioPartida();
		
		 }else if(ms=="DesconexionJG"){
			self.disconnectJg();
		 }else
		 {
			var fin= JSON.parse(msg.data).fin;
			if(fin){
				var winR = JSON.parse(msg.data).winRed;

				self.scene.get('CodeLevel').recibeMSGFin(winR)

			}else{
				var x= JSON.parse(msg.data).posX;
				var y= JSON.parse(msg.data).posY;
				var run= JSON.parse(msg.data).running;
				var r = JSON.parse(msg.data).right;
				self.enviarPos(x,y,run,r);
			}
			
		 }
		}
		this.connection.onclose = function() {
			
			console.log("Closing socket");
			self.rojo=null;
		}
		this.connection.onopen = function() {
			 console.log("Conexion creada");
			 self.rojo=null;
		}
			    
	}
	
}