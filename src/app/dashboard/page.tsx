"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Define mock types here or import from a shared file if possible
// For simplicity in this demo, defining interfaces here
interface DashboardData {
    user: { name: string; role: string };
    relatedUser: { name: string; role: string } | null;
    finance: any; // specific fields
    location: { lat: number; lng: number; lastUpdated: string; isSafe: boolean } | null;
    bonding: { title: string; date: string; status: string } | null;
    tasks: any[];
    nutrition: any;
    medications: any[];
    appointments: any[];
    promos: any[];
}

export default function Dashboard() {
    const router = useRouter();
    const [userType, setUserType] = useState<string | null>(null);
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const type = localStorage.getItem("userType");
        const token = localStorage.getItem("token");
        if (!type || !token) {
            // Only redirect if completely missing, otherwise let mock login set it
            // For now, if missing, default to login
            if (!type) {
                 router.push("/");
                 return;
            }
        }
        setUserType(type?.toLowerCase() || 'sarah');

        // Fetch data
        fetch("/api/jaga/dashboard", {
            headers: { "Authorization": `Bearer ${token}` }
        })
        .then(res => {
            if (res.ok) return res.json();
            throw new Error("Failed to fetch");
        })
        .then(data => {
            setData(data);
            setLoading(false);
        })
        .catch(err => {
            console.error(err);
            // Fallback for demo UI without backend
            setLoading(false);
            setData(getMockData(type)); 
        });

    }, [router]);



    if (loading) return <div className="min-h-screen flex items-center justify-center bg-secondary"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>;

    if (!data) return <div>Error loading data.</div>;

    return (
        <div className="min-h-screen bg-secondary pb-20">
            {/* Header */}

            <main className="max-w-7xl mx-auto p-4 space-y-6">
                {userType === "sarah" ? <SarahDashboard data={data} /> : <UncleTanDashboard data={data} />}
            </main>
        </div>
    );
}

// --- Specific Views ---

// --- Specific Views ---
import Link from "next/link";

function SarahDashboard({ data }: { data: DashboardData }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Column 1: Senior Status & Monitoring */}
            <div className="space-y-6">
                {/* Senior Status Card (Hero) */}
                <Link href="/jaga-link" className="block transform transition hover:scale-[1.02]">
                    <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100 relative overflow-hidden h-full">
                        <div className="absolute top-0 left-0 w-1 h-full bg-success"></div>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Monitoring</p>
                                <h2 className="text-2xl font-bold text-gray-800">{data.relatedUser?.name}</h2>
                                <p className="text-sm text-gray-500">Last Update: {data.location?.lastUpdated ?? 'Just now'}</p>
                            </div>
                            {data.location?.isSafe && (
                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                    SAFE
                                </span>
                            )}
                        </div>
                        
                        {/* JAGA-Link Map Placeholder */}
                        <div className="w-full h-48 bg-gray-100 rounded-lg mb-4 flex items-center justify-center relative group cursor-pointer hover:bg-gray-200 transition">
                            <span className="text-gray-400 text-sm font-medium">📍 View Live JAGA-Link</span>
                        </div>
                    </div>
                </Link>

                <div className="grid grid-cols-2 gap-4">
                    <Link href="/jiak-ba-buay" className="block transform transition hover:scale-[1.02]">
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 h-full text-center">
                            <p className="text-xs text-gray-500 mb-1">Jiak Ba Buay</p>
                            <p className="text-2xl font-bold text-primary">{data.nutrition?.calories ?? 0}</p>
                            <p className="text-xs text-gray-400 mb-2">kcal today</p>
                            <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-primary h-full" style={{width: '75%'}}></div>
                            </div>
                        </div>
                    </Link>
                    <Link href="/caregiver/meds" className="block transform transition hover:scale-[1.02]">
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 h-full text-center">
                            <p className="text-xs text-gray-500 mb-1">Meds Tracker</p>
                            <p className="text-2xl font-bold text-gray-800">1/2</p>
                            <p className="text-[10px] text-red-500 font-medium">Next: 8 PM</p>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Column 2: Tasks & Appointments */}
            <div className="space-y-6">
                {/* Care-Quest Tasks */}
                <Link href="/care-quest" className="block transform transition hover:scale-[1.02] h-full">
                    <div className="bg-white rounded-2xl shadow-sm p-4 h-full border border-gray-100">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-lg text-gray-800">Family Care-Quest</h3>
                            <span className="text-primary text-xs font-bold bg-primary/10 px-2 py-1 rounded">View Board →</span>
                        </div>
                        <div className="space-y-3">
                            {data.tasks.map((task: any, i: number) => (
                                <div key={i} className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg">
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${task.completed ? 'bg-primary border-primary' : 'border-gray-300'}`}>
                                        {task.completed && <div className="w-2 h-2 bg-white rounded-full"></div>}
                                    </div>
                                    <div className="flex-1">
                                        <p className={`text-sm font-medium ${task.completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>{task.title}</p>
                                        <p className="text-xs text-gray-400">{task.assignee}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Link>

            </div>

            {/* Column 3: Social & Lifestyle */}
            <div className="space-y-6">
                {/* Kampung Leaderboard Widget */}
                <Link href="/senior/leaderboard" className="block transform transition hover:scale-[1.02]">
                    <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl shadow-sm p-4 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-20 text-6xl">🏆</div>
                        <h3 className="font-bold text-lg mb-1">Kampung Leaderboard</h3>
                        <p className="text-yellow-100 text-sm mb-3">Uncle Tan is doing great!</p>
                        <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-bold text-sm">Rank #2</span>
                                <span className="text-xs">1,250 Pts</span>
                            </div>
                            <div className="w-full bg-black/20 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-white h-full w-3/4"></div>
                            </div>
                        </div>
                    </div>
                </Link>

                {/* Quick Actions */}
                <div className="bg-purple-50 rounded-2xl p-4 border border-purple-100">
                    <h3 className="font-bold text-purple-900 mb-2">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-2">
                        <button 
                            onClick={() => alert("Calling Uncle Tan...")}
                            className="bg-white p-2 rounded-lg text-xs font-bold text-purple-700 shadow-sm hover:bg-purple-50 transition flex items-center justify-center gap-1"
                        >
                            📞 Call
                        </button>
                        <button 
                            onClick={() => alert("Sending ❤️ to Uncle Tan!")}
                            className="bg-white p-2 rounded-lg text-xs font-bold text-purple-700 shadow-sm hover:bg-purple-50 transition flex items-center justify-center gap-1"
                        >
                            ❤️ Love
                        </button>
                    </div>
                </div>

                {/* Family Doctor */}
                <Link href="/family-doctor" className="block transform transition hover:scale-[1.02]">
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-lg">👨‍⚕️</span>
                            <p className="text-xs text-blue-700 font-bold uppercase">Next Appointment</p>
                        </div>
                        {data.appointments && data.appointments[0] ? (
                            <div>
                                <p className="font-bold text-blue-900">{data.appointments[0].doctor}</p>
                                <p className="text-xs text-blue-600">20 Feb • {data.appointments[0].location}</p>
                            </div>
                        ) : <p className="text-sm text-blue-800">No upcoming appointments</p>}
                    </div>
                </Link>

                {/* Tingkat & Bonding Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <Link href="/tingkat" className="block transform transition hover:scale-[1.02]">
                        <div className="bg-orange-50 p-3 rounded-xl border border-orange-100 h-full">
                            <span className="text-lg block mb-1">🍱</span>
                            <p className="text-xs text-orange-700 font-bold uppercase leading-tight">Tingkat<br/>Delivery</p>
                        </div>
                    </Link>
                    <Link href="/jaga-together" className="block transform transition hover:scale-[1.02]">
                        <div className="bg-pink-50 p-3 rounded-xl border border-pink-100 h-full">
                            <span className="text-lg block mb-1">❤️</span>
                            <p className="text-xs text-pink-700 font-bold uppercase leading-tight">Family<br/>Bonding</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

function UncleTanDashboard({ data }: { data: DashboardData }) {
    const handleAction = (type: string) => {
        alert("Reported: " + type);
        // In real app, call backend
    };

    return (
        <div className="max-w-md mx-auto space-y-6">
            {/* Greeting */}
            <div className="text-center py-6">
                <p className="text-gray-500">Good Morning,</p>
                <h2 className="text-4xl font-bold text-gray-800">{data.user.name}</h2>
            </div>

            {/* Dignity Toggle / Safety Status */}
            <div className="bg-white rounded-3xl shadow-lg p-8 text-center border-b-8 border-green-500">
                <div className="w-24 h-24 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-4">
                     <Link href="/jaga-link"><span className="text-4xl">👍</span></Link>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">I am Safe</h3>
                <p className="text-gray-500">Sharing location with Sarah</p>
                <Link href="/jaga-link" className="inline-block mt-6 px-6 py-3 bg-gray-100 text-gray-600 rounded-full font-bold text-sm touch-manipulation">
                    Turn Off (Dignity Toggle)
                </Link>
            </div>

            {/* Daily Actions Grid */}
            <div className="grid grid-cols-2 gap-4">
                 <Link href="/senior/meal-log" className="block">
                    <button className="w-full bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center gap-3 hover:bg-orange-50 transition h-full">
                        <span className="text-4xl">🍚</span>
                        <span className="font-bold text-gray-800 text-lg">I Ate</span>
                    </button>
                </Link>

                <Link href="/senior/med-log" className="block">
                    <button className="w-full bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center gap-3 hover:bg-blue-50 transition h-full">
                        <span className="text-4xl">💊</span>
                        <span className="font-bold text-gray-800 text-lg">My Meds</span>
                    </button>
                </Link>

                 <Link href="/care-quest" className="block">
                    <button className="w-full bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center gap-3 hover:bg-green-50 transition h-full">
                        <span className="text-4xl">📅</span>
                        <span className="font-bold text-gray-800 text-lg">Calendar</span>
                    </button>
                </Link>

                <Link href="/senior/leaderboard" className="block">
                    <button className="w-full bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center gap-3 hover:bg-yellow-50 transition h-full">
                        <span className="text-4xl">🏆</span>
                        <span className="font-bold text-gray-800 text-lg">Leaderboard</span>
                    </button>
                </Link>
            </div>

            {/* Next Event */}
            <Link href="/care-quest">
                <div className="bg-primary/10 rounded-2xl p-6 text-center hover:bg-primary/20 transition">
                    <p className="text-primary font-bold uppercase tracking-wider text-xs mb-2">Next Family Outing</p>
                    <h3 className="text-xl font-bold text-gray-800">{data.bonding?.title}</h3>
                    <p className="text-gray-600">{data.bonding?.date}</p>
                </div>
            </Link>
        </div>
    );
}

// Fallback Mock Data Generator
function getMockData(type: string | any): DashboardData {
    // ... replicate backend data structure for fallback ...
     const common = {
        bonding: { title: "Botanic Gardens Walk", date: "2024-02-15", status: "Upcoming" },
        nutrition: { calories: 1850 },
        medications: [{ name: "Metformin", time: "08:00 AM", taken: true }],
        appointments: [{ doctor: "Dr. Lim", location: "Polyclinic", summary: "Checkup" }],
        promos: [{ title: "Zoo Pass", description: "50% Off" }],
        location: { lat: 1.35, lng: 103.8, lastUpdated: "Now", isSafe: true },
        finance: {}
    };

    if (type === "sarah") {
        return {
            user: { name: "Sarah", role: "Care Giver" },
            relatedUser: { name: "Uncle Tan", role: "Senior" },
            tasks: [{ title: "Buy Groceries", assignee: "Sarah", completed: false }, { title: "Book Appt", assignee: "John", completed: true }],
            ...common
        };
    } else {
         return {
            user: { name: "Uncle Tan", role: "Senior" },
            relatedUser: { name: "Sarah", role: "Care Giver" },
            tasks: [],
            ...common
        };
    }
}
