package com.photography.shutterup.controller;

import com.photography.shutterup.dto.LearningProgressRequestDTO;
import com.photography.shutterup.dto.LearningProgressResponseDTO;
import com.photography.shutterup.model.LearningProgress;
import com.photography.shutterup.model.Tutorial;
import com.photography.shutterup.model.User;
import com.photography.shutterup.repository.TutorialRepository;
import com.photography.shutterup.repository.UserRepository;
import com.photography.shutterup.service.LearningProgressService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/progress")
@RequiredArgsConstructor
public class LearningProgressController {

    private final LearningProgressService progressService;
    private final UserRepository userRepository;
    private final TutorialRepository tutorialRepository;

    @PostMapping
    public LearningProgressResponseDTO createProgress(@RequestBody LearningProgressRequestDTO request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found!"));
        Tutorial tutorial = tutorialRepository.findById(request.getTutorialId())
                .orElseThrow(() -> new RuntimeException("Tutorial not found!"));

        LearningProgress progress = LearningProgress.builder()
                .user(user)
                .tutorial(tutorial)
                .title(request.getTitle())
                .description(request.getDescription())
                .shareToFeed(request.getShareToFeed())
                .build();

        return mapToResponseDTO(progressService.createProgress(progress));
    }

    @GetMapping("/user/{userId}")
    public List<LearningProgressResponseDTO> getProgressByUser(@PathVariable Long userId) {
        return progressService.getProgressByUserId(userId).stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    private LearningProgressResponseDTO mapToResponseDTO(LearningProgress progress) {
        return LearningProgressResponseDTO.builder()
                .id(progress.getId())
                .userId(progress.getUser().getId())
                .tutorialId(progress.getTutorial().getId())
                .title(progress.getTitle())
                .description(progress.getDescription())
                .shareToFeed(progress.getShareToFeed())
                .createdAt(progress.getCreatedAt())
                .build();
    }
}
