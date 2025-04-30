package com.photography.shutterup.service.impl;

import com.photography.shutterup.model.Follow;
import com.photography.shutterup.model.User;
import com.photography.shutterup.repository.FollowRepository;
import com.photography.shutterup.service.FollowService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FollowServiceImpl implements FollowService {

    private final FollowRepository followRepository;

    @Override
    public void follow(User follower, User followee) {
        if (!follower.equals(followee) && !isFollowing(follower, followee)) {
            Follow follow = Follow.builder().follower(follower).followee(followee).build();
            followRepository.save(follow);
        }
    }

    @Override
    public void unfollow(User follower, User followee) {
        followRepository.findByFollowerAndFollowee(follower, followee)
                .ifPresent(followRepository::delete);
    }


    @Override
    public boolean isFollowing(User follower, User followee) {
        return followRepository.findByFollowerAndFollowee(follower, followee).isPresent();
    }

    @Override
    public int getFollowersCount(User user) {
        return followRepository.findAllByFollowee(user).size();
    }

    @Override
    public int getFollowingCount(User user) {
        return followRepository.findAllByFollower(user).size();
    }

    @Override
    public List<User> getFollowers(User user) {
        return followRepository.findAllByFollowee(user).stream().map(Follow::getFollower).collect(Collectors.toList());
    }

    @Override
    public List<User> getFollowing(User user) {
        return followRepository.findAllByFollower(user).stream().map(Follow::getFollowee).collect(Collectors.toList());
    }
}
