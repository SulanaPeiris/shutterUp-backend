package com.photography.shutterup.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    private String password;

    private String name;

    private String bio;   // <-- ✅ New bio field added here!

    private String profilePicture;

    @Enumerated(EnumType.STRING)
    private Role role;

    private Boolean isBanned = false;

    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    public enum Role {
        USER,
        VERIFIED_USER,
        ADMIN
    }
}
