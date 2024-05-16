package com.alura.foro.api.infrastructure.adapter;

import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Repository;

import com.alura.foro.api.domain.dto.PageDTO;
import com.alura.foro.api.domain.dto.ResponsePostDTO;
import com.alura.foro.api.domain.model.Post;
import com.alura.foro.api.domain.port.PostRepository;
import com.alura.foro.api.infrastructure.entity.CategoryEntity;
import com.alura.foro.api.infrastructure.entity.PostEntity;
import com.alura.foro.api.infrastructure.entity.UserEntity;
import com.alura.foro.api.infrastructure.exeption.ResourceNotFoundException;
import com.alura.foro.api.infrastructure.exeption.UnauthorizedOperationException;
import com.alura.foro.api.infrastructure.mapper.PageMapper;
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
    public ResponsePostDTO updatePost(Long id, Long userId, String title, String content, Set<Long> categories, Boolean status) {
        if (id == null || userId == null) throw new ResourceNotFoundException("Publicación no encontrada");

        PostEntity postEntity = this.postJpaRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Publicación no encontrada"));

        if (postEntity.getUserEntity().getId().equals(userId)) {
            Set<CategoryEntity> categoryEntity = this.categoryJpaRepository.findByIdIn(categories);
        
            postEntity.setTitle((title == null) ? postEntity.getTitle() : title);
            postEntity.setContent((content == null) ? postEntity.getContent() : content);
            postEntity.setStatus((status == null) ? postEntity.getStatus() : status);
            postEntity.setCategoryEntities((categories == null) ? postEntity.getCategoryEntities() : categoryEntity);
            postEntity.setDateCreated(ZonedDateTime.now(ZoneOffset.UTC));

            PostEntity savePostEntity = this.postJpaRepository.save(postEntity);

            return PostMapper.toResponsePostDTO(savePostEntity);
        } else {
            throw new UnauthorizedOperationException("No tienes permiso para modificar esta publicación");
        }

        

    }

    @Override
    public void deletePost(Long id, Long userId) {
        if (id == null || userId == null) throw new ResourceNotFoundException("Publicación no encontrada");

        PostEntity postEntity = this.postJpaRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Publicación no encontrada"));

        if (postEntity.getUserEntity().getId().equals(userId)) {
            this.postJpaRepository.deleteById(id);
        } else {
            throw new UnauthorizedOperationException("No tienes permiso para eliminar esta publicación");
        }
    }

    @Override
    public PageDTO<ResponsePostDTO> searchPosts(String query, Set<Long> categories, Boolean status, Long userId, Pagination pagination) {

        //Direction direction = Direction.ASC;

        //if (pagination.getDirection().name() != "ASC") direction = Direction.DESC;
        
        PageRequest pageable = PageRequest.of(pagination.getPage(), pagination.getSize());

        List<PostEntity> postEntities = this.postJpaRepository.searchPosts(query, status, categories, userId);
    
        List<ResponsePostDTO> postDTOs = new ArrayList<>();

        for (PostEntity postEntities2 : postEntities) {
            postDTOs.add(PostMapper.toResponsePostDTO(postEntities2));
            System.out.println(postEntities2);
        }

        PageMapper<ResponsePostDTO, PostEntity> pageMapper = new PageMapper<>();

        return pageMapper.toPageDTO(new PageImpl<>(postEntities, pageable, 100), postDTOs);


    }

    
}
