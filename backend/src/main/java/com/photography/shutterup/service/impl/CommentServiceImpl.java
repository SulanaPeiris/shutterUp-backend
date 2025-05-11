package com.photography.shutterup.service.impl;

import com.photography.shutterup.dto.CommentRequestDTO;
import com.photography.shutterup.dto.CommentResponseDTO;
import com.photography.shutterup.exception.ResourceNotFoundException;
import com.photography.shutterup.model.Comment;
import com.photography.shutterup.repository.CommentRepository;
import com.photography.shutterup.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;

    @Override
    public Comment createComment(Comment comment) {
        return commentRepository.save(comment);
    }

    @Override
    public List<Comment> getCommentsByPostId(Long postId) {
        return commentRepository.findByPostId(postId);
    }

    @Override
    public Comment updateComment(Long commentId, Long userId, String newContent) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found with id: " + commentId));

        if (!comment.getUser().getId().equals(userId)) {
            throw new AccessDeniedException("You are not allowed to update this comment!");
        }

        comment.setContent(newContent);
        return commentRepository.save(comment);
    }

    @Override
    public void deleteComment(Long commentId, Long requesterId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found with id: " + commentId));

        boolean isCommentOwner = comment.getUser().getId().equals(requesterId);
        boolean isPostOwner = comment.getPost().getUser().getId().equals(requesterId);

        if (!isCommentOwner && !isPostOwner) {
            throw new AccessDeniedException("You are not allowed to delete this comment!");
        }

        commentRepository.delete(comment);
    }
}
