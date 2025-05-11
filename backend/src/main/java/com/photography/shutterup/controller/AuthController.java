package com.photography.shutterup.controller;

import com.photography.shutterup.model.User;
import com.photography.shutterup.repository.UserRepository;
import com.photography.shutterup.service.FollowService;
import com.photography.shutterup.util.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final FollowService followService;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already in use!");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(User.Role.USER);
        user.setIsBanned(false);
        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully!");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String email, @RequestParam String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (Boolean.TRUE.equals(user.getIsBanned())) {
            return ResponseEntity.status(403).body("Your account has been banned.");
        }

        if (!passwordEncoder.matches(password, user.getPassword())) {
            return ResponseEntity.status(401).body("Invalid credentials.");
        }

        // ✅ Use followService to get follower count
        int followerCount = followService.getFollowersCount(user);

        // ✅ Promote if eligible
        if (user.getRole() == User.Role.USER && followerCount >= 2) {
            user.setRole(User.Role.VERIFIED_USER);
            userRepository.save(user);
        }

        String token = jwtUtils.generateToken(user.getEmail());

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("id", user.getId());
        response.put("username", user.getUsername());
        response.put("email", user.getEmail());
        response.put("name", user.getName());
        response.put("bio", user.getBio());
        response.put("profilePicture", user.getProfilePicture());
        response.put("followers", followerCount);
        response.put("role", user.getRole());

        return ResponseEntity.ok(response);
    }
}
