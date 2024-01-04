package com.alura.foro.api.infrastructure.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.alura.foro.api.application.service.DomainUserService;
import com.alura.foro.api.application.service.UserService;
import com.alura.foro.api.domain.port.UserRepository;

@Configuration
public class ServiceBean {
    @Bean
    UserService UserBeanService (final UserRepository userRepository) {
        return new DomainUserService(userRepository);
    }

}
