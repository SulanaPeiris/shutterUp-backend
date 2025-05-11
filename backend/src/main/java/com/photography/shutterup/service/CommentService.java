package com.photography.shutterup.service;

import com.photography.shutterup.model.Comment;

import java.util.List;

public interface CommentService {

    // Create a new comment
    Comment createComment(Comment comment);

    // Get all comments for a specific post
    List<Comment> getCommentsByPostId(Long postId);

    // Update a comment if the user is the comment owner
    Comment updateComment(Long commentId, Long userId, String newContent);

    /**
     * Delete a comment.
     * - Allowed if the requester is the comment owner.
     * - Or if the requester is the post owner.
     */
    void deleteComment(Long commentId, Long requesterId);
}
