package com.photography.shutterup.dto;

import lombok.Data;

@Data
public class PostRequestDTO {
    private String title;
    private String description;
    private String mediaUrl;
    private String mediaType;
    private String cameraSettings;
    private String location;
    private Long userId; // 🔥 Accept userId from client
}
