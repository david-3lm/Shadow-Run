package com.example.demo;

import java.io.IOException;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.example.demo.*;

public class GameHandler extends TextWebSocketHandler{
	
private Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();

Lobby l=new Lobby();


	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		
		if(sessions.size()>=2) {
			while(sessions.size()>0) ;
		}
		System.out.println("New session: " + session.getId());
		
		l.addPlayer(session);
		sessions.put(session.getId(), session);
		
		
		
	}
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		System.out.println("Session closed: " + session.getId());
		sessions.remove(session.getId());
		for(WebSocketSession participant: sessions.values()) {
			if(!participant.getId().equals(session.getId())) {
				participant.sendMessage(new TextMessage("DesconexionJG"));
			}
		}
	}
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		sendOtherParticipants(session, message.getPayload());
			//System.out.println("Message received: " + message.getPayload());
			//String msg = message.getPayload();
			//session.sendMessage(new TextMessage(msg));
		}

	
	private void sendOtherParticipants(WebSocketSession session, String payload) throws IOException {
		for(WebSocketSession participant : sessions.values()) {
			if(!participant.getId().equals(session.getId())) {
				participant.sendMessage(new TextMessage(payload));
			}
		}
	}

}
