package com.ogp.backend;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.ArrayList;
import java.time.LocalDateTime;

@Service
public class JagaDataService {

    // Mock Data Store
    private final LocationLink uncleTanLocation = new LocationLink(1.3521, 103.8198, "Just now", true);
    private final NutritionStats dailyNutrition = new NutritionStats(1850, 75, 220, 50, 80);
    private final List<MedicationLog> meds = new ArrayList<>(List.of(
        new MedicationLog("Metformin", "08:00 AM", true),
        new MedicationLog("Atorvastatin", "08:00 PM", false)
    ));
    private final List<CareTask> familyTasks = new ArrayList<>(List.of(
        new CareTask("1", "Buy Groceries", "Sarah", false, "2024-02-10"),
        new CareTask("2", "Book Polyclinic Appt", "John", true, "2024-02-08")
    ));
    
    public DashboardData getDashboardForSarah() {
        return new DashboardData(
            TokenService.SARAH,
            TokenService.UNCLE_TAN,
            familyTasks,
            new BondingCommitment("Botanic Gardens Walk", "2024-02-15", "Upcoming"),
            dailyNutrition,
            meds,
            List.of(new MealEntry("m1", "/mock/meal1.jpg", "12:30 PM", "Balanced - Rice & Chicken")),
            List.of(new Subscription("Tingkat Healthy Low-Salt", "Active", "2024-03-01")),
            List.of(new MedicalAppointment("Dr. Lim", "Toa Payoh Polyclinic", "2024-02-20 10:00 AM", "Stable BP, maintain meds.")),
            uncleTanLocation,
            List.of(new Promo("Zoo Family Package", "50% off for families", "ZOO50"))
        );
    }

    public DashboardData getDashboardForUncleTan() {
        return new DashboardData(
            TokenService.UNCLE_TAN,
            TokenService.SARAH, // Primary caregiver
            List.of(), // Uncle Tan sees simplified tasks or none
            new BondingCommitment("Botanic Gardens Walk", "2024-02-15", "Upcoming"),
            dailyNutrition, // He sees his stats
            meds,
            List.of(),
            List.of(),
            List.of(new MedicalAppointment("Dr. Lim", "Toa Payoh Polyclinic", "2024-02-20 10:00 AM", "Bring IC")),
            null, // Doesn't track himself on map usually
            List.of()
        );
    }

    public void logMedication(String name) {
        // Toggle mock logic
        for (int i = 0; i < meds.size(); i++) {
            MedicationLog m = meds.get(i);
            if (m.name().equalsIgnoreCase(name)) {
                meds.set(i, new MedicationLog(m.name(), m.time(), true));
            }
        }
    }

    public void logMeal(String imageUrl) {
        // Mock add
        System.out.println("Meal logged: " + imageUrl);
    }

    public void toggleSafety(boolean isSafe) {
        // Update location status link
    }
}
