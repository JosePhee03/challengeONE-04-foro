package com.alura.foro.api.infrastructure.adapter;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.alura.foro.api.domain.dto.ResponsePostDTO;
import com.alura.foro.api.domain.model.Post;
import com.alura.foro.api.domain.port.PostRepository;
import com.alura.foro.api.infrastructure.entity.PostEntity;
import com.alura.foro.api.infrastructure.entity.UserEntity;
import com.alura.foro.api.infrastructure.exeption.ResourceNotFoundException;
import com.alura.foro.api.infrastructure.mapper.PostMapper;

@Repository
public class PostRepositoryMySQL implements PostRepository {

    private final PostJpaRepositoryMySQL postJpaRepository;
    private final UserJpaRepositoryMySQL userJpaRepository;

    public PostRepositoryMySQL(PostJpaRepositoryMySQL postJpaRepository, UserJpaRepositoryMySQL userJpaRepository) {
        this.postJpaRepository = postJpaRepository;
        this.userJpaRepository = userJpaRepository;
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
        PostEntity postEntity = this.postJpaRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Publicación no encontrada"));

        return PostMapper.toResponsePostDTO(postEntity);
    }

    @Override
    public List<ResponsePostDTO> searchForPosts(String query, Long Category, Boolean status) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'searchForPosts'");
    }

    @Override
    public ResponsePostDTO createPost(Post post) {
        PostEntity postEntity = new PostEntity();
        UserEntity userEntity = this.userJpaRepository.findById(1L)
            .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

        postEntity.setTitle(post.getTitle());
        postEntity.setContent(post.getContent());
        postEntity.setStatus(post.getStatus());
        postEntity.setDateCreated(post.getDateCreated());
        postEntity.setCategoryEntities(new HashSet<>());
        postEntity.setCommentEntities(new ArrayList<>());
        postEntity.setUserEntity(userEntity);

        PostEntity savePostEntity = this.postJpaRepository.save(postEntity);

        return PostMapper.toResponsePostDTO(savePostEntity);
    }

    @Override
    public ResponsePostDTO updatePost(Long id, String title, String content, Boolean status) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'updatePost'");
    }

    @Override
    public void deletePost(Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deletePost'");
    }

    
}
