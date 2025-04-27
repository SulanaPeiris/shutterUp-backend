package com.photography.shutterup.controller;

import com.photography.shutterup.dto.TutorialRequestDTO;
import com.photography.shutterup.dto.TutorialResponseDTO;
import com.photography.shutterup.model.Tutorial;
import com.photography.shutterup.model.User;
import com.photography.shutterup.repository.UserRepository;
import com.photography.shutterup.service.TutorialService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/tutorials")
@RequiredArgsConstructor
public class TutorialController {

    private final TutorialService tutorialService;
    private final UserRepository userRepository;

    @PostMapping
    public TutorialResponseDTO createTutorial(@RequestBody TutorialRequestDTO request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found!"));

        Tutorial tutorial = Tutorial.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .templateType(request.getTemplateType())
                .user(user)
                .build();

        return mapToResponseDTO(tutorialService.createTutorial(tutorial));
    }

    @GetMapping
    public List<TutorialResponseDTO> getAllTutorials() {
        return tutorialService.getAllTutorials().stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public TutorialResponseDTO getTutorialById(@PathVariable Long id) {
        return mapToResponseDTO(tutorialService.getTutorialById(id));
    }

    @PutMapping("/{id}")
    public TutorialResponseDTO updateTutorial(@PathVariable Long id, @RequestBody TutorialRequestDTO request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found!"));

        Tutorial updatedTutorial = Tutorial.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .templateType(request.getTemplateType())
                .user(user)
                .build();

        return mapToResponseDTO(tutorialService.updateTutorial(id, updatedTutorial));
    }

    @DeleteMapping("/{id}")
    public void deleteTutorial(@PathVariable Long id) {
        tutorialService.deleteTutorial(id);
    }

    private TutorialResponseDTO mapToResponseDTO(Tutorial tutorial) {
        return TutorialResponseDTO.builder()
                .id(tutorial.getId())
                .title(tutorial.getTitle())
                .content(tutorial.getContent())
                .templateType(tutorial.getTemplateType())
                .userId(tutorial.getUser().getId())
                .createdAt(tutorial.getCreatedAt())
                .build();
    }
}
