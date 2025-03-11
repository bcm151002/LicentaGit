package com.licenta.login.Service;

import com.licenta.login.Model.User;
import com.licenta.login.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public void updatePassword(String email, String newPassword) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found!"));

        String encodedPassword = passwordEncoder.encode(newPassword);
        user.setPassword(encodedPassword);

        userRepository.save(user);
    }

    public void saveUser(User user) {
        userRepository.save(user);
    }

    public Optional<User> getUserById(Long userId) {
        return userRepository.findById(userId);
    }
}
