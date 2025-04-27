package com.photography.shutterup.dto;

import lombok.Data;

@Data
public class CommentRequestDTO {
    private Long postId;
    private Long userId;
    private String content;
}
