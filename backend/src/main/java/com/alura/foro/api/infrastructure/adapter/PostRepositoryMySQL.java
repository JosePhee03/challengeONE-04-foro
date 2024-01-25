package com.alura.foro.api.infrastructure.adapter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Repository;

import com.alura.foro.api.domain.dto.PageDTO;
import com.alura.foro.api.domain.dto.ResponsePostDTO;
import com.alura.foro.api.domain.model.Post;
import com.alura.foro.api.domain.port.PostRepository;
import com.alura.foro.api.infrastructure.entity.CategoryEntity;
import com.alura.foro.api.infrastructure.entity.PageMapper;
import com.alura.foro.api.infrastructure.entity.PostEntity;
import com.alura.foro.api.infrastructure.entity.UserEntity;
import com.alura.foro.api.infrastructure.exeption.ResourceNotFoundException;
import com.alura.foro.api.infrastructure.mapper.PostMapper;
import com.alura.foro.api.infrastructure.util.Pagination;

@Repository
public class PostRepositoryMySQL implements PostRepository {

    private final PostJpaRepositoryMySQL postJpaRepository;
    private final UserJpaRepositoryMySQL userJpaRepository;
    private final CategoryJpaRepositoryMySQL categoryJpaRepository;

    public PostRepositoryMySQL(PostJpaRepositoryMySQL postJpaRepository, UserJpaRepositoryMySQL userJpaRepository, CategoryJpaRepositoryMySQL categoryJpaRepository) {
        this.postJpaRepository = postJpaRepository;
        this.userJpaRepository = userJpaRepository;
        this.categoryJpaRepository = categoryJpaRepository;
    }

    @Override
    public List<ResponsePostDTO> getAllPosts() {
        List<PostEntity> postEntities = this.postJpaRepository.findAll();
        List<ResponsePostDTO> postDTOs = new ArrayList<>();

        for (PostEntity postEntities2 : postEntities) {
            postDTOs.add(PostMapper.toResponsePostDTO(postEntities2));
        }

        return postDTOs;
    }

    @Override
    public ResponsePostDTO getPost(Long id) {

        if (id == null) throw new ResourceNotFoundException("Publicación no encontrada");

        PostEntity postEntity = this.postJpaRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Publicación no encontrada"));

        return PostMapper.toResponsePostDTO(postEntity);
    }

    @Override
    public ResponsePostDTO createPost(Post post) {

        Long userId = post.getUserId();

        if (userId == null) throw new ResourceNotFoundException("Usuario no encontrado");

        UserEntity userEntity = this.userJpaRepository.findById(userId)
            .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

        Set<CategoryEntity> categoryEntity = this.categoryJpaRepository.findByIdIn(post.getCategories());

        PostEntity postEntity = new PostEntity();

        postEntity.setTitle(post.getTitle());
        postEntity.setContent(post.getContent());
        postEntity.setStatus(post.getStatus());
        postEntity.setDateCreated(post.getDateCreated());
        postEntity.setCategoryEntities(categoryEntity);
        postEntity.setUserEntity(userEntity);

        PostEntity savePostEntity = this.postJpaRepository.save(postEntity);

        return PostMapper.toResponsePostDTO(savePostEntity);
    }

    @Override
    public ResponsePostDTO updatePost(Long id, String title, String content, Set<Long> categories, Boolean status) {
        if (id == null) throw new ResourceNotFoundException("Publicación no encontrada");

        PostEntity postEntity = this.postJpaRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Publicación no encontrada"));

        Set<CategoryEntity> categoryEntity = this.categoryJpaRepository.findByIdIn(categories);
        
            postEntity.setTitle(title);
            postEntity.setContent(content);
            postEntity.setStatus(status);
            postEntity.setCategoryEntities(categoryEntity);
            postEntity.setDateCreated(LocalDateTime.now());

            PostEntity savePostEntity = this.postJpaRepository.save(postEntity);

        return PostMapper.toResponsePostDTO(savePostEntity);

    }

    @Override
    public void deletePost(Long id) {
        if (id == null) throw new ResourceNotFoundException("Publicación no encontrada");

        this.postJpaRepository.deleteById(id);
    }

    @Override
    public PageDTO<ResponsePostDTO> searchPosts(String query, Set<Long> categories, Boolean status, Long userId, Pagination pagination) {

        Direction direction = Direction.ASC;

        if (pagination.getDirection().name() != "ASC") direction = Direction.DESC;

        Pageable pageable = PageRequest.of(pagination.getPage(), pagination.getSize(), Sort.by(direction, "dateCreated"));

        Page<PostEntity> postEntities = this.postJpaRepository.searchPosts(query, status, categories, userId, pageable);
    
        List<ResponsePostDTO> postDTOs = new ArrayList<>();


        for (PostEntity postEntities2 : postEntities) {
            postDTOs.add(PostMapper.toResponsePostDTO(postEntities2));
        }

        PageMapper<ResponsePostDTO, PostEntity> pageMapper = new PageMapper<>();

        return pageMapper.toPageDTO(postEntities, postDTOs);


    }

    
}
