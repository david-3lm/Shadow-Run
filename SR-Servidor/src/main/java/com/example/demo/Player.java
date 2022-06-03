package com.example.demo;

import java.io.IOException;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

public class Player {
	
	private WebSocketSession ws;
	private boolean rojo;
	
	
	public Player(WebSocketSession w,boolean c) {
		ws=w;
		rojo=c;
	}
	
	public void sendMsgP() throws IOException {
		if(rojo==true) ws.sendMessage(new TextMessage("r"));
		if(rojo==false) ws.sendMessage(new TextMessage("a"));
	}
	
	
	public WebSocketSession getWs() {
		return ws;
	}
	
	public void setWs(WebSocketSession w) {
		ws= w;
	}
	
	public boolean getColor() {
		return rojo;
	}
	
	public void setRojo(boolean c) {
		rojo= c;
	}

	
}
