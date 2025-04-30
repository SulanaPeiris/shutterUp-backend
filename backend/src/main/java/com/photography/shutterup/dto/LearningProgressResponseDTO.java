package com.photography.shutterup.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class LearningProgressResponseDTO {
    private Long id;
    private Long userId;
    private Long tutorialId;
    private String title;
    private String description;
    private Boolean shareToFeed;
    private LocalDateTime createdAt;
}
