package com.photography.shutterup.service.impl;

import com.photography.shutterup.model.Like;
import com.photography.shutterup.model.Post;
import com.photography.shutterup.model.User;
import com.photography.shutterup.repository.LikeRepository;
import com.photography.shutterup.service.LikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LikeServiceImpl implements LikeService {

    private final LikeRepository likeRepository;

    @Override
    public void likePost(Post post, User user) {
        boolean alreadyLiked = likeRepository.findByPostIdAndUserId(post.getId(), user.getId()).isPresent();
        if (!alreadyLiked) {
            Like like = Like.builder()
                    .post(post)
                    .user(user)
                    .build();
            likeRepository.save(like);
        }
    }

    @Override
    public void unlikePost(Long postId, Long userId) {
        likeRepository.findByPostIdAndUserId(postId, userId)
                .ifPresent(likeRepository::delete);
    }

    @Override
    public long getLikeCount(Long postId) {
        return likeRepository.countByPostId(postId);
    }
}
