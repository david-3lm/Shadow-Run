package com.example.demo;

import java.io.IOException;

import org.springframework.web.socket.WebSocketSession;

public class Lobby {

	Player pRojo=null;
	Player pAzul=null;
	
	
	
	void addPlayer(WebSocketSession w) throws IOException {
		
		if(pRojo==null) {
			pRojo=new Player(w, true);
			System.out.println("Jugador rojo creado");
			
		}else
		if(pAzul==null){
			pAzul= new Player(w,false);
			System.out.println("Jugador azul creado");
			sendMsg();
		}
	}
	
	void sendMsg() throws IOException {
		pRojo.sendMsgP();
		pAzul.sendMsgP();
		pRojo=null;
		pAzul=null;
	}
	
}
