package com.photography.shutterup.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "posts")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;             // Short title or caption
    private String description;       // Full description, tips, settings
    private String mediaUrl;           // Image or video URL
    private String mediaType;          // "IMAGE" or "VIDEO"
    private String cameraSettings;    // Example: "ISO 100, f/1.8, 1/250s"
    private String location;          // Where photo/video was taken

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by", referencedColumnName = "id", nullable = false)
    private User user;                // 🔥 Linked User entity (creator)

    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
