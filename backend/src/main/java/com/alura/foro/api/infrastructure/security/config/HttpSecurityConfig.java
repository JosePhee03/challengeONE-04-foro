package com.alura.foro.api.infrastructure.security.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.alura.foro.api.domain.model.Role;
import com.alura.foro.api.infrastructure.security.filter.JwtAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class HttpSecurityConfig {
    
    @Autowired
    JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authRequest -> {
                    authRequest.requestMatchers(HttpMethod.POST, "/api/auth").permitAll();
                    authRequest.requestMatchers(HttpMethod.POST, "/api/user").permitAll();
                    authRequest.requestMatchers(HttpMethod.GET, "/api/**").hasAnyAuthority("ROLE_" + Role.USER.name(),
                    "ROLE_" + Role.ADMIN.name());
                    authRequest.requestMatchers(HttpMethod.POST, "/api/**").hasAnyAuthority("ROLE_" + Role.USER.name(),
                    "ROLE_" + Role.ADMIN.name());
                    authRequest.requestMatchers(HttpMethod.PATCH, "/api/**").hasAnyAuthority("ROLE_" + Role.USER.name(),
                    "ROLE_" + Role.ADMIN.name());
                    authRequest.requestMatchers(HttpMethod.DELETE, "/api/**").hasAnyAuthority("ROLE_" + Role.USER.name(),
                    "ROLE_" + Role.ADMIN.name());
                    authRequest.requestMatchers(HttpMethod.GET, "/**").permitAll();
                })
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
            throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
