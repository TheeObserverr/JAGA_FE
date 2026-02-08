"use client";
import PageHeader from "../../components/PageHeader";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

export default function SeniorMedsLogPage() {
  const router = useRouter();
  const [step, setStep] = useState<'reminder' | 'camera' | 'confirm'>('reminder');

  // Mock Data for Timeline
  const todaysMeds = [
      { id: 1, name: "Amlodipine", dose: "1 Tablet", time: "08:00 AM", status: "Taken", img: "⚪️" },
      { id: 2, name: "Metformin", dose: "1 Tablet", time: "02:00 PM", status: "Due Now", img: "💊", instruction: "Take after food" },
      { id: 3, name: "Atorvastatin", dose: "1 Tablet", time: "08:00 PM", status: "Upcoming", img: "🔵" },
  ];

  const currentMed = todaysMeds.find(m => m.status === "Due Now");

  const handleCapture = () => {
    setStep('confirm');
  };

  const handleConfirm = () => {
    alert("Medication Logged!");
    router.push('/dashboard');
  };

  return (
    <div className="h-[100dvh] bg-blue-50 flex flex-col overflow-hidden">
        {step === 'reminder' ? (
            <div className="flex-1 flex flex-col h-full">
                 <div className="p-6 pb-2">
                    <PageHeader title="My Medication" />
                    <p className="text-gray-500 mt-1">{format(new Date(), 'EEEE, d MMMM')}</p>
                 </div>
                 
                 <div className="flex-1 overflow-y-auto px-6 pb-24">
                    {/* Timeline */}
                    <div className="space-y-6 relative">
                        {/* Vertical Line */}
                        <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-gray-200"></div>

                        {todaysMeds.map((med, idx) => (
                            <div key={med.id} className={`relative pl-10 transition-all ${med.status === 'Due Now' ? 'scale-105 origin-left' : 'opacity-70'}`}>
                                {/* Timeline Dot */}
                                <div className={`absolute left-2 top-0 -translate-x-1/2 w-4 h-4 rounded-full border-2 ${
                                    med.status === 'Taken' ? 'bg-green-500 border-green-500' : 
                                    med.status === 'Due Now' ? 'bg-blue-600 border-blue-600 animate-pulse' : 
                                    'bg-white border-gray-300'
                                }`}></div>

                                {med.status === 'Due Now' ? (
                                    /* Active Card */
                                    <div className="bg-white rounded-2xl p-5 shadow-lg border-l-8 border-blue-600">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="bg-blue-100 text-blue-700 font-bold px-2 py-1 rounded text-xs uppercase tracking-wider">Due Now</span>
                                            <span className="text-gray-900 font-bold text-lg">{med.time}</span>
                                        </div>
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="text-5xl">{med.img}</div>
                                            <div>
                                                <h3 className="text-2xl font-bold text-gray-900">{med.name}</h3>
                                                <p className="text-lg text-gray-600">{med.dose}</p>
                                            </div>
                                        </div>
                                        {med.instruction && (
                                            <div className="bg-orange-50 text-orange-800 p-3 rounded-xl text-sm font-bold flex items-center gap-2 mb-4">
                                                <span>🍽️</span> {med.instruction}
                                            </div>
                                        )}
                                        <button 
                                            onClick={() => setStep('camera')}
                                            className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl shadow-md active:scale-95 transition flex items-center justify-center gap-2"
                                        >
                                            <span>📷</span> Take Photo to Confirm
                                        </button>
                                    </div>
                                ) : (
                                    /* Inactive Card */
                                    <div className="bg-white/60 rounded-xl p-4 border border-gray-100 flex justify-between items-center">
                                        <div>
                                            <p className="text-gray-500 font-medium text-sm">{med.time}</p>
                                            <h4 className="text-gray-700 font-bold text-lg">{med.name}</h4>
                                            <p className="text-xs text-gray-400">{med.dose}</p>
                                        </div>
                                        <div className="text-2xl opacity-50">{med.img}</div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                 </div>
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
                        <h2 className="text-2xl font-bold mb-4 text-center">Confirm Medication?</h2>
                        <div className="flex-1 bg-gray-800 rounded-2xl mb-8 flex flex-col items-center justify-center border border-gray-700">
                            <span className="text-8xl mb-4">💊</span>
                            <h3 className="text-2xl font-bold">{currentMed?.name}</h3>
                            <p className="text-gray-400">{currentMed?.dose} • {currentMed?.time}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <button onClick={() => setStep('camera')} className="bg-gray-700 py-4 rounded-xl font-bold hover:bg-gray-600">Retake</button>
                            <button onClick={handleConfirm} className="bg-blue-600 py-4 rounded-xl font-bold hover:bg-blue-500">Confirm Taken</button>
                        </div>
                    </div>
                )}
             </div>
        )}
    </div>
  );
}
