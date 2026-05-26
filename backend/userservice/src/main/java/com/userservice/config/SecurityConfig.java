package com.userservice.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    // Configures the BCrypt bean for password hashing during user creation
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // 1. Disable CSRF for stateless JWT APIs
            .csrf().disable()
            
            // 2. Set session management to stateless (no HTTP sessions)
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            
            // 3. Define your route authentication rules using antMatchers
            .authorizeRequests()
                // Allows registration and login paths to pass freely without a token
                .antMatchers("/api/auth/**", "/api/v1/user/**").permitAll()
                // All other private requests require a valid login session/token
                .anyRequest().authenticated();
            
        return http.build();
    }
}