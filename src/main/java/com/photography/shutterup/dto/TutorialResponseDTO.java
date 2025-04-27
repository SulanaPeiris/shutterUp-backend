package com.photography.shutterup.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class TutorialResponseDTO {
    private Long id;
    private String title;
    private String content;
    private String templateType;
    private Long userId;
    private LocalDateTime createdAt;
}
