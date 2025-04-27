package com.photography.shutterup.controller;

import com.photography.shutterup.dto.PostRequestDTO;
import com.photography.shutterup.dto.PostResponseDTO;
import com.photography.shutterup.model.Post;
import com.photography.shutterup.model.User;
import com.photography.shutterup.repository.UserRepository;
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
    private final UserRepository userRepository;

    @PostMapping
    public PostResponseDTO createPost(@RequestBody PostRequestDTO request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with id: " + request.getUserId()));

        Post post = Post.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .mediaUrl(request.getMediaUrl())
                .mediaType(request.getMediaType())
                .cameraSettings(request.getCameraSettings())
                .location(request.getLocation())
                .user(user) // 🔥 Set User Entity, not just ID
                .build();

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
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with id: " + request.getUserId()));

        Post updatedPost = Post.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .mediaUrl(request.getMediaUrl())
                .mediaType(request.getMediaType())
                .cameraSettings(request.getCameraSettings())
                .location(request.getLocation())
                .user(user)
                .build();

        return mapToResponseDTO(postService.updatePost(id, updatedPost));
    }

    @DeleteMapping("/{id}")
    public void deletePost(@PathVariable Long id) {
        postService.deletePost(id);
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
                .userId(post.getUser().getId()) // 🔥 Get userId from User entity
                .createdAt(post.getCreatedAt())
                .build();
    }
}
