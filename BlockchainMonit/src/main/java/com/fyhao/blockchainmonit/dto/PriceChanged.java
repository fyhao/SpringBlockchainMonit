package com.fyhao.blockchainmonit.dto;

import lombok.Data;

@Data
public class PriceChanged {

	String name;
	String price;
	String network;
	String image;
	String lastUpdatedTime;
}
