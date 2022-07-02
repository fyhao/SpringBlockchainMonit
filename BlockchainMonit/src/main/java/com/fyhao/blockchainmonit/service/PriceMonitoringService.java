package com.fyhao.blockchainmonit.service;

import java.io.IOException;
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
import com.fyhao.blockchainmonit.util.MyConstants;
import com.fyhao.blockchainmonit.util.Util;
import com.fyhao.blockchainmonit.ws.SocketHandler;
import com.google.gson.Gson;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class PriceMonitoringService {

	
	@Autowired
	TokenService tokenService;
	
	public static List<PriceChanged> cached = new ArrayList<PriceChanged>();
	
	public void setTokenService(TokenService svc) { // for unit test
		tokenService = svc;
	}
	
	@Scheduled(fixedDelay = 60000)
	public void scheduleFixedRateTask() throws Exception {
	    List<BlockchainToken> tokens = tokenService.getTokens();
	    List<PriceChanged> listOfPC = new ArrayList<PriceChanged>();
	    for(BlockchainToken token : tokens) {
	    	EtherscanTokenItem eti = tokenService.getEtherscanTokenItem(token);
			String price = eti.getPriceString();
			boolean toAdd = true;
			for(PriceChanged pc2 : cached) {
				if(pc2.getName().equals(token.getName())
						&& pc2.getNetwork().equals(tokenService.getNetworkName(token))
						) {
					if(price.equals(pc2.getPrice())) {
						toAdd = false;
					}
					
				}
			}
			if(toAdd) {
				PriceChanged pc = buildPriceChanged(token, eti);
		    	listOfPC.add(pc);
			}
	    }
	    if(listOfPC.size() > 0) {
	    	PriceChangedDto dto = new PriceChangedDto();
		    dto.setItems(listOfPC);
		    SocketHandler.broadcast(dto);
	    }
	    replacePcInCache(cached, listOfPC);
	}
	public PriceChanged buildPriceChanged(BlockchainToken token, EtherscanTokenItem eti) throws IOException {
		PriceChanged pc = new PriceChanged();
    	pc.setName(token.getName());
    	pc.setNetwork(tokenService.getNetworkName(token));
    	String price = eti.getPriceString();
    	pc.setPrice(price);
    	pc.setImage(eti.getImage());
    	pc.setLastUpdatedTime(Util.formatTime(MyConstants.yyyyMMddhhmm, new Date()));
    	pc.setUrl(eti.getUrl());
    	pc.setDescription(eti.getDescription());
    	return pc;
	}
	public void replacePcInCache(List<PriceChanged> cached, List<PriceChanged> listOfPC) {
		// listOfPC can be blank b
		for(PriceChanged c : listOfPC) {
			boolean foundCache = false;
			for(PriceChanged c1 : cached) {
				if(c.getNetwork().equals(c1.getNetwork()) && c.getName().equals(c1.getName())) {
					c1.setPrice(c.getPrice());
					foundCache = true;
					break;
				}
			}
			if(!foundCache) {
				cached.add(c);
			}
		}
	}
	
	public void clientRequestPriceUpdate(WebSocketSession session) throws Exception {
		List<PriceChanged> cached = getTokenList();
		PriceChangedDto dto = new PriceChangedDto();
	    dto.setItems(cached);
	    SocketHandler.broadcast(dto);
	    Gson gson = new Gson();
		String jsonstr = gson.toJson(dto);
		session.sendMessage(new TextMessage(jsonstr));
	}
	
	public List<PriceChanged> getTokenList() throws IOException {
		if(cached.isEmpty()) {
			List<BlockchainToken> tokens = tokenService.getTokens();
			List<PriceChanged> listOfPC = new ArrayList<PriceChanged>();
		    for(BlockchainToken token : tokens) {
		    	EtherscanTokenItem eti = tokenService.getEtherscanTokenItem(token);
				String price = eti.getPriceString();
				PriceChanged pc = buildPriceChanged(token, eti);
		    	listOfPC.add(pc);
		    }
		    replacePcInCache(cached, listOfPC);
		}
		return cached;
	}
	
}
