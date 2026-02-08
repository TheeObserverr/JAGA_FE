package com.ogp.backend;

import java.util.List;

// Phase 1: Care-Quest
record CareTask(String id, String title, String assignee, boolean completed, String dueDate) {}
record BondingCommitment(String title, String date, String status) {}

// Phase 1: Jiak Ba Buay (Nutrition)
record NutritionStats(int calories, int protein, int carbs, int fat, int hydrationPercent) {}
record MedicationLog(String name, String time, boolean taken) {}
record MealEntry(String id, String imageUrl, String timestamp, String analysis) {}

// Phase 2: Tingkat & Family Doctor
record Subscription(String name, String status, String renewalDate) {}
record MedicalAppointment(String doctor, String location, String date, String summary) {}

// Phase 3: JAGA-Link & JAGA Together
record LocationLink(double lat, double lng, String lastUpdated, boolean isSafe) {}
record Promo(String title, String description, String code) {}

// Composite Dashboard Data
record DashboardData(
    User user,
    User relatedUser, // For Sarah seeing Uncle Tan
    List<CareTask> tasks,
    BondingCommitment bonding,
    NutritionStats nutrition,
    List<MedicationLog> medications,
    List<MealEntry> recentMeals,
    List<Subscription> subscriptions,
    List<MedicalAppointment> appointments,
    LocationLink location,
    List<Promo> promos
) {}
