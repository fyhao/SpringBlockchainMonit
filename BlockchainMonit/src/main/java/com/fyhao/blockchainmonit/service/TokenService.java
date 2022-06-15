package com.fyhao.blockchainmonit.service;

import java.io.IOException;
import java.net.URI;
import java.util.Arrays;
import java.util.List;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fyhao.blockchainmonit.dto.BlockchainNetwork;
import com.fyhao.blockchainmonit.dto.BlockchainToken;
import com.fyhao.blockchainmonit.dto.EtherscanTokenItem;
import com.google.gson.Gson;

import lombok.SneakyThrows;



@Service
public class TokenService {

	@Value("classpath:tokens.json")
	Resource tokensFile;
	
	@Value("classpath:networks.json")
	Resource networksFile;
	
	public List<BlockchainToken> getTokens() throws IOException {
		String data = FileUtils.readFileToString(tokensFile.getFile(), "UTF-8");
		ObjectMapper mapper = new ObjectMapper();
		BlockchainToken[] tokenArray = mapper.readValue(data, BlockchainToken[].class);
		List<BlockchainToken> tokenList = Arrays.asList(tokenArray);
		return tokenList;
	}
	@SneakyThrows(Exception.class)
	public String getPrice(BlockchainToken token) {
		RestTemplate restTemplate = new RestTemplate();
	    final String baseUrl = String.format(getTokenURL(token), token.getAddress());
		URI uri = new URI(baseUrl);
		ResponseEntity<String> result = restTemplate.getForEntity(uri, String.class);
		String jsonstr = StringUtils.substringBetween(result.toString(), "<script type=\"application/ld+json\">", "</script>");
		Gson gson = new Gson();
		EtherscanTokenItem item = gson.fromJson(jsonstr, EtherscanTokenItem.class);
		return item.getOffers().getPriceCurrency() + " " + item.getOffers().getPrice();	
	}
	
	public List<BlockchainNetwork> getNetworks() throws IOException {
		String data = FileUtils.readFileToString(networksFile.getFile(), "UTF-8");
		ObjectMapper mapper = new ObjectMapper();
		BlockchainNetwork[] networkArray = mapper.readValue(data, BlockchainNetwork[].class);
		List<BlockchainNetwork> networkList = Arrays.asList(networkArray);
		return networkList;
	}
	
	public String getTokenURL(BlockchainToken token) throws IOException {
		int chainid = token.getChainid();
		BlockchainNetwork network = getNetworks().stream().filter(e -> e.getChainid() == chainid).findFirst().get();
		String url = network.getNetworkurl() + network.getTokenpath();
		return url;
	}
}
