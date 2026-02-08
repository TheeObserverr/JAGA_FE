"use client";
import PageHeader from "../../components/PageHeader";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SeniorMedsLogPage() {
  const router = useRouter();
  const [step, setStep] = useState<'reminder' | 'camera' | 'confirm'>('reminder');

  const nextMed = {
      name: "Metformin",
      dose: "1 Tablet",
      instruction: "Take after food",
      time: "8:00 PM",
      img: "💊"
  };

  const handleCapture = () => {
    setStep('confirm');
  };

  const handleConfirm = () => {
    alert("Medication Logged!");
    router.push('/dashboard');
  };

  return (
    <div className="h-[100dvh] bg-secondary flex flex-col overflow-hidden">
        {step === 'reminder' ? (
            <div className="p-6 flex-1 flex flex-col">
                 <PageHeader title="My Medication" />
                 
                 <div className="flex-1 flex flex-col justify-center items-center text-center space-y-6">
                    <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center text-6xl shadow-lg animate-bounce">
                        {nextMed.img}
                    </div>
                    <div>
                        <p className="text-gray-500 uppercase tracking-widest font-bold text-sm">Please Take</p>
                        <h1 className="text-4xl font-bold text-gray-900 mt-2">{nextMed.name}</h1>
                        <p className="text-xl text-blue-600 font-medium mt-1">{nextMed.dose}</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 w-full max-w-xs">
                        <p className="text-gray-500 text-sm">Instruction:</p>
                        <p className="font-bold text-gray-800 text-lg">{nextMed.instruction}</p>
                    </div>
                 </div>

                 <button 
                    onClick={() => setStep('camera')}
                    className="w-full bg-primary text-white font-bold text-xl py-5 rounded-2xl shadow-lg active:scale-95 transition"
                >
                    I'm Taking It Now
                </button>
            </div>
        ) : (
             <div className="h-full bg-black text-white flex flex-col">
                 <div className="absolute top-4 left-4 z-10 w-full pr-8">
                    <div className="flex justify-between items-center">
                        <button onClick={() => setStep('reminder')} className="text-white font-bold text-lg">← Back</button>
                        <span className="bg-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Medication Log</span>
                    </div>
                </div>
                {step === 'camera' ? (
                     <>
                        <div className="flex-1 bg-gray-900 relative flex items-center justify-center overflow-hidden">
                            <div className="absolute inset-20 border-2 border-dashed border-white/50 rounded-lg pointer-events-none"></div>
                            <p className="bg-black/50 px-4 py-2 rounded-full">Snap a photo of the pills</p>
                        </div>
                         <div className="h-32 bg-black flex items-center justify-center pb-8">
                            <button 
                                onClick={handleCapture}
                                className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center"
                            >
                                <div className="w-16 h-16 bg-white rounded-full active:scale-90 transition"></div>
                            </button>
                        </div>
                     </>
                ) : (
                    <div className="flex-1 bg-gray-900 flex flex-col p-6">
                        <h2 className="text-2xl font-bold mb-4">Confirm?</h2>
                        <div className="flex-1 bg-gray-800 rounded-2xl mb-8 flex items-center justify-center">
                            <span className="text-6xl">💊</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <button onClick={() => setStep('camera')} className="bg-gray-700 py-4 rounded-xl font-bold">Retake</button>
                            <button onClick={handleConfirm} className="bg-blue-600 py-4 rounded-xl font-bold">Confirm</button>
                        </div>
                    </div>
                )}
             </div>
        )}
    </div>
  );
}
