"use client";
import PageHeader from "../../components/PageHeader";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SeniorMealLogPage() {
  const router = useRouter();
  const [step, setStep] = useState<'camera' | 'analyzing' | 'confirm'>('camera');
  const [identifiedFood, setIdentifiedFood] = useState<string | null>(null);

  const handleCapture = () => {
    setStep('analyzing');
    // Simulate AI Delay
    setTimeout(() => {
        setIdentifiedFood("Chicken Rice (Less Oil)");
        setStep('confirm');
    }, 2000);
  };

  const handleConfirm = () => {
    // In real app, upload image
    alert("Meal Logged: " + identifiedFood);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="absolute top-4 left-4 z-10 w-full pr-8">
        <div className="flex justify-between items-center">
             <PageHeader title="" /> 
             <span className="bg-orange-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Jiak Ba Buay (Meal Log)</span>
        </div>
      </div>

      {step === 'camera' ? (
        <>
            {/* Camera Viewfinder Mock */}
            <div className="flex-1 bg-gray-900 relative flex items-center justify-center overflow-hidden">
                <p className="text-gray-500 animate-pulse">Camera Viewfinder Active</p>
                <div className="absolute inset-x-8 inset-y-24 border-2 border-white/30 rounded-lg pointer-events-none"></div>
                
                {/* Simulated AR Overlay */}
                <div className="absolute bottom-32 left-0 w-full text-center">
                    <p className="bg-black/50 inline-block px-4 py-1 rounded-full text-sm">Point at your food</p>
                </div>
            </div>

            {/* Camera Controls */}
            <div className="h-32 bg-black flex items-center justify-center gap-8 pb-8">
                <button className="w-12 h-12 rounded-full bg-gray-800 border border-gray-600 flex items-center justify-center">
                    ↯
                </button>
                <button 
                    onClick={handleCapture}
                    className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center"
                >
                    <div className="w-16 h-16 bg-white rounded-full active:scale-90 transition"></div>
                </button>
                <button className="w-12 h-12 rounded-full bg-gray-800 border border-gray-600 flex items-center justify-center">
                    ⟲
                </button>
            </div>
        </>
      ) : step === 'analyzing' ? (
          <div className="flex-1 bg-gray-900 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-24 h-24 border-4 border-t-primary border-gray-700 rounded-full animate-spin mb-6"></div>
              <h2 className="text-2xl font-bold animate-pulse">Analyzing Food...</h2>
              <p className="text-gray-400 mt-2">Identifying calories and nutrients</p>
          </div>
      ) : (
        <div className="flex-1 bg-gray-900 flex flex-col p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Is this correct?</h2>
            
            <div className="bg-gray-800 rounded-2xl p-6 mb-8 text-center border border-gray-700">
                <span className="text-6xl block mb-4">🍚</span>
                <h3 className="text-3xl font-bold text-white mb-2">{identifiedFood}</h3>
                <p className="text-green-400 font-bold text-lg">~600 kcal • Balanced</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-auto">
                 <button 
                    onClick={() => setStep('camera')}
                    className="bg-gray-700 py-4 rounded-xl font-bold hover:bg-gray-600"
                >
                    Retake
                </button>
                <button 
                    onClick={handleConfirm}
                    className="bg-green-600 py-4 rounded-xl font-bold hover:bg-green-500 shadow-lg shadow-green-900/50"
                >
                    Yes, Correct
                </button>
            </div>
        </div>
      )}
    </div>
  );
}
