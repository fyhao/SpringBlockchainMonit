package com.fyhao.blockchainmonit.test;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.web.server.LocalServerPort;

import com.fyhao.blockchainmonit.BlockchainMonitApp;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT, classes = BlockchainMonitApp.class)
public class TestBlockchainMonit {

	@LocalServerPort
	private int port;
	
	
	@Test
	public void contextLoads() {
		//assertThat(controller).isNotNull();
	}
	
}
