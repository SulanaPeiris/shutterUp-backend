package com.photography.shutterup.service;

import com.photography.shutterup.model.User;

import java.util.List;

public interface FollowService {
    void follow(User follower, User followee);
    void unfollow(User follower, User followee);
    boolean isFollowing(User follower, User followee);
    int getFollowersCount(User user);
    int getFollowingCount(User user);
    List<User> getFollowers(User user);
    List<User> getFollowing(User user);
}
