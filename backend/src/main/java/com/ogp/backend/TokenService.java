package com.ogp.backend;

import org.springframework.stereotype.Service;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class TokenService {
    private final Map<String, User> tokens = new ConcurrentHashMap<>();

    // Pre-defined users
    public static final User SARAH = new User("sarah", "Sarah", "Care Giver", "A diligent care giver.");
    public static final User UNCLE_TAN = new User("uncle_tan", "Uncle Tan", "Senior", "A friendly senior citizen.");

    public String login(String userType) {
        String token = UUID.randomUUID().toString();
        if ("sarah".equalsIgnoreCase(userType)) {
            tokens.put(token, SARAH);
        } else if ("uncle_tan".equalsIgnoreCase(userType)) {
            tokens.put(token, UNCLE_TAN);
        } else {
            throw new IllegalArgumentException("Invalid user type");
        }
        return token;
    }

    public User validate(String token) {
        return tokens.get(token);
    }
}
