package com.fyhao.blockchainmonit.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import com.fyhao.blockchainmonit.dto.BlockchainToken;
import com.fyhao.blockchainmonit.dto.EtherscanTokenItem;
import com.fyhao.blockchainmonit.dto.PriceChanged;
import com.fyhao.blockchainmonit.dto.PriceChangedDto;
import com.fyhao.blockchainmonit.util.Util;
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
	
	static List<PriceChanged> cached = new ArrayList<PriceChanged>();
	
	@Scheduled(fixedDelay = 60000)
	public void scheduleFixedRateTask() throws Exception {
	    List<BlockchainToken> tokens = tokenService.getTokens();
	    List<PriceChanged> listOfPC = new ArrayList<PriceChanged>();
	    for(BlockchainToken token : tokens) {
	    	EtherscanTokenItem eti = tokenService.getEtherscanTokenItem(token);
			String price = eti.getPriceString();
	    	PriceChanged pc = new PriceChanged();
	    	pc.setName(token.getName());
	    	pc.setNetwork(tokenService.getNetworkName(token));
	    	pc.setPrice(price);
	    	pc.setImage(eti.getImage());
	    	pc.setLastUpdatedTime(Util.formatTime("yyyy-MM-dd hh:mm", new Date()));
	    	listOfPC.add(pc);
	    }
	    PriceChangedDto dto = new PriceChangedDto();
	    dto.setItems(listOfPC);
	    handler.broadcast(dto);
	    cached = listOfPC;
	}
	
	public void clientRequestPriceUpdate(WebSocketSession session) throws Exception {
		if(cached != null) {
			PriceChangedDto dto = new PriceChangedDto();
		    dto.setItems(cached);
		    handler.broadcast(dto);
		    Gson gson = new Gson();
			String jsonstr = gson.toJson(dto);
			session.sendMessage(new TextMessage(jsonstr));
			return;
		};
		List<BlockchainToken> tokens = tokenService.getTokens();
		List<PriceChanged> listOfPC = new ArrayList<PriceChanged>();
	    for(BlockchainToken token : tokens) {
	    	EtherscanTokenItem eti = tokenService.getEtherscanTokenItem(token);
			String price = eti.getPriceString();
	    	PriceChanged pc = new PriceChanged();
	    	pc.setName(token.getName());
	    	pc.setNetwork(tokenService.getNetworkName(token));
	    	pc.setPrice(price);
	    	pc.setImage(eti.getImage());
	    	pc.setLastUpdatedTime(Util.formatTime("yyyy-MM-dd hh:mm", new Date()));
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
