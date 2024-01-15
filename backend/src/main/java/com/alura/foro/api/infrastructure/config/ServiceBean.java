package com.alura.foro.api.infrastructure.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.alura.foro.api.application.service.DomainPostService;
import com.alura.foro.api.application.service.DomainUserService;
import com.alura.foro.api.application.service.PostService;
import com.alura.foro.api.application.service.UserService;
import com.alura.foro.api.domain.port.PostRepository;
import com.alura.foro.api.domain.port.UserRepository;

@Configuration
public class ServiceBean {

    @Bean
    UserService UserBeanService (final UserRepository userRepository) {
        return new DomainUserService(userRepository);
    }

    @Bean
    PostService postBeanService (final PostRepository postRepository) {
        return new DomainPostService(postRepository);
    }

}
