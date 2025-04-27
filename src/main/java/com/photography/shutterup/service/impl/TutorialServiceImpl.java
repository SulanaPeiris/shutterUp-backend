package com.photography.shutterup.service.impl;

import com.photography.shutterup.exception.ResourceNotFoundException;
import com.photography.shutterup.model.Tutorial;
import com.photography.shutterup.repository.TutorialRepository;
import com.photography.shutterup.service.TutorialService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TutorialServiceImpl implements TutorialService {

    private final TutorialRepository tutorialRepository;

    @Override
    public Tutorial createTutorial(Tutorial tutorial) {
        return tutorialRepository.save(tutorial);
    }

    @Override
    public List<Tutorial> getAllTutorials() {
        return tutorialRepository.findAll();
    }

    @Override
    public Tutorial getTutorialById(Long id) {
        return tutorialRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tutorial not found with id: " + id));
    }

    @Override
    public Tutorial updateTutorial(Long id, Tutorial updatedTutorial) {
        Tutorial tutorial = tutorialRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tutorial not found with id: " + id));

        tutorial.setTitle(updatedTutorial.getTitle());
        tutorial.setContent(updatedTutorial.getContent());
        tutorial.setTemplateType(updatedTutorial.getTemplateType());

        return tutorialRepository.save(tutorial);
    }

    @Override
    public void deleteTutorial(Long id) {
        Tutorial tutorial = tutorialRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tutorial not found with id: " + id));

        tutorialRepository.delete(tutorial);
    }
}
