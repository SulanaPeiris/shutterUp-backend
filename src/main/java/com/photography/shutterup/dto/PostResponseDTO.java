package com.photography.shutterup.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class PostResponseDTO {
    private Long id;
    private String title;
    private String description;
    private String mediaUrl;
    private String mediaType;
    private String cameraSettings;
    private String location;
    private Long userId;          // 🔥 Show userId
    private LocalDateTime createdAt;
}
