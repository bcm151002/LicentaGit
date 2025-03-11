package com.licenta.login.Controller;

import com.licenta.login.DTO.ResetPasswordRequest;
import com.licenta.login.Model.User;
import com.licenta.login.Service.EmailService;
import com.licenta.login.Service.JwtUtil;
import com.licenta.login.Service.UserService;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/reset-password")
public class ResetPasswordController {
    private final UserService userService;
    private final EmailService emailService;
    private final JwtUtil jwtUtil;

    public ResetPasswordController(UserService userService, EmailService emailService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.emailService = emailService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/request")
    public ResponseEntity<Map<String, Object>> requestPasswordReset(@RequestBody Map<String, String> payload) {
        Map<String, Object> response = new HashMap<>();
        String email = payload.get("email");

        if (email == null || email.isEmpty()) {
            response.put("success", false);
            response.put("message", "Email-ul este necesar.");
            return ResponseEntity.ok(response); // Trimit întotdeauna 200
        }

        if (!isValidEmail(email)) {
            response.put("success", false);
            response.put("message", "Email-ul trebuie să fie în formatul prenume.nume@mta.ro.");
            return ResponseEntity.ok(response); // Trimit întotdeauna 200
        }

        Optional<User> userOpt = userService.findByEmail(email);
        if (userOpt.isEmpty()) {
            response.put("success", false);
            response.put("message", "Adresa de email nu este validă.");
            return ResponseEntity.ok(response); // Trimit întotdeauna 200
        }

        User user = userOpt.get();

        // Verifică dacă există deja un token valid
        if (user.getResetToken() != null && user.getResetTokenExpiry() != null) {
            if (user.getResetTokenExpiry().after(new Date())) {
                response.put("success", false);
                response.put("message", "Un link de resetare a fost deja trimis. Așteptați până expiră sau folosiți-l pe cel deja trimis.");
                return ResponseEntity.ok(response); // Trimit întotdeauna 200
            }
        }

        // Generează un nou token
        String resetToken = jwtUtil.generateResetToken(email);
        user.setResetToken(resetToken);
        user.setResetTokenExpiry(jwtUtil.getTokenExpiry(resetToken));
        user.setResetTokenAvailability(false);

        userService.saveUser(user); // Salvează tokenul în baza de date

        try {
            emailService.sendResetPasswordEmail(email, resetToken);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Trimiterea email-ului a eșuat.");
            return ResponseEntity.ok(response); // Trimit întotdeauna 200
        }

        response.put("success", true);
        response.put("message", "Un email pentru resetarea parolei a fost trimis.");
        return ResponseEntity.ok(response);
    }


    // Validare email
    private boolean isValidEmail(String email) {

        String emailRegex = "^[a-zA-Z]+\\.[a-zA-Z]+@mta\\.ro$";
        return email.matches(emailRegex);
    }

    @PostMapping("/reset")
    public ResponseEntity<Map<String, Object>> resetPassword(@RequestBody ResetPasswordRequest request) {
        Map<String, Object> response = new HashMap<>();
        try {
            // Validează tokenul și extrage email-ul
            String email = jwtUtil.validateResetToken(request.getToken());

            // Găsește utilizatorul
            User user = userService.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Utilizatorul nu a fost găsit!"));

            // Verifică dacă tokenul a fost deja folosit
            if (user.isResetTokenAvailability()) {
                response.put("success", false);
                response.put("message", "Acest link de resetare a fost deja utilizat.");
                return ResponseEntity.ok(response);
            }

            // Validează parola nouă
            String validationMessage = getPasswordValidationMessage(request.getNewPassword());
            if (validationMessage != null) {
                response.put("success", false);
                response.put("message", validationMessage);
                return ResponseEntity.ok(response);
            }

            // Actualizează parola
            userService.updatePassword(email, request.getNewPassword());

            // Marchează tokenul ca folosit
            user.setResetTokenAvailability(true);
            userService.saveUser(user);

            response.put("success", true);
            response.put("message", "Parola a fost actualizată cu succes.");
            return ResponseEntity.ok(response);
        } catch (ExpiredJwtException e) {
            response.put("success", false);
            response.put("message", "Tokenul a expirat.");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Tokenul este invalid sau a apărut o altă eroare.");
            return ResponseEntity.ok(response);
        }
    }

    private String getPasswordValidationMessage(String password) {
        if (password == null) {
            return "Password cannot be null.";
        }
        if (password.length() < 8) {
            return "Password must be at least 8 characters long.";
        }
        if (!password.matches(".*[A-Z].*")) {
            return "Password must contain at least one uppercase letter.";
        }
        if (!password.matches(".*[a-z].*")) {
            return "Password must contain at least one lowercase letter.";
        }
        if (!password.matches(".*\\d.*")) {
            return "Password must contain at least one digit.";
        }
        if (!password.matches(".*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?].*")) {
            return "Password must contain at least one special character (!@#$%^&* etc.).";
        }
        return null;
    }

}