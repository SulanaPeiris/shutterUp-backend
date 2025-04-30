package com.photography.shutterup.controller;

import com.photography.shutterup.model.User;
import com.photography.shutterup.service.FollowService;
import com.photography.shutterup.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/follow")
@RequiredArgsConstructor
public class FollowController {

    private final FollowService followService;
    private final UserService userService;

    @PostMapping("/follow")
    public ResponseEntity<String> follow(@RequestParam Long followerId, @RequestParam Long followeeId) {
        User follower = userService.getUserById(followerId);
        User followee = userService.getUserById(followeeId);

        followService.follow(follower, followee);
        return ResponseEntity.ok("Followed successfully");
    }

    @PostMapping("/unfollow")
    public ResponseEntity<String> unfollow(@RequestParam Long followerId, @RequestParam Long followeeId) {
        User follower = userService.getUserById(followerId);
        User followee = userService.getUserById(followeeId);

        followService.unfollow(follower, followee);
        return ResponseEntity.ok("Unfollowed successfully");
    }

    @GetMapping("/followers/{userId}")
    public ResponseEntity<List<User>> getFollowers(@PathVariable Long userId) {
        User user = userService.getUserById(userId);
        return ResponseEntity.ok(followService.getFollowers(user));
    }

    @GetMapping("/following/{userId}")
    public ResponseEntity<List<User>> getFollowing(@PathVariable Long userId) {
        User user = userService.getUserById(userId);
        return ResponseEntity.ok(followService.getFollowing(user));
    }

    @GetMapping("/isFollowing")
    public ResponseEntity<Boolean> isFollowing(
            @RequestParam Long followerId,
            @RequestParam Long followeeId
    ) {
        User follower = userService.getUserById(followerId);
        User followee = userService.getUserById(followeeId);

        return ResponseEntity.ok(followService.isFollowing(follower, followee));
    }
}
