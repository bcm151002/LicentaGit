package com.licenta.login.Controller;

import com.licenta.login.Model.User;
import com.licenta.login.Repository.UserRepository;
import com.licenta.login.Service.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/login")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping
    public ResponseEntity<?> login(@RequestBody User user) {
        Map<String, Object> response = new HashMap<>();
        try {
            User foundUser = userRepository.findByUsername(user.getUsername())
                    .orElseThrow(() -> new RuntimeException("Utilizatorul nu a fost găsit!"));

            if (!passwordEncoder.matches(user.getPassword(), foundUser.getPassword())) {
                response.put("success", false);
                response.put("message", "Datele de autentificare sunt invalide!");
                return ResponseEntity.status(401).body(response);
            }

            // Generează token-ul JWT
            String token = jwtUtil.generateAuthToken(foundUser.getUsername(), foundUser.getIdUsers());

            // Trimite token-ul și mesajul de succes în răspuns
            response.put("success", true);
            response.put("message", "Autentificare reușită!");
            response.put("token", token);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.status(401).body(response);
        }
    }

}
