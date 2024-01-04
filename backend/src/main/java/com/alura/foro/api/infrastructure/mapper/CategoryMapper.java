package com.alura.foro.api.infrastructure.mapper;

import java.util.HashSet;
import java.util.Set;


import com.alura.foro.api.domain.model.Category;
import com.alura.foro.api.domain.model.Post;
import com.alura.foro.api.infrastructure.entity.CategoryEntity;
import com.alura.foro.api.infrastructure.entity.PostEntity;


public class CategoryMapper {


    private CategoryMapper() {
    }

    public static CategoryEntity mapToEntity(Category category) {
        CategoryEntity categoryEntity = new CategoryEntity();
        categoryEntity.setId(category.getId());
        categoryEntity.setName(category.getName());

        Set<PostEntity> postEntities = new HashSet<>();
        if (category.getPosts() != null) {
            for (Post post : category.getPosts()) {
                PostEntity postEntity = PostMapper.mapToEntity(post); // Necesitarás implementar PostMapper
                postEntities.add(postEntity);
            }
        }
        categoryEntity.setPostEntities(postEntities);

        return categoryEntity;
    }

    public static Category mapToModel(CategoryEntity categoryEntity) {
        Category category = new Category();
        category.setId(categoryEntity.getId());
        category.setName(categoryEntity.getName());

        Set<Post> posts = new HashSet<>();
        if (categoryEntity.getPostEntities() != null) {
            for (PostEntity postEntity : categoryEntity.getPostEntities()) {
                Post post = PostMapper.mapToModel(postEntity); // Necesitarás implementar PostMapper
                posts.add(post);
            }
        }
        category.setPosts(posts);

        return category;
    }

}
