package com.apigateway.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;

@Configuration
@EnableWebFluxSecurity
public class GatewaySecurityConfig {

    @Bean
    public SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
        http
            .csrf(csrf -> csrf.disable()) // Disabled for stateless REST token environments
            .authorizeExchange(exchanges -> exchanges
                // Always allow auth paths (Login/Signup) through without checking keys
                .pathMatchers("/api/auth/**", "/api/v1/user/**").permitAll()
                // All other business routes are guarded by our filter rules
                .anyExchange().permitAll()
            );

        return http.build();
    }
}