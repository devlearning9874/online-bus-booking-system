package com.userservice.controller;

import com.userservice.entity.User;
import com.userservice.repository.UserRepository;
import com.userservice.security.JwtJwtTokenProvider;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final JwtJwtTokenProvider tokenProvider;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // Spring injects your repository and encoder beans via this constructor
    public AuthController(JwtJwtTokenProvider tokenProvider, 
                          UserRepository userRepository, 
                          PasswordEncoder passwordEncoder) {
        this.tokenProvider = tokenProvider;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) {
        String username = loginRequest.get("username");
        String password = loginRequest.get("password");

        // 1. Look up the user record by their unique username
        Optional<User> userOptional = userRepository.findByUsername(username);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            
            // 2. Compare the raw incoming password with the BCrypt hash stored in the DB
            if (passwordEncoder.matches(password, user.getPassword())) {
                
                // 3. If it matches, generate and return the token string!
                String token = tokenProvider.generateToken(username, "ROLE_USER");
                
                Map<String, String> response = new HashMap<>();
                response.put("token_type", "Bearer");
                response.put("access_token", token);
                
                return ResponseEntity.ok(response);
            }
        }

        // Return a clean 401 Unauthorized for either username not found or wrong password
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials supplied.");
    }
}