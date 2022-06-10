package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@SpringBootApplication
@EnableWebSocket
public class WsJueguillo implements WebSocketConfigurer{
	
	public static void main(String[] args) {
		SpringApplication.run(WsJueguillo.class, args);
	}

	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(createGameHandler(), "/game")
			.setAllowedOrigins("*");
	}
	
	@Bean
	public GameHandler createGameHandler() {
		return new GameHandler();
	}
	


}
