package com.photography.shutterup.service;

import com.photography.shutterup.model.LearningProgress;

import java.util.List;

public interface LearningProgressService {
    LearningProgress createProgress(LearningProgress progress);
    List<LearningProgress> getProgressByUserId(Long userId);
}
