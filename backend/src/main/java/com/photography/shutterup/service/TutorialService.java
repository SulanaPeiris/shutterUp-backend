package com.photography.shutterup.service;

import com.photography.shutterup.model.Tutorial;

import java.util.List;

public interface TutorialService {
    Tutorial createTutorial(Tutorial tutorial);
    List<Tutorial> getAllTutorials();
    Tutorial getTutorialById(Long id);
    Tutorial updateTutorial(Long id, Tutorial updatedTutorial);
    void deleteTutorial(Long id);
}
