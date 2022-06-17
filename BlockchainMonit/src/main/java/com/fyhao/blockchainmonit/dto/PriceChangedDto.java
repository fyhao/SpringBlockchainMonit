package com.fyhao.blockchainmonit.dto;

import java.util.List;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class PriceChangedDto {

	List<PriceChanged> items;
}
