package com.fyhao.blockchainmonit.test;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Map;

import org.junit.jupiter.api.Test;

import com.fyhao.blockchainmonit.controller.APIController;

public class TestAPIController {

    @Test
    public void healthReportsUpWithoutExternalDependencies() {
        APIController controller = new APIController();
        Map<String, String> response = controller.health();
        assertThat(response).containsEntry("status", "UP");
    }
}
