package com.photography.shutterup.controller;

import com.photography.shutterup.dto.CommentRequestDTO;
import com.photography.shutterup.dto.CommentResponseDTO;
import com.photography.shutterup.model.Comment;
import com.photography.shutterup.model.Post;
import com.photography.shutterup.model.User;
import com.photography.shutterup.repository.PostRepository;
import com.photography.shutterup.repository.UserRepository;
import com.photography.shutterup.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;
    private final UserRepository userRepository;
    private final PostRepository postRepository;

    @PostMapping
    public CommentResponseDTO createComment(@RequestBody CommentRequestDTO request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found!"));
        Post post = postRepository.findById(request.getPostId())
                .orElseThrow(() -> new RuntimeException("Post not found!"));

        Comment comment = Comment.builder()
                .user(user)
                .post(post)
                .content(request.getContent())
                .build();

        return mapToResponseDTO(commentService.createComment(comment));
    }

    @GetMapping("/post/{postId}")
    public List<CommentResponseDTO> getCommentsByPost(@PathVariable Long postId) {
        return commentService.getCommentsByPostId(postId).stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    // ✅ Single correct update method
    @PutMapping("/{id}")
    public CommentResponseDTO updateComment(@PathVariable Long id,
                                            @RequestParam Long userId,
                                            @RequestBody CommentRequestDTO request) {
        Comment updatedComment = commentService.updateComment(id, userId, request.getContent());
        return mapToResponseDTO(updatedComment);
    }

    // ✅ Single correct delete method
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long id, @RequestParam Long userId) {
        commentService.deleteComment(id, userId);
        return ResponseEntity.noContent().build();
    }

    private CommentResponseDTO mapToResponseDTO(Comment comment) {
        return CommentResponseDTO.builder()
                .id(comment.getId())
                .postId(comment.getPost().getId())
                .userId(comment.getUser().getId())
                .username(comment.getUser().getUsername())
                .content(comment.getContent())
                .createdAt(comment.getCreatedAt())
                .build();
    }
}
