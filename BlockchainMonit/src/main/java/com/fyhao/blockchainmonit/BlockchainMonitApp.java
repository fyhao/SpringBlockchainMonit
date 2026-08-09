package com.fyhao.blockchainmonit;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class BlockchainMonitApp {
	public static void main(String[] args) {
		SpringApplication.run(BlockchainMonitApp.class, args);
	}
}