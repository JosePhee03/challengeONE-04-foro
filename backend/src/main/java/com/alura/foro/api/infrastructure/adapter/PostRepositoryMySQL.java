package com.alura.foro.api.infrastructure.adapter;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.alura.foro.api.domain.model.Post;
import com.alura.foro.api.domain.port.PostRepository;
import com.alura.foro.api.infrastructure.entity.PostEntity;
import com.alura.foro.api.infrastructure.exeption.ResourceNotFoundException;
import com.alura.foro.api.infrastructure.mapper.PostMapper;

@Repository
public class PostRepositoryMySQL implements PostRepository {

    private PostJpaRepositoryMySQL postJpaRepository;

    public PostRepositoryMySQL (PostJpaRepositoryMySQL postJpaRepository) {
        this.postJpaRepository = postJpaRepository;
    }

    @Override
    public List<Post> getAllPosts() {
        List<PostEntity> postEntities = this.postJpaRepository.findAll();
        return PostMapper.mapListToModel(postEntities);
    }

    @Override
    public Post getPost(Long id) {
        PostEntity postEntity = this.postJpaRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Publicación no encontrada"));

        return PostMapper.mapToModel(postEntity);
    }

    @Override
    public List<Post> searchForPosts(String query, Long Category, Boolean status) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'searchForPosts'");
    }

    @Override
    public Post createPost(Post post) {
        PostEntity postEntity = PostMapper.mapToEntity(post);
        System.out.println("HOLAAAAAAAAAAAAAAAAAAA");
        return PostMapper.mapToModel(this.postJpaRepository.save(postEntity));
    }

    @Override
    public Post updatePost(Long id, String title, String content, Boolean status) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'updatePost'");
    }

    @Override
    public void deletePost(Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deletePost'");
    }
    
}
