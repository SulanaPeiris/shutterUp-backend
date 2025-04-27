package com.photography.shutterup.repository;

import com.photography.shutterup.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
}
