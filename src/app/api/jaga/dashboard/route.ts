import { NextResponse } from 'next/server';

// Mock Data Models
const SARAH = { name: "Sarah", role: "Care Giver" };
const UNCLE_TAN = { name: "Uncle Tan", role: "Senior" };

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Decode mock token (base64)
  // In a real app, verify signature
  let userType = "sarah";
  try {
      const token = authHeader.split(' ')[1];
      const decoded = JSON.parse(atob(token));
      userType = decoded.userType;
  } catch (e) {
      console.error("Token decode error", e);
  }

  // --- Mock Data Mocking ---
  const commonData = {
      bonding: { title: "Botanic Gardens Walk", date: "2026-02-15", status: "Upcoming" },
      nutrition: { 
          calories: 1850, 
          protein: 75, 
          carbs: 220, 
          fat: 50,
          hydrationPercent: 80 
      },
      medications: [
          { name: "Metformin", time: "08:00 AM", taken: true },
          { name: "Atorvastatin", time: "08:00 PM", taken: false }
      ],
      appointments: [
          { doctor: "Dr. Lim", location: "Toa Payoh Polyclinic", date: "2026-02-20 10:00 AM", summary: "Stable BP, maintain meds." }
      ],
      promos: [
          { title: "Zoo Family Package", description: "50% off for families", code: "ZOO50" }
      ],
      location: { 
          lat: 1.3521, 
          lng: 103.8198, 
          lastUpdated: "Just now", 
          isSafe: true 
      },
      recentMeals: [
          { id: "m1", imageUrl: "/mock/meal1.jpg", timestamp: "12:30 PM", analysis: "Balanced - Rice & Chicken" }
      ],
      subscriptions: [
          { name: "Tingkat Healthy Low-Salt", status: "Active", renewalDate: "2024-03-01" }
      ]
  };

  if (userType === 'sarah') {
      return NextResponse.json({
          user: SARAH,
          relatedUser: UNCLE_TAN,
          tasks: [
              { id: "1", title: "Buy Groceries", assignee: "Sarah", completed: false, dueDate: "2024-02-10" },
              { id: "2", title: "Book Polyclinic Appt", assignee: "John", completed: true, dueDate: "2024-02-08" }
          ],
          ...commonData
      });
  } else {
      return NextResponse.json({
          user: UNCLE_TAN,
          relatedUser: SARAH,
          tasks: [], // Simplified view for Senior
          ...commonData
      });
  }
}
