package com.licenta.login.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtUtil {

//    private static final String SECRET_KEY = "superSecretKey12345678901234567890";
//
//    private SecretKey getSigningKey() {
//        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8));
//    }

    //private static final SecretKey SECRET_KEY = Keys.secretKeyFor(io.jsonwebtoken.SignatureAlgorithm.HS256);

    @Value("${jwt.secret}")
    private String secretKeyBase64;

    private SecretKey getSigningKey() {
        // Decodifică cheia din format Base64 și generează SecretKey
        byte[] keyBytes = Decoders.BASE64.decode(secretKeyBase64);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateAuthToken(String username, Long userId) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + 1000 * 60 * 60 * 24); // Valabil 24 ore

        return Jwts.builder()
                .subject(username)
                .claim("idUsers", userId)
                .issuedAt(now)
                .expiration(expiryDate)
                .signWith(getSigningKey())
                .compact();
    }

    public String generateResetToken(String email) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + 1000 * 60 * 15); // Valabil 15 minute

        //        System.out.println("Generated JWT Token: " + token);
        return Jwts.builder()
                .subject(email)
                .issuedAt(now)
                .expiration(expiryDate)
                .signWith(getSigningKey())
                .compact();
    }

    public Claims extractAllClaims(String token) {
        //        System.out.println("Extracted claims: " + claims);
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public String validateResetToken(String token) {
        return extractAllClaims(token).getSubject();
    }

    public String validateAuthToken(String token) {
        return extractAllClaims(token).getSubject();
    }

    public Date getTokenExpiry(String token) {
        return extractAllClaims(token).getExpiration();
    }

    public Long extractUserId(String token) {
        Claims claims = extractAllClaims(token);
        return claims.get("idUsers", Long.class);
    }

    public boolean isValidToken(String token) {
        try {
            extractAllClaims(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }


}
