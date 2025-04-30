package com.photography.shutterup.service;

import com.photography.shutterup.model.Post;
import com.photography.shutterup.model.User;

public interface LikeService {
    void likePost(Post post, User user);
    void unlikePost(Long postId, Long userId);
    long getLikeCount(Long postId);
    boolean isPostLikedByUser(Long postId, Long userId);
}
