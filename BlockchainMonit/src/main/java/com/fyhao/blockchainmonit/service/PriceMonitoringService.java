package com.fyhao.blockchainmonit.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import com.fyhao.blockchainmonit.dto.BlockchainToken;
import com.fyhao.blockchainmonit.dto.PriceChanged;
import com.fyhao.blockchainmonit.dto.PriceChangedDto;
import com.fyhao.blockchainmonit.ws.SocketHandler;
import com.google.gson.Gson;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class PriceMonitoringService {

	@Autowired
	SocketHandler handler;
	
	@Autowired
	TokenService tokenService;
	
	@Scheduled(fixedRate = 20000)
	public void scheduleFixedRateTask() throws Exception {
	    List<BlockchainToken> tokens = tokenService.getTokens();
	    List<PriceChanged> listOfPC = new ArrayList<PriceChanged>();
	    for(BlockchainToken token : tokens) {
	    	String price = tokenService.getPrice(token);
	    	PriceChanged pc = new PriceChanged();
	    	pc.setName(token.getName());
	    	pc.setNetwork(tokenService.getNetworkName(token));
	    	pc.setPrice(price);
	    	listOfPC.add(pc);
	    }
	    PriceChangedDto dto = new PriceChangedDto();
	    dto.setItems(listOfPC);
	    handler.broadcast(dto);
	}
	
	public void clientRequestPriceUpdate(WebSocketSession session) throws Exception {
		List<BlockchainToken> tokens = tokenService.getTokens();
		List<PriceChanged> listOfPC = new ArrayList<PriceChanged>();
	    for(BlockchainToken token : tokens) {
	    	String price = tokenService.getPrice(token);
	    	PriceChanged pc = new PriceChanged();
	    	pc.setName(token.getName());
	    	pc.setNetwork(tokenService.getNetworkName(token));
	    	pc.setPrice(price);
	    	listOfPC.add(pc);
	    }
	    PriceChangedDto dto = new PriceChangedDto();
	    dto.setItems(listOfPC);
	    handler.broadcast(dto);
	    Gson gson = new Gson();
		String jsonstr = gson.toJson(dto);
		session.sendMessage(new TextMessage(jsonstr));
	}
	
}
