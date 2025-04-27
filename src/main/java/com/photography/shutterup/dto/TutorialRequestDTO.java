package com.photography.shutterup.dto;

import lombok.Data;

@Data
public class TutorialRequestDTO {
    private String title;
    private String content;
    private String templateType;
    private Long userId;
}
