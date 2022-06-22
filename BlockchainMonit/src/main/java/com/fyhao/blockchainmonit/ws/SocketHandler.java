package com.fyhao.blockchainmonit.ws;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fyhao.blockchainmonit.service.PriceMonitoringService;
import com.google.gson.Gson;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class SocketHandler extends TextWebSocketHandler {
	
	static List<WebSocketSession> sessions = new CopyOnWriteArrayList<>();
	
	@Autowired
	PriceMonitoringService priceMonService;

	@Override
	public void handleTextMessage(WebSocketSession session, TextMessage message)
			throws Exception {
		
		for(WebSocketSession webSocketSession : sessions) {
			Map value = new Gson().fromJson(message.getPayload(), Map.class);
			webSocketSession.sendMessage(new TextMessage("Hello " + value.get("name") + " !"));
		}
	}

	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		//the messages will be broadcasted to all users.
		sessions.add(session);
		log.info("websocket is added: {}", session.getId());
		priceMonService.clientRequestPriceUpdate(session);
	}
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		sessions.remove(session);
		log.info("websocket is closed: {}", session.getId());
	}
	
	public static void broadcast(String s) throws Exception {
		log.info("SocketHandler broadcast {} / {}", s, sessions.size());
		for(WebSocketSession webSocketSession : sessions) {
			log.info("Sending {} to {}", s, webSocketSession.getId());
			webSocketSession.sendMessage(new TextMessage(s));
		}
	}
	
	public static void broadcast(Object obj) throws Exception {
		for(WebSocketSession webSocketSession : sessions) {
			Gson gson = new Gson();
			String jsonstr = gson.toJson(obj);
			log.debug("Sending {} to {}", jsonstr, webSocketSession.getId());
			webSocketSession.sendMessage(new TextMessage(jsonstr));
		}
	}
}