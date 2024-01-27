package com.alura.foro.api.infrastructure.security.service;

import java.util.List;
import java.util.ArrayList;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.alura.foro.api.infrastructure.entity.UserEntity;
import com.alura.foro.api.infrastructure.exeption.ResourceNotFoundException;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;

@Service
public class JwtService {
    
    @Value("${security.jwt.expiration-minutes}")
    private long EXPIRATION_MINUTES;

    @Value("${security.jwt.secret-key}")
    private String SECRET_KEY;

    public String generateToken(UserEntity user) {

        Date issuedAt = new Date(System.currentTimeMillis());
        Date expiration = new Date(issuedAt.getTime() + (EXPIRATION_MINUTES * 60 * 1000));

        List<String> claimArray = new ArrayList<>();

        user.getAuthorities().forEach(grantedAuthority -> claimArray.add(grantedAuthority.getAuthority()));

        return JWT.create()
                .withIssuer("alura foro")
                .withSubject(user.getUsername())
                .withClaim("id", user.getId())
                .withClaim("permissions", claimArray)
                .withIssuedAt(issuedAt)
                .withExpiresAt(expiration)
                .sign(getAlgorithm());
    }

    public Algorithm getAlgorithm() {
        return Algorithm.HMAC256(SECRET_KEY);
    }

    public DecodedJWT getVerify(String jwt) {
        return JWT
            .require(getAlgorithm())
            .withIssuer("alura foro")
            .build()
            .verify(jwt);
    }

    public String getSubject(String jwt) {
        String subjectString = getVerify(jwt).getSubject();

        if (subjectString == null) {
            throw new ResourceNotFoundException("Error al verificar el token");
        }

        return subjectString;
    }

}
