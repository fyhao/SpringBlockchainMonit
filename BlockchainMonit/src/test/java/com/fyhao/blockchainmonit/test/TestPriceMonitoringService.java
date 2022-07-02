package com.fyhao.blockchainmonit.test;

import static org.assertj.core.api.Assertions.assertThat;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.web.server.LocalServerPort;

import com.fyhao.blockchainmonit.BlockchainMonitApp;
import com.fyhao.blockchainmonit.dto.BlockchainNetwork;
import com.fyhao.blockchainmonit.dto.BlockchainToken;
import com.fyhao.blockchainmonit.dto.EtherscanTokenItem;
import com.fyhao.blockchainmonit.dto.EtherscanTokenItem.EtherscanTokenOffer;
import com.fyhao.blockchainmonit.dto.PriceChanged;
import com.fyhao.blockchainmonit.service.PriceMonitoringService;
import com.fyhao.blockchainmonit.service.TokenService;

import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT, classes = BlockchainMonitApp.class)
public class TestPriceMonitoringService {

	@LocalServerPort
	private int port;
	
	@Autowired
	PriceMonitoringService pmSvc;
	
	
	@Test
	public void testPriceMonitoring() throws Exception {
		pmSvc.cached.clear();
		MockTokenService mtsvc = new MockTokenService();
		pmSvc.setTokenService(mtsvc);
		assertThat(pmSvc.cached).isEmpty();
		pmSvc.scheduleFixedRateTask();
		assertThat(pmSvc.cached).hasSize(2);
		assertThat(pmSvc.cached.get(0).getPrice()).isEqualTo("USD 1.00");
		assertThat(pmSvc.cached.get(1).getPrice()).isEqualTo("USD 1.00");
		// if nothing price change, run again schedule job
		pmSvc.scheduleFixedRateTask();
		assertThat(pmSvc.cached).hasSize(2);
		assertThat(pmSvc.cached.get(0).getPrice()).isEqualTo("USD 1.00");
		assertThat(pmSvc.cached.get(1).getPrice()).isEqualTo("USD 1.00");
		// one of the price change, run again schedule job
		mtsvc.prices[1] = "2.00";
		pmSvc.scheduleFixedRateTask();
		assertThat(pmSvc.cached).hasSize(2);
		assertThat(pmSvc.cached.get(0).getPrice()).isEqualTo("USD 1.00");
		assertThat(pmSvc.cached.get(1).getPrice()).isEqualTo("USD 2.00");
		
	}
	
	@Test
	public void testGetTokenList() throws Exception {
		pmSvc.cached.clear();
		MockTokenService mtsvc = new MockTokenService();
		pmSvc.setTokenService(mtsvc);
		assertThat(pmSvc.cached).isEmpty();
		assertThat(pmSvc.getTokenList()).hasSize(2);
		assertThat(pmSvc.cached).hasSize(2);
	}
	
	@Test
	public void testReplacePcInCache() {
		List<PriceChanged> cached = new ArrayList<PriceChanged>();
		List<PriceChanged> pc = new ArrayList<PriceChanged>();
		pmSvc.replacePcInCache(cached, pc);
		assertThat(cached).hasSize(0);
		assertThat(pc).hasSize(0);
		PriceChanged pc1 = new PriceChanged();
		pc1.setName("ETH");
		pc1.setNetwork("etherscan");
		pc1.setPrice("1.00");
		PriceChanged pc2 = new PriceChanged();
		pc2.setName("BTC");
		pc2.setNetwork("BTC");
		pc2.setPrice("1.00");
		pc.add(pc1);
		pmSvc.replacePcInCache(cached, pc);
		assertThat(cached).hasSize(1);
		assertThat(pc).hasSize(1);
		pmSvc.replacePcInCache(cached, pc);
		assertThat(cached).hasSize(1);
		assertThat(pc).hasSize(1);
		pc.clear();
		pmSvc.replacePcInCache(cached, pc);
		assertThat(cached).hasSize(1);
		assertThat(pc).hasSize(0);
		pc.add(pc2);
		pmSvc.replacePcInCache(cached, pc);
		assertThat(cached).hasSize(2);
		assertThat(pc).hasSize(1);
	}
	
	public static class MockTokenService extends TokenService {
		public String[] prices = new String[] {"1.00","1.00"};
		public List<BlockchainToken> getTokens() throws IOException {
			List<BlockchainToken> list = new ArrayList<BlockchainToken>();
			BlockchainToken t = new BlockchainToken();
			t.setName("ETH");
			t.setAddress("12341234");
			t.setChainid(1);
			list.add(t);
			BlockchainToken t2 = new BlockchainToken();
			t2.setName("BTC");
			t2.setAddress("43214321");
			t2.setChainid(2);
			list.add(t2);
			return list;
		}
		@SneakyThrows(Exception.class)
		public String getPrice(BlockchainToken token) {
			return "USD 1.00";
		}
		@SneakyThrows(Exception.class)
		public EtherscanTokenItem getEtherscanTokenItem(BlockchainToken token) {
			EtherscanTokenItem item = new EtherscanTokenItem();
			EtherscanTokenOffer o = new EtherscanTokenOffer();
			int index = token.getChainid()-1;
			if(index > prices.length - 1) {
				index = 0;
			}
			o.setPrice(prices[index]);;
			o.setPriceCurrency("USD");
			item.setOffers(o);
			return item;
		}
		
		public List<BlockchainNetwork> getNetworks() throws IOException {
			List<BlockchainNetwork> networks = new ArrayList<BlockchainNetwork>();
			BlockchainNetwork n1 = new BlockchainNetwork();
			n1.setChainid(1);
			n1.setName("network 1");
			networks.add(n1);
			BlockchainNetwork n2 = new BlockchainNetwork();
			n2.setChainid(2);
			n2.setName("network 2");
			networks.add(n2);
			return networks;
		}
		
	}
}
