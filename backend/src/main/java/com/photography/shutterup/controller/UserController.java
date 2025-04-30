package com.photography.shutterup.controller;

import com.photography.shutterup.dto.UserRequestDTO;
import com.photography.shutterup.dto.UserResponseDTO;
import com.photography.shutterup.model.User;
import com.photography.shutterup.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping
    public UserResponseDTO createUser(@RequestBody UserRequestDTO request) {
        User user = mapToUser(request);
        User createdUser = userService.createUser(user);
        return mapToResponseDTO(createdUser);
    }

    @GetMapping
    public List<UserResponseDTO> getAllUsers() {
        return userService.getAllUsers().stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public UserResponseDTO getUserById(@PathVariable Long id) {
        return mapToResponseDTO(userService.getUserById(id));
    }

    @PutMapping("/{id}")
    public UserResponseDTO updateUser(@PathVariable Long id, @RequestBody UserRequestDTO request) {
        User user = mapToUser(request);
        User updatedUser = userService.updateUser(id, user);
        return mapToResponseDTO(updatedUser);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }

    private User mapToUser(UserRequestDTO dto) {
        return User.builder()
                .email(dto.getEmail())
                .password(dto.getPassword())
                .name(dto.getName())
                .bio(dto.getBio())
                .role(dto.getRole())
                .profilePicture(dto.getProfilePicture())
                .isBanned(dto.getIsBanned())
                .build();
    }

    private UserResponseDTO mapToResponseDTO(User user) {
        return UserResponseDTO.builder()
                .id(user.getId())
                .email(user.getEmail())
                .name(user.getName())
                .bio(user.getBio())
                .role(user.getRole())
                .isBanned(user.getIsBanned())
                .createdAt(user.getCreatedAt())
                .build();
    }
}
