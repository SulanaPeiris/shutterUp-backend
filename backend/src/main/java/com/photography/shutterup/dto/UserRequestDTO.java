package com.photography.shutterup.dto;

import com.photography.shutterup.model.User.Role;
import lombok.Data;

@Data
public class UserRequestDTO {
    private String email;
    private String username;
    private String password;
    private String name;
    private String bio;
    private Role role;
    private String profilePicture;
    private Boolean isBanned;
}
