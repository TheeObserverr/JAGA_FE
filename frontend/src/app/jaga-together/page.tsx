"use client";
import PageHeader from "../components/PageHeader";
import Modal from "../components/Modal";
import { useState } from "react";

export default function JagaTogetherPage() {
  const [selectedPromo, setSelectedPromo] = useState<any>(null);

  const [milestones, setMilestones] = useState([
      { id: 1, title: "Eat Healthy Streak", target: 30, current: 12, unit: "Days", icon: "🥦", color: "bg-green-500" },
      { id: 2, title: "Family Walks", target: 4, current: 3, unit: "Walks", icon: "🚶", color: "bg-blue-500" },
      { id: 3, title: "Reduce Sugar Intake", target: 100, current: 85, unit: "% Success", icon: "📉", color: "bg-purple-500" },
  ]);

  const promos = [
      { id: 1, title: "Singapore Zoo Family Pass", desc: "50% off for multi-generational families.", code: "ZOO50", img: "🦒" },
      { id: 2, title: "Gardens by the Bay Walk", desc: "Free guided tour for seniors every Sunday.", code: "FREE", img: "🌸" },
  ];

  return (
    <div className="min-h-screen bg-secondary p-6">
      <div className="max-w-3xl mx-auto">
        <PageHeader title="JAGA Together" />

        {/* Family Milestones Section */}
        <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>🏆</span> Family Milestones
            </h2>
            <div className="grid gap-4">
                {milestones.map(m => (
                    <div key={m.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl bg-gray-50 w-10 h-10 flex items-center justify-center rounded-lg">{m.icon}</span>
                                <div>
                                    <h3 className="font-bold text-gray-900">{m.title}</h3>
                                    <p className="text-xs text-gray-500">{m.current} / {m.target} {m.unit}</p>
                                </div>
                            </div>
                            {m.current >= m.target && <span className="text-xs font-bold bg-yellow-100 text-yellow-700 px-2 py-1 rounded">COMPLETED!</span>}
                        </div>
                        {/* Progress Bar */}
                        <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                            <div 
                                className={`h-full ${m.color} transition-all duration-1000 ease-out`} 
                                style={{ width: `${Math.min((m.current / m.target) * 100, 100)}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </section>

        {/* Bonding Rewards Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 text-white shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-2">Bonding Rewards</h2>
            <p className="opacity-90 mb-4">You're making great progress! Unlock these curated rewards for your next family outing.</p>
        </div>

        <h3 className="font-bold text-gray-800 mb-4 px-1">Curated Promos</h3>
        <div className="grid gap-4">
            {promos.map(promo => (
                <div key={promo.id} className="bg-white p-4 rounded-xl shadow-sm flex gap-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-4xl shrink-0">
                        {promo.img}
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                        <div>
                            <h4 className="font-bold text-gray-900">{promo.title}</h4>
                            <p className="text-sm text-gray-500 leading-snug">{promo.desc}</p>
                        </div>
                        <div className="flex justify-between items-end mt-2">
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-500 font-mono">Code: {promo.code}</span>
                            <button 
                                onClick={() => setSelectedPromo(promo)}
                                className="text-primary text-sm font-bold hover:underline"
                            >
                                Redeem
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        <Modal
            isOpen={!!selectedPromo}
            onClose={() => setSelectedPromo(null)}
            title="Redeem Reward"
        >
            {selectedPromo && (
                <div className="text-center">
                    <div className="text-6xl mb-4">{selectedPromo.img}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedPromo.title}</h3>
                    <p className="text-gray-600 mb-6">{selectedPromo.desc}</p>
                    
                    <div className="bg-gray-100 p-4 rounded-xl mb-6 border-dashed border-2 border-gray-300">
                        <p className="text-xs text-gray-500 uppercase font-bold mb-1">Promo Code</p>
                        <p className="text-2xl font-mono font-bold text-gray-800 tracking-wider">{selectedPromo.code}</p>
                    </div>

                    <p className="text-xs text-gray-400 mb-4">Show this screen to staff to redeem.</p>
                    <button 
                        onClick={() => setSelectedPromo(null)}
                        className="w-full bg-primary text-white font-bold py-3 rounded-xl shadow-lg hover:bg-primary/90 transition"
                    >
                        Done
                    </button>
                </div>
            )}
        </Modal>
      </div>
    </div>
  );
}
