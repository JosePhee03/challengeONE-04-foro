package com.alura.foro.api.infrastructure.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.alura.foro.api.application.service.CategoryService;
import com.alura.foro.api.application.service.CommentService;
import com.alura.foro.api.application.service.DomainCategoryService;
import com.alura.foro.api.application.service.DomainCommentService;
import com.alura.foro.api.application.service.DomainPostService;
import com.alura.foro.api.application.service.DomainUserService;
import com.alura.foro.api.application.service.PostService;
import com.alura.foro.api.application.service.UserService;
import com.alura.foro.api.domain.port.CategoryRepository;
import com.alura.foro.api.domain.port.CommentRepository;
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

    @Bean
    CategoryService categoryBeanService (final CategoryRepository categoryRepository) {
        return new DomainCategoryService(categoryRepository);
    }

    @Bean
    CommentService commentBeanService (final CommentRepository commentRepository) {
        return new DomainCommentService(commentRepository);
    }

}
