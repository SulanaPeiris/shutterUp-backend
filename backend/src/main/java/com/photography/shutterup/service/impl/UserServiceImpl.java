package com.photography.shutterup.service.impl;

import com.photography.shutterup.exception.ResourceNotFoundException;
import com.photography.shutterup.model.User;
import com.photography.shutterup.repository.UserRepository;
import com.photography.shutterup.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
    }

    @Override
    public User updateUser(Long id, User updatedUser) {
        User existingUser = getUserById(id);

        existingUser.setEmail(updatedUser.getEmail());
        existingUser.setPassword(updatedUser.getPassword());
        existingUser.setName(updatedUser.getName());
        existingUser.setBio(updatedUser.getBio());
        existingUser.setRole(updatedUser.getRole());
        existingUser.setProfilePicture(updatedUser.getProfilePicture());
        existingUser.setIsBanned(updatedUser.getIsBanned());

        return userRepository.save(existingUser);
    }

    @Override
    public void deleteUser(Long id) {
        User user = getUserById(id);
        userRepository.delete(user);
    }
}
