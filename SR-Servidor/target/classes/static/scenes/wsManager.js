
import Lobby from './lobby.js';
import codeLevel from './codeLevel.js';

export default class wsManager extends Phaser.Scene {
	rojo= null;
	partidaIniciada=false;
	
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

    update(){
    }
    
    selectorRol(m){
		if(m=="r")this.rojo=true;
		if(m=="a")this.rojo=false;
	}
	
	inicioPartida(){
		this.scene.get('Lobby').inicioGame();
	}
	
	enviarPos(x,y,run,r){
		this.scene.get('CodeLevel').getWsPlayerPos(x,y);
		this.scene.get('CodeLevel').animacion(run,r)
	}
	
	wsConnection(){
	var self = this;
	if(this.connection==null){
		this.connection = new WebSocket('ws://192.168.1.157:8080/game');
		self.rojo=null;
	}
	
		this.connection.onerror = function(e) {
		  console.log("WS error: " + e);
		}
		
		this.connection.onmessage = function(msg){
			//console.log(this);
		  console.log("WS message: " + msg.data);
		  //var parseMsgX = JSON.parse(msg.data).posX;
		  //var parseMsgY = JSON.parse(msg.data).posY;
		  //console.log(parseMsgX);
		  //console.log(parseMsgY);
		 //var parseKey = JSON.parse(msg.data).key;
		 //console.log(JSON.parse(msg.data).key);
		 var ms= msg.data;
		 console.log(ms);
		 if(ms=="r" || ms=="a"){
		 	self.selectorRol(msg.data);

		 }else if(!this.partidaIniciada){
			this.partidaIniciada=true;
			self.inicioPartida();
		 }else{
			var x= JSON.parse(msg.data).posX;
			var y= JSON.parse(msg.data).posY;
			var run= JSON.parse(msg.data).running;
			var r = JSON.parse(msg.data).right;
			self.enviarPos(x,y,run,r);
		 }
		 //self.wsPlayerBPosition(parseKey);
		 //self.wsPlayerAPosition(5,5);
		  //$('#chat').append(msg.data)
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