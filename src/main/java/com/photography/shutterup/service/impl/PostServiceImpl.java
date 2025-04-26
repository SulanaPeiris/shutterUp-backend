package com.photography.shutterup.service.impl;

import com.photography.shutterup.exception.ResourceNotFoundException;
import com.photography.shutterup.model.Post;
import com.photography.shutterup.repository.PostRepository;
import com.photography.shutterup.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;

    @Override
    public Post createPost(Post post) {
        return postRepository.save(post);
    }

    @Override
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    @Override
    public Post getPostById(Long id) {
        return postRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found with id: " + id));
    }

    @Override
    public Post updatePost(Long id, Post updatedPost) {
        Post existingPost = getPostById(id);

        existingPost.setTitle(updatedPost.getTitle());
        existingPost.setDescription(updatedPost.getDescription());
        existingPost.setMediaUrl(updatedPost.getMediaUrl());
        existingPost.setMediaType(updatedPost.getMediaType());
        existingPost.setCameraSettings(updatedPost.getCameraSettings());
        existingPost.setLocation(updatedPost.getLocation());
        existingPost.setCreatedBy(updatedPost.getCreatedBy());

        return postRepository.save(existingPost);
    }

    @Override
    public void deletePost(Long id) {
        Post post = getPostById(id);
        postRepository.delete(post);
    }
}
