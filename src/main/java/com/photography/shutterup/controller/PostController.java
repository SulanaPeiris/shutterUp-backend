package com.photography.shutterup.controller;

import com.photography.shutterup.dto.PostRequestDTO;
import com.photography.shutterup.dto.PostResponseDTO;
import com.photography.shutterup.model.Post;
import com.photography.shutterup.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    @PostMapping
    public PostResponseDTO createPost(@RequestBody PostRequestDTO request) {
        Post post = mapToPost(request);
        Post createdPost = postService.createPost(post);
        return mapToResponseDTO(createdPost);
    }

    @GetMapping
    public List<PostResponseDTO> getAllPosts() {
        return postService.getAllPosts().stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public PostResponseDTO getPostById(@PathVariable Long id) {
        return mapToResponseDTO(postService.getPostById(id));
    }

    @PutMapping("/{id}")
    public PostResponseDTO updatePost(@PathVariable Long id, @RequestBody PostRequestDTO request) {
        Post post = mapToPost(request);
        Post updatedPost = postService.updatePost(id, post);
        return mapToResponseDTO(updatedPost);
    }

    @DeleteMapping("/{id}")
    public void deletePost(@PathVariable Long id) {
        postService.deletePost(id);
    }

    private Post mapToPost(PostRequestDTO dto) {
        return Post.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .mediaUrl(dto.getMediaUrl())
                .mediaType(dto.getMediaType())
                .cameraSettings(dto.getCameraSettings())
                .location(dto.getLocation())
                .createdBy(dto.getCreatedBy())
                .build();
    }

    private PostResponseDTO mapToResponseDTO(Post post) {
        return PostResponseDTO.builder()
                .id(post.getId())
                .title(post.getTitle())
                .description(post.getDescription())
                .mediaUrl(post.getMediaUrl())
                .mediaType(post.getMediaType())
                .cameraSettings(post.getCameraSettings())
                .location(post.getLocation())
                .createdBy(post.getCreatedBy())
                .createdAt(post.getCreatedAt())
                .build();
    }
}
