package com.alura.foro.api.infrastructure.entity;

import java.util.ArrayList;
import java.util.List;

import com.alura.foro.api.domain.model.Role;

import jakarta.persistence.*;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "user")
@Entity
@Getter
@Setter
@NoArgsConstructor
public class UserEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private Role role;
    private String image;

    @OneToMany(mappedBy = "userEntity", cascade = CascadeType.ALL)
    private List<PostEntity> postEntities = new ArrayList<>();

    @OneToMany(mappedBy = "userEntity", cascade = CascadeType.ALL)
    private List<CommentEntity> commentEntities = new ArrayList<>();

}
