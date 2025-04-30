package com.photography.shutterup.service.impl;

import com.photography.shutterup.model.LearningProgress;
import com.photography.shutterup.repository.LearningProgressRepository;
import com.photography.shutterup.service.LearningProgressService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LearningProgressServiceImpl implements LearningProgressService {

    private final LearningProgressRepository progressRepository;

    @Override
    public LearningProgress createProgress(LearningProgress progress) {
        return progressRepository.save(progress);
    }

    @Override
    public List<LearningProgress> getProgressByUserId(Long userId) {
        return progressRepository.findByUserId(userId);
    }
}
