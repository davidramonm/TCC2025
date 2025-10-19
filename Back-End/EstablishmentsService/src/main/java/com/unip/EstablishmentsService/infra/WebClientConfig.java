package com.unip.EstablishmentsService.infra;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

    @Value("${nominatim.data.url}")
    private String nominatimDataUrl;

    @Bean

    public WebClient webClient() {
        return WebClient.builder().baseUrl(nominatimDataUrl).build();
    }
}
