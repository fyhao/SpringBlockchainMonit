package com.fyhao.blockchainmonit.dto;

import lombok.Data;
import lombok.ToString;

@ToString
@Data
public class EtherscanTokenItem {

	String description;
	String image;
	EtherscanTokenOffer offers;
	
	@ToString
	@Data
	public static class EtherscanTokenOffer {
		String price;
		String priceCurrency;
	}
}
