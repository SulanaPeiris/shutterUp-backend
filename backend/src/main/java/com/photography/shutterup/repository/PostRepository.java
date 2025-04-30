package com.photography.shutterup.repository;

import com.photography.shutterup.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {

    // ✅ Custom query to find posts by user ID
    List<Post> findByUserId(Long userId);
}
