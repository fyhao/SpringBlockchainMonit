package com.fyhao.blockchainmonit.service;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Arrays;
import java.util.List;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fyhao.blockchainmonit.dto.BlockchainToken;
import com.fyhao.blockchainmonit.dto.EtherscanTokenItem;
import com.google.gson.Gson;



@Service
public class TokenService {

	@Value("classpath:tokens.json")
	Resource tokensFile;
	
	public List<BlockchainToken> getTokens() throws IOException {
		String data = FileUtils.readFileToString(tokensFile.getFile(), "UTF-8");
		ObjectMapper mapper = new ObjectMapper();
		BlockchainToken[] tokenArray = mapper.readValue(data, BlockchainToken[].class);
		List<BlockchainToken> tokenList = Arrays.asList(tokenArray);
		return tokenList;
	}
	
	public String getPrice(BlockchainToken token) throws URISyntaxException, JsonMappingException, JsonProcessingException {
		RestTemplate restTemplate = new RestTemplate();
	    final String baseUrl = String.format("https://etherscan.io/token/%s", token.getAddress());
		URI uri = new URI(baseUrl);
		ResponseEntity<String> result = restTemplate.getForEntity(uri, String.class);
		String jsonstr = StringUtils.substringBetween(result.toString(), "<script type=\"application/ld+json\">", "</script>");
		Gson gson = new Gson();
		try {
			EtherscanTokenItem item = gson.fromJson(jsonstr, EtherscanTokenItem.class);
			return item.getOffers().getPriceCurrency() + " " + item.getOffers().getPrice();	
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return null;
	}
}
