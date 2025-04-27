package com.photography.shutterup.controller;

import com.photography.shutterup.dto.CommentRequestDTO;
import com.photography.shutterup.dto.CommentResponseDTO;
import com.photography.shutterup.model.Comment;
import com.photography.shutterup.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping
    public CommentResponseDTO createComment(@RequestBody CommentRequestDTO request) {
        Comment comment = mapToComment(request);
        Comment createdComment = commentService.createComment(comment);
        return mapToResponseDTO(createdComment);
    }

    @GetMapping("/post/{postId}")
    public List<CommentResponseDTO> getCommentsByPostId(@PathVariable Long postId) {
        return commentService.getCommentsByPostId(postId).stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @PutMapping("/{id}")
    public CommentResponseDTO updateComment(@PathVariable Long id, @RequestParam Long userId, @RequestBody CommentRequestDTO request) {
        Comment updatedComment = commentService.updateComment(id, userId, request.getContent());
        return mapToResponseDTO(updatedComment);
    }

    @DeleteMapping("/{id}")
    public void deleteComment(@PathVariable Long id, @RequestParam Long userId) {
        commentService.deleteComment(id, userId);
    }

    private Comment mapToComment(CommentRequestDTO dto) {
        return Comment.builder()
                .postId(dto.getPostId())
                .userId(dto.getUserId())
                .content(dto.getContent())
                .build();
    }

    private CommentResponseDTO mapToResponseDTO(Comment comment) {
        return CommentResponseDTO.builder()
                .id(comment.getId())
                .postId(comment.getPostId())
                .userId(comment.getUserId())
                .content(comment.getContent())
                .createdAt(comment.getCreatedAt())
                .build();
    }
}
