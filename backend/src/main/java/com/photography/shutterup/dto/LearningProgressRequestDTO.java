package com.photography.shutterup.dto;

import lombok.Data;

@Data
public class LearningProgressRequestDTO {
    private Long userId;
    private Long tutorialId;
    private String title;
    private String description;
    private Boolean shareToFeed;
}
