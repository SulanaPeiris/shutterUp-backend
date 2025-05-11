package com.photography.shutterup.controller;

import com.photography.shutterup.model.Post;
import com.photography.shutterup.model.User;
import com.photography.shutterup.repository.PostRepository;
import com.photography.shutterup.repository.UserRepository;
import com.photography.shutterup.service.LikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/likes")
@RequiredArgsConstructor
public class LikeController {

    private final LikeService likeService;
    private final UserRepository userRepository;
    private final PostRepository postRepository;

    @PostMapping
    public ResponseEntity<String> likePost(@RequestParam Long postId, @RequestParam Long userId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found with id: " + postId));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        likeService.likePost(post, user);
        return ResponseEntity.status(HttpStatus.CREATED).body("Post liked");
    }

    @DeleteMapping
    public ResponseEntity<String> unlikePost(@RequestParam Long postId, @RequestParam Long userId) {
        likeService.unlikePost(postId, userId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/count/{postId}")
    public ResponseEntity<Long> getLikeCount(@PathVariable Long postId) {
        return ResponseEntity.ok(likeService.getLikeCount(postId));
    }

    @GetMapping("/isLiked")
    public ResponseEntity<Boolean> isLikedByUser(
            @RequestParam Long postId,
            @RequestParam Long userId) {
        return ResponseEntity.ok(likeService.isPostLikedByUser(postId, userId));
    }


}
