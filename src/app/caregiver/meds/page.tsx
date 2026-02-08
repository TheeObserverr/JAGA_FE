"use client";

import { useState } from "react";
import Link from "next/link";
import PageHeader from "../../components/PageHeader";

export default function CaregiverMedsPage() {
    const [activeTab, setActiveTab] = useState<'schedule' | 'history'>('schedule');
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedMed, setSelectedMed] = useState<any>(null);

    const [medications, setMedications] = useState([
        { id: 1, name: "Metformin", dose: "500mg", freq: "2x Daily", next: "2:00 PM", quantity: 45, unit: "Tabs", img: "💊", usage: "Controls blood sugar levels. Take with or immediately after meals." },
        { id: 2, name: "Amlodipine", dose: "10mg", freq: "1x Daily", next: "8:00 AM (Tomorrow)", quantity: 5, unit: "Tabs", img: "⚪️", usage: "Treats high blood pressure. Avoid grapefruit." },
        { id: 3, name: "Atorvastatin", dose: "20mg", freq: "1x Nightly", next: "9:00 PM", quantity: 28, unit: "Tabs", img: "🔵", usage: "Lowers cholesterol. Take at the same time each evening." },
    ]);

    const getStockStatus = (qty: number) => {
        if (qty === 0) return { label: "Out of Stock", color: "text-red-600 bg-red-100" };
        if (qty < 10) return { label: "Low Stock", color: "text-orange-600 bg-orange-100" };
        if (qty === 999) return { label: "Ordered", color: "text-blue-600 bg-blue-100" }; // Mock status for ordered
        return { label: "Good", color: "text-green-600 bg-green-100" };
    };

    const medHistory = [
        { id: 1, med: "Metformin", time: "08:15 AM", status: "Taken", date: "Today" },
        { id: 2, med: "Atorvastatin", time: "09:00 PM", status: "Taken", date: "Yesterday" },
        { id: 3, med: "Metformin", time: "08:30 PM", status: "Taken", date: "Yesterday" },
        { id: 4, med: "Metformin", time: "02:00 PM", status: "Missed", date: "Yesterday" },
    ];

    const handleAddMed = (e: any) => {
        e.preventDefault();
        const start = medications.length + 1;
        const newMed = {
            id: start,
            name: e.target.medName.value,
            dose: e.target.medDose.value,
            freq: e.target.medFreq.value,
            next: "TBD",
            quantity: parseInt(e.target.medQty.value) || 30,
            unit: "Tabs",
            img: "🆕",
            usage: e.target.medUsage.value || "Follow doctor's instructions."
        };
        setMedications([...medications, newMed]);
        setShowAddModal(false);
        alert("New medication added successfully!");
    };

    const handleReorder = () => {
        alert(`Order placed for ${selectedMed.name}! It will arrive in 2-3 days.`);
        // Optimistically update to "Ordered" state (custom qty flag 999)
        const updatedMeds = medications.map(m => m.id === selectedMed.id ? {...m, quantity: 999} : m);
        setMedications(updatedMeds);
        setSelectedMed({...selectedMed, quantity: 999});
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* ... Header ... */}
            <div className="bg-white p-6 pb-4 shadow-sm border-b border-gray-100 sticky top-0 z-10">
                <div className="flex justify-between items-center mb-4">
                    <Link href="/dashboard" className="text-gray-500 font-bold">← Dashboard</Link>
                    <button 
                        onClick={() => setShowAddModal(true)}
                        className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold hover:bg-primary/20 transition"
                    >
                        + Add Med
                    </button>
                </div>
                {/* ... (Rest of Header) ... */}
                <h1 className="text-2xl font-black text-gray-900">Uncle Tan's Meds</h1>
                
                <div className="flex gap-4 mt-6">
                    <div className="flex-1 bg-green-50 rounded-2xl p-4 border border-green-100 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center text-green-700 font-bold text-sm">
                            92%
                        </div>
                        <div>
                            <p className="text-xs text-green-800 font-bold uppercase">Adherence</p>
                            <p className="text-xs text-green-600">Last 30 Days</p>
                        </div>
                    </div>
                </div>

                <div className="flex gap-2 mt-6 border-b border-gray-100">
                    <button 
                         onClick={() => setActiveTab('schedule')}
                        className={`pb-3 px-2 text-sm font-bold border-b-2 transition-colors ${activeTab === 'schedule' ? 'border-primary text-primary' : 'border-transparent text-gray-400'}`}
                    >
                        Schedule & Stock
                    </button>
                    <button 
                         onClick={() => setActiveTab('history')}
                        className={`pb-3 px-2 text-sm font-bold border-b-2 transition-colors ${activeTab === 'history' ? 'border-primary text-primary' : 'border-transparent text-gray-400'}`}
                    >
                        History Log
                    </button>
                </div>
            </div>

            <div className="p-6 space-y-4">
                {activeTab === 'schedule' ? (
                    medications.map(med => {
                        const status = getStockStatus(med.quantity);
                        return (
                            <div 
                                key={med.id} 
                                onClick={() => setSelectedMed(med)}
                                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-4 cursor-pointer hover:shadow-md transition active:scale-95"
                            >
                                <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center text-3xl">
                                    {med.img}
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-bold text-gray-900 text-lg">{med.name}</h3>
                                        <span className={`${status.color} text-[10px] font-bold px-2 py-0.5 rounded-full`}>
                                            {status.label === 'Ordered' ? 'Ordered' : `${med.quantity} Left`}
                                        </span>
                                    </div>
                                    <p className="text-gray-500 text-sm font-medium">{med.dose} • {med.freq}</p>
                                    <p className="text-xs text-blue-600 font-bold mt-1">Next: {med.next}</p>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="space-y-6">
                        {/* History Log remains same */}
                        {['Today', 'Yesterday'].map(day => (
                            <div key={day}>
                                <h3 className="font-bold text-gray-400 text-xs uppercase mb-3 ml-1">{day}</h3>
                                <div className="space-y-3">
                                    {medHistory.filter(h => h.date === day).map(item => (
                                        <div key={item.id} className="bg-white rounded-xl p-3 border border-gray-100 flex items-center justify-between">
                                             <div className="flex items-center gap-3">
                                                <div className={`w-2 h-2 rounded-full ${item.status === 'Taken' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                                <div>
                                                    <p className="font-bold text-gray-800">{item.med}</p>
                                                    <p className="text-xs text-gray-400">{item.time}</p>
                                                </div>
                                             </div>
                                             <span className={`text-xs font-bold px-2 py-1 rounded ${item.status === 'Taken' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                                 {item.status}
                                             </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* ADD MED MODAL */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl w-full max-w-sm p-6 animate-in zoom-in-95 duration-200">
                        <h2 className="text-2xl font-black text-gray-900 mb-4">Add Medication</h2>
                        <form onSubmit={handleAddMed} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Medication Name</label>
                                <input name="medName" required placeholder="e.g. Lisinopril" className="w-full bg-gray-50 rounded-xl p-3 font-bold text-gray-900 outline-none focus:ring-2 focus:ring-primary" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Dosage</label>
                                    <input name="medDose" required placeholder="e.g. 10mg" className="w-full bg-gray-50 rounded-xl p-3 font-bold text-gray-900 outline-none focus:ring-2 focus:ring-primary" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Initial Qty</label>
                                    <input name="medQty" type="number" required placeholder="e.g. 30" className="w-full bg-gray-50 rounded-xl p-3 font-bold text-gray-900 outline-none focus:ring-2 focus:ring-primary" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Frequency</label>
                                <input name="medFreq" required placeholder="e.g. 1x Daily" className="w-full bg-gray-50 rounded-xl p-3 font-bold text-gray-900 outline-none focus:ring-2 focus:ring-primary" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Usage / Instructions</label>
                                <textarea name="medUsage" rows={2} placeholder="e.g. Take with food." className="w-full bg-gray-50 rounded-xl p-3 font-medium text-gray-900 outline-none focus:ring-2 focus:ring-primary" />
                            </div>
                            <div className="flex gap-3 mt-6">
                                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 py-3 text-gray-500 font-bold hover:bg-gray-100 rounded-xl">Cancel</button>
                                <button type="submit" className="flex-1 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-purple-200">Add Med</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* MED DETAIL MODAL */}
            {selectedMed && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center sm:p-4 backdrop-blur-sm" onClick={() => setSelectedMed(null)}>
                    <div className="bg-white rounded-t-3xl md:rounded-3xl w-full max-w-sm p-6 animate-in slide-in-from-bottom duration-300" onClick={e => e.stopPropagation()}>
                        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6 md:hidden"></div>
                        
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-4xl">
                                    {selectedMed.img}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-gray-900">{selectedMed.name}</h2>
                                    <p className="text-gray-500 font-medium">{selectedMed.dose}</p>
                                </div>
                            </div>
                            <button onClick={() => setSelectedMed(null)} className="p-2 bg-gray-100 rounded-full text-gray-500 hidden md:block">✕</button>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-gray-50 p-4 rounded-xl">
                                <h3 className="text-xs font-bold text-gray-500 uppercase mb-1">Usage Information</h3>
                                <p className="text-gray-800 font-medium leading-relaxed">{selectedMed.usage}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-center">
                                <div className="p-3 bg-gray-50 rounded-xl">
                                    <p className="text-xs text-gray-400 uppercase font-bold">Frequency</p>
                                    <p className="font-bold text-gray-900">{selectedMed.freq}</p>
                                </div>
                                <div className="p-3 bg-gray-50 rounded-xl">
                                    <p className="text-xs text-gray-400 uppercase font-bold">Next Dose</p>
                                    <p className="font-bold text-blue-600">{selectedMed.next}</p>
                                </div>
                            </div>
                            
                            {/* Stock Status / Reorder */}
                            <div className="border-t border-gray-100 pt-4 mt-2">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-gray-500 font-medium">Current Stock</span>
                                    <span className={`font-bold ${selectedMed.quantity < 10 && selectedMed.quantity !== 999 ? 'text-red-500' : 'text-green-600'}`}>
                                        {selectedMed.quantity === 999 ? 'Ordered' : `${selectedMed.quantity} ${selectedMed.unit ?? 'Tabs'}`}
                                    </span>
                                </div>
                                {selectedMed.quantity < 10 && selectedMed.quantity !== 999 ? (
                                    <button 
                                        onClick={handleReorder}
                                        className="w-full bg-red-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-red-200 active:scale-95 transition flex items-center justify-center gap-2"
                                    >
                                        <span>🛒</span> Reorder Now (Low Stock)
                                    </button>
                                ) : selectedMed.quantity === 999 ? (
                                    <button disabled className="w-full bg-blue-100 text-blue-500 font-bold py-3 rounded-xl cursor-not-allowed">
                                        Order Placed ✓
                                    </button>
                                ) : (
                                    <button className="w-full bg-green-100 text-green-700 font-bold py-3 rounded-xl pointer-events-none">
                                        Stock Adequate
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
