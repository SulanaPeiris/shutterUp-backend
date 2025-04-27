package com.photography.shutterup.controller;

import com.photography.shutterup.model.Post;
import com.photography.shutterup.model.User;
import com.photography.shutterup.repository.PostRepository;
import com.photography.shutterup.repository.UserRepository;
import com.photography.shutterup.service.LikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/likes")
@RequiredArgsConstructor
public class LikeController {

    private final LikeService likeService;
    private final UserRepository userRepository;
    private final PostRepository postRepository;

    @PostMapping
    public void likePost(@RequestParam Long postId, @RequestParam Long userId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found!"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found!"));

        likeService.likePost(post, user);
    }

    @DeleteMapping
    public void unlikePost(@RequestParam Long postId, @RequestParam Long userId) {
        likeService.unlikePost(postId, userId);
    }

    @GetMapping("/count/{postId}")
    public long getLikeCount(@PathVariable Long postId) {
        return likeService.getLikeCount(postId);
    }
}
