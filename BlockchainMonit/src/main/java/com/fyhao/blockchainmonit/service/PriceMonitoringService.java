package com.fyhao.blockchainmonit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.fyhao.blockchainmonit.dto.PriceChanged;
import com.fyhao.blockchainmonit.ws.SocketHandler;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class PriceMonitoringService {

	@Autowired
	SocketHandler handler;
	
	@Scheduled(fixedRate = 1000)
	public void scheduleFixedRateTask() throws Exception {
	    String[] tokens = new String[] {"ETH","WBTC"};
	    PriceChanged pc = new PriceChanged();
	    pc.setName(tokens[i++%tokens.length]);
	    pc.setPrice(System.currentTimeMillis()+"");
	    handler.broadcast(pc);
	}
	
	int i = 0;
}
