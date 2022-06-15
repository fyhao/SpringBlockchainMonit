package com.fyhao.blockchainmonit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fyhao.blockchainmonit.ws.SocketHandler;

@RestController
@RequestMapping(value="test")
public class TestController {

	@Autowired
	SocketHandler handler;
	
	@RequestMapping("/broadcast")
	public @ResponseBody String broadcast(
			@RequestParam String message) throws Exception {
        handler.broadcast(message);
		return "Hello, World 1";
    }
}
