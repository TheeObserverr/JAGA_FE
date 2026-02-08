"use client";
import PageHeader from "../components/PageHeader";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  /* eslint-disable react-hooks/exhaustive-deps */
  /* eslint-disable react-hooks/exhaustive-deps */
  const [user, setUser] = useState({ name: "", email: "", role: "", phone: "", notifications: true, largeText: false });

  useEffect(() => {
    const type = localStorage.getItem("userType");
    
    if (type?.toLowerCase() === "uncle_tan" || type?.toLowerCase() === "uncle tan") {
        setUser({ name: "Tan Ah Hock", email: "ahhock88@example.com", role: "Senior", phone: "+65 6789 1234", notifications: true, largeText: false });
    } else {
        // Default to Sarah
        setUser({ name: "Sarah Tan", email: "sarah.tan@example.com", role: "Caregiver", phone: "+65 9123 4567", notifications: true, largeText: false });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white px-6 pt-8 pb-12 rounded-b-[3rem] shadow-sm mb-6">
         <PageHeader title="My Profile" />
         <div className="flex flex-col items-center mt-4">
            <div className="w-24 h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center text-4xl font-bold mb-4 border-4 border-white shadow-lg">
                {user.name.charAt(0)}
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>
            <span className="mt-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {user.role}
            </span>
         </div>
      </div>

      <div className="max-w-xl mx-auto px-6 space-y-6">
        {/* Personal Details */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-800">Personal Details</h3>
                <button className="text-primary text-sm font-bold">Edit</button>
            </div>
            <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-gray-50">
                    <span className="text-gray-500 text-sm">Phone</span>
                    <span className="font-medium text-gray-800">{user.phone}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-50">
                    <span className="text-gray-500 text-sm">Emergency Contact</span>
                    <span className="font-medium text-gray-800">David Tan (Son)</span>
                </div>
                 <div className="flex justify-between py-2 border-b border-gray-50">
                    <span className="text-gray-500 text-sm">Language</span>
                    <span className="font-medium text-gray-800">English, Hokkien</span>
                </div>
            </div>
        </div>

        {/* Preferences */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="font-bold text-gray-800 mb-4">App Preferences</h3>
            <div className="space-y-4">
                 <div className="flex justify-between items-center">
                    <span className="text-gray-700">Notifications</span>
                    <button 
                        onClick={() => {
                            const newState = !user.notifications;
                            setUser({...user, notifications: newState});
                            alert(`Notifications turned ${newState ? 'ON' : 'OFF'}`);
                        }}
                        className={`w-10 h-6 rounded-full relative transition-colors ${user.notifications ? 'bg-green-500' : 'bg-gray-300'}`}
                    >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${user.notifications ? 'right-1' : 'left-1'}`}></div>
                    </button>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-700">Large Text Mode</span>
                    <button 
                        onClick={() => {
                            const newState = !user.largeText;
                            setUser({...user, largeText: newState});
                            alert(`Large Text Mode turned ${newState ? 'ON' : 'OFF'}`);
                        }}
                        className={`w-10 h-6 rounded-full relative transition-colors ${user.largeText ? 'bg-green-500' : 'bg-gray-300'}`}
                    >
                         <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${user.largeText ? 'right-1' : 'left-1'}`}></div>
                    </button>
                </div>
            </div>
        </div>

        <button 
            onClick={() => {
                const current = localStorage.getItem('userType');
                const next = current?.toLowerCase() === 'sarah' ? 'Uncle Tan' : 'Sarah';
                localStorage.setItem('userType', next);
                window.location.href = '/dashboard';
            }}
            className="w-full bg-primary/10 text-primary font-bold py-4 rounded-2xl hover:bg-primary/20 transition mb-4"
        >
            Switch User 🔄
        </button>

        <button 
            onClick={() => router.push('/')}
            className="w-full bg-red-50 text-red-600 font-bold py-4 rounded-2xl hover:bg-red-100 transition mb-8"
        >
            Log Out
        </button>
      </div>
    </div>
  );
}
