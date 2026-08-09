package com.fyhao.blockchainmonit.test;

import static org.assertj.core.api.Assertions.assertThat;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.web.server.LocalServerPort;

import com.fyhao.blockchainmonit.BlockchainMonitApp;
import com.fyhao.blockchainmonit.dto.BlockchainToken;
import com.fyhao.blockchainmonit.dto.EtherscanTokenItem;
import com.fyhao.blockchainmonit.service.TokenService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT, classes = BlockchainMonitApp.class)
public class TestBlockchainMonit {

	@LocalServerPort
	private int port;
	
	@Autowired
	TokenService tokenService;
	
	@Test
	public void contextLoads() {
		//assertThat(controller).isNotNull();
	}
	
	@Test
	public void testReadTokensFile() throws IOException {
		List<BlockchainToken> list = tokenService.getTokens();
		assertThat(list).isNotEmpty();
	}
	/*
	@Test
	public void testGetPrices() throws IOException, URISyntaxException {
		List<BlockchainToken> list = tokenService.getTokens();
		assertThat(list).isNotEmpty();
		for(BlockchainToken token : list) {
			EtherscanTokenItem eti = tokenService.getEtherscanTokenItem(token);
			String price = eti.getPriceString();
			assertThat(price).isNotNull();
			log.info("getprice token {} price {}", token.getName(), price);
		}
	}
	*/
}
