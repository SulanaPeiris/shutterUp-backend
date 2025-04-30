package com.photography.shutterup.repository;

import com.photography.shutterup.model.Follow;
import com.photography.shutterup.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.List;

public interface FollowRepository extends JpaRepository<Follow, Long> {
    Optional<Follow> findByFollowerAndFollowee(User follower, User followee);
    List<Follow> findAllByFollowee(User followee);
    List<Follow> findAllByFollower(User follower);

}
