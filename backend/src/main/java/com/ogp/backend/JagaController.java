package com.ogp.backend;

import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/jaga")
public class JagaController {

    private final JagaDataService jagaDataService;
    private final TokenService tokenService;

    public JagaController(JagaDataService jagaDataService, TokenService tokenService) {
        this.jagaDataService = jagaDataService;
        this.tokenService = tokenService;
    }

    @GetMapping("/dashboard")
    public DashboardData getDashboard(@RequestHeader("Authorization") String authHeader) {
        User user = getUserFromHeader(authHeader);
        if (user == null) throw new RuntimeException("Unauthorized");

        if ("sarah".equals(user.id())) {
            return jagaDataService.getDashboardForSarah();
        } else {
            return jagaDataService.getDashboardForUncleTan();
        }
    }

    @PostMapping("/report/meds")
    public Map<String, String> reportMeds(@RequestBody Map<String, String> body) {
        String name = body.get("name");
        jagaDataService.logMedication(name);
        return Map.of("status", "success", "message", "Medication " + name + " logged.");
    }

    @PostMapping("/report/meal")
    public Map<String, String> reportMeal(@RequestBody Map<String, String> body) {
        // Mock upload
        jagaDataService.logMeal("mock-image-url");
        return Map.of("status", "success", "message", "Meal logged.");
    }
    
    @PostMapping("/toggle/safety")
    public Map<String, String> toggleSafety(@RequestBody Map<String, Boolean> body) {
        // Mock toggle
        return Map.of("status", "success", "message", "Safety status updated.");
    }

    private User getUserFromHeader(String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            return tokenService.validate(token);
        }
        return null;
    }
}
