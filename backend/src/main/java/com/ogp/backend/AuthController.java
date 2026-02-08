package com.ogp.backend;

import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final TokenService tokenService;

    public AuthController(TokenService tokenService) {
        this.tokenService = tokenService;
    }

    @PostMapping("/mock-login")
    public Map<String, String> login(@RequestBody Map<String, String> body) {
        String userType = body.get("userType");
        String token = tokenService.login(userType);
        return Map.of("token", token);
    }

    @GetMapping("/me")
    public User me(@RequestHeader("Authorization") String authHeader) {
        // Simple extraction: "Bearer <token>"
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            return tokenService.validate(token);
        }
        return null;
    }
}
