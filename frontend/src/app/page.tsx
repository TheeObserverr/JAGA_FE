"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [showRoleSelector, setShowRoleSelector] = useState(false);

  const handleQrClick = () => {
    setShowRoleSelector(true);
  };

  const loginAs = async (userType: string) => {
    try {
      const res = await fetch("/api/auth/mock-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userType }),
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("userType", userType); // Store for simple frontend logic
        router.push("/dashboard");
      } else {
        alert("Login failed");
      }
    } catch (e) {
      console.error(e);
      // Fallback for demo if backend not running yet
      localStorage.setItem("userType", userType);
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-secondary relative overflow-hidden font-sans">
      
      {/* Red Bar (Singpass feel) */}
      <div className="absolute top-0 w-full h-16 bg-[#E13637] flex items-center px-6">
        <h1 className="text-white font-bold text-xl tracking-wide">Singpass</h1>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center z-10 mt-12">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">Log in with Singpass</h2>
        <p className="text-gray-500 mb-8">Your trusted digital identity</p>

        <div className="relative group cursor-pointer inline-block" onClick={handleQrClick}>
            <div className={`transition-all duration-300 ${showRoleSelector ? 'blur-sm opacity-50' : 'blur-0 opacity-100'}`}>
                {/* Simulated QR Code */}
                <div className="w-64 h-64 bg-gray-900 mx-auto rounded-lg flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-white m-2 rounded">
                        <div className="w-full h-full grid grid-cols-6 grid-rows-6 gap-1 p-4">
                             {[...Array(36)].map((_, i) => (
                                <div key={i} className={`bg-black ${Math.random() > 0.5 ? 'opacity-100' : 'opacity-0'}`}></div>
                             ))}
                        </div>
                        {/* Center Logo Placeholder */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-white p-2 rounded-full">
                                <span className="text-[#E13637] font-bold">SG</span>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="mt-4 text-primary font-semibold">Tap QR Code to Scan</p>
            </div>
            
            {/* Fake overlay for demo purpose if not clicking */}
            {!showRoleSelector && <div className="absolute inset-0 z-20 bg-transparent"></div>}
        </div>

        {showRoleSelector && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-50 rounded-2xl animate-in fade-in zoom-in">
             <div className="bg-white p-6 rounded-xl shadow-2xl w-80">
                <h3 className="text-lg font-bold mb-4">Select Persona</h3>
                <div className="space-y-3">
                    <button 
                        onClick={() => loginAs("sarah")}
                        className="w-full p-4 bg-primary text-white rounded-lg hover:bg-primary-hover transition text-left flex items-center gap-3"
                    >
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">S</div>
                        <div>
                            <div className="font-bold">Sarah</div>
                            <div className="text-xs opacity-80">Care Giver</div>
                        </div>
                    </button>
                    <button 
                        onClick={() => loginAs("uncle_tan")}
                        className="w-full p-4 bg-white border-2 border-primary text-primary rounded-lg hover:bg-gray-50 transition text-left flex items-center gap-3"
                    >
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">T</div>
                        <div>
                            <div className="font-bold">Uncle Tan</div>
                            <div className="text-xs opacity-80">Senior</div>
                        </div>
                    </button>
                </div>
                <button 
                    onClick={() => setShowRoleSelector(false)}
                    className="mt-4 text-gray-400 text-sm hover:text-gray-600 underline"
                >
                    Cancel
                </button>
             </div>
          </div>
        )}
      </div>

      <div className="mt-8 text-xs text-gray-400">
        <p>From the team behind <strong>JAGA</strong> (Open Gov Products Trial)</p>
        <div className="flex gap-4 justify-center mt-2">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Contact</span>
        </div>
      </div>
    </div>
  );
}
