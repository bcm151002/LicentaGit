package com.licenta.student_academic_data.Controller;

import com.licenta.login.Service.JwtUtil;
import com.licenta.student_academic_data.Model.DatePersonale;
import com.licenta.student_academic_data.Model.DateScolarizare;
import com.licenta.student_academic_data.Model.UserAD;
import com.licenta.student_academic_data.Service.UserServiceAD;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserServiceAD userServiceAD;
    private final JwtUtil jwtUtil;

    @Autowired
    public UserController(UserServiceAD userServiceAD, JwtUtil jwtUtil) {
        this.userServiceAD = userServiceAD;
        this.jwtUtil = jwtUtil;
    }

    private Long extractUserIdFromToken(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new UnauthorizedException("Authorization header missing or malformed");
        }

        String token = authHeader.substring(7); // Remove "Bearer "

        if (!jwtUtil.isValidToken(token)) {
            throw new UnauthorizedException("Invalid token");
        }

        return jwtUtil.extractUserId(token);
    }

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public static class UnauthorizedException extends RuntimeException {
        public UnauthorizedException(String message) {
            super(message);
        }
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    public static class UserNotFoundException extends RuntimeException {
        public UserNotFoundException(String message) {
            super(message);
        }
    }

    @GetMapping("/date-personale")
    public ResponseEntity<?> getDatePersonale(@RequestHeader("Authorization") String authHeader) {
        Long userId = extractUserIdFromToken(authHeader);

        return userServiceAD.getUserById(userId)
                .flatMap(userServiceAD::getDatePersonaleByUser)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new UserNotFoundException("User not found or no personal data available"));
    }

    @GetMapping("/date-scolarizare")
    public ResponseEntity<?> getDateScolarizare(@RequestHeader("Authorization") String authHeader) {
        Long userId = extractUserIdFromToken(authHeader);

        return userServiceAD.getUserById(userId)
                .flatMap(userServiceAD::getDateScolarizareByUser)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
