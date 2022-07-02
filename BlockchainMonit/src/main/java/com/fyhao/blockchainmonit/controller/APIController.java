package com.fyhao.blockchainmonit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fyhao.blockchainmonit.dto.PriceChanged;
import com.fyhao.blockchainmonit.service.PriceMonitoringService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping(value="api")
public class APIController {

	
	@Autowired
	PriceMonitoringService service;
	
	@RequestMapping("/tokenlist")
	public @ResponseBody List<PriceChanged> getTokenList() throws Exception {
		return service.getTokenList();
    }
}
