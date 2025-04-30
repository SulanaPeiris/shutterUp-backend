package com.photography.shutterup.service;

import com.photography.shutterup.model.Post;

import java.util.List;

public interface PostService {
    Post createPost(Post post);
    List<Post> getAllPosts();
    List<Post> getPostsByUserId(Long userId);
    Post getPostById(Long id);
    Post updatePost(Long id, Post updatedPost);
    void deletePost(Long id);
}
