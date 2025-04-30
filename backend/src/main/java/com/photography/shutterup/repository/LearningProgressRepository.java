package com.photography.shutterup.repository;

import com.photography.shutterup.model.LearningProgress;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LearningProgressRepository extends JpaRepository<LearningProgress, Long> {
    List<LearningProgress> findByUserId(Long userId);
}
