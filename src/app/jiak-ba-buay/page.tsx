"use client";
import PageHeader from "../components/PageHeader";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts';

export default function JiakBaBuayPage() {
  const [showAnalysis, setShowAnalysis] = useState(false);

  // Mock Data for Charts
  const weeklyCalories = [
      { day: 'Mon', cal: 1800 },
      { day: 'Tue', cal: 2100 },
      { day: 'Wed', cal: 1950 },
      { day: 'Thu', cal: 1850 },
      { day: 'Fri', cal: 2200 },
      { day: 'Sat', cal: 2000 },
      { day: 'Sun', cal: 1850 },
  ];

  const weightTrend = [
      { week: 'W1', weight: 65.5 },
      { week: 'W2', weight: 65.2 },
      { week: 'W3', weight: 65.0 },
      { week: 'W4', weight: 64.8 },
  ];

  const nutritionStats = {
      calories: 1850,
      targetCalories: 2000,
      protein: 75,
      carbs: 220,
  };

  const meals = [
      { id: 1, type: "Breakfast", name: "Kaya Toast & Kopi-O", time: "08:30 AM", calories: 350, img: "🍞" },
      { id: 2, type: "Lunch", name: "Chicken Rice (Less Oil)", time: "12:45 PM", calories: 600, img: "🍚" },
  ];

  return (
    <div className="min-h-screen bg-secondary p-6">
      <div className="max-w-3xl mx-auto">
        <PageHeader title="Jiak Ba Buay (Eat-or-Not)" />
        
        {/* Main Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-4 rounded-xl shadow-sm text-center">
                <p className="text-gray-500 text-xs uppercase mb-1">Calories</p>
                <p className="text-2xl font-bold text-gray-800">{nutritionStats.calories}</p>
                <p className="text-xs text-gray-400">/ {nutritionStats.targetCalories}</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm text-center">
                <p className="text-gray-500 text-xs uppercase mb-1">Protein</p>
                <p className="text-2xl font-bold text-blue-600">{nutritionStats.protein}g</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm text-center">
                <p className="text-gray-500 text-xs uppercase mb-1">Med Adherence</p>
                <p className="text-2xl font-bold text-green-500">100%</p>
            </div>
             <div className="bg-white p-4 rounded-xl shadow-sm text-center">
                <p className="text-gray-500 text-xs uppercase mb-1">Hydration</p>
                <p className="text-2xl font-bold text-cyan-500">1.5L</p>
            </div>
        </div>

        {/* Collapsible Health Analysis */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-8">
            <button 
                onClick={() => setShowAnalysis(!showAnalysis)}
                className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition"
            >
                <div className="flex items-center gap-2">
                    <span className="text-xl">📈</span>
                    <h3 className="font-bold text-gray-800">Health Trends & Analysis</h3>
                </div>
                <span className={`transform transition-transform ${showAnalysis ? 'rotate-180' : ''}`}>▼</span>
            </button>
            
            {showAnalysis && (
                <div className="p-6 border-t border-gray-100 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="font-bold text-gray-700 mb-4 text-sm">Weekly Calorie Intake</h4>
                            <div className="h-48 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={weeklyCalories}>
                                        <XAxis dataKey="day" fontSize={12} tickLine={false} axisLine={false} />
                                        <Tooltip 
                                            cursor={{fill: '#f3f4f6'}}
                                            contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                                        />
                                        <Bar dataKey="cal" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <p className="text-xs text-gray-500 mt-2 text-center">Average: 1964 kcal/day (Within safe range)</p>
                        </div>

                        <div>
                            <h4 className="font-bold text-gray-700 mb-4 text-sm">Weight Trend (kg)</h4>
                             <div className="h-48 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={weightTrend}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="week" fontSize={12} tickLine={false} axisLine={false} padding={{ left: 10, right: 10 }} />
                                        <YAxis domain={['dataMin - 1', 'dataMax + 1']} fontSize={12} tickLine={false} axisLine={false} width={30}/>
                                         <Tooltip 
                                            contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                                        />
                                        <Line type="monotone" dataKey="weight" stroke="#10b981" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                            <p className="text-xs text-gray-500 mt-2 text-center">Steady manageable weight loss observed.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>

        {/* Meal Log */}
        <h3 className="font-bold text-gray-800 mb-4 px-1">Today's Meal Log</h3>
        <div className="space-y-4 mb-8">
            {meals.map(meal => (
                <div key={meal.id} className="bg-white p-4 rounded-xl shadow-sm flex gap-4 items-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-3xl">
                        {meal.img}
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-start">
                            <h4 className="font-bold text-gray-900">{meal.name}</h4>
                            <span className="text-xs font-bold bg-gray-800 text-white px-2 py-1 rounded">{meal.type}</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{meal.time} • {meal.calories} kcal</p>
                        <p className="text-xs text-green-600 mt-1">✨ AI Analysis: Balanced meal.</p>
                    </div>
                </div>
            ))}
        </div>

        {/* Medication */}
        <h3 className="font-bold text-gray-800 mb-4 px-1">Medication Tracker</h3>
         <div className="bg-white rounded-xl shadow-sm divide-y divide-gray-50">
            <div className="p-4 flex items-center justify-between">
                <div>
                    <p className="font-bold text-gray-900">Metformin</p>
                    <p className="text-xs text-gray-500">1 Tablet • After Breakfast</p>
                </div>
                <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">Taken 8:30 AM</span>
            </div>
             <div className="p-4 flex items-center justify-between opacity-50">
                <div>
                    <p className="font-bold text-gray-900">Atorvastatin</p>
                    <p className="text-xs text-gray-500">1 Tablet • After Dinner</p>
                </div>
                <span className="bg-gray-100 text-gray-500 text-xs font-bold px-3 py-1 rounded-full">Pending</span>
            </div>
         </div>
      </div>
    </div>
  );
}
