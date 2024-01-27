package com.alura.foro.api.domain.dto;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;

public record AuthUserDTO (
    String username,
    Collection<? extends GrantedAuthority> authories
) {
    
}
