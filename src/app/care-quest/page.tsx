"use client";
import PageHeader from "../components/PageHeader";

import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useState } from "react";
import Modal from "../components/Modal";

export default function CareQuestPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", assignee: "Sarah", dueDate: new Date() });

  const [tasks, setTasks] = useState([
    { id: 1, title: "Buy Groceries (Low Sugar)", assignee: "Sarah", dueDate: new Date(), status: "Pending" },
    { id: 2, title: "Accompany Uncle Tan to Polyclinic", assignee: "John", dueDate: new Date(2026, 1, 20), status: "Upcoming" }, 
    { id: 3, title: "Fix Toilet Light", assignee: "David", dueDate: new Date(2026, 1, 18), status: "Done" }, 
    { id: 4, title: "Family Dinner @ Ah Ma's", assignee: "All", dueDate: new Date(2026, 1, 15), status: "Upcoming" }, 
  ]);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    const task = {
        id: tasks.length + 1,
        title: newTask.title,
        assignee: newTask.assignee,
        dueDate: selectedDate || new Date(),
        status: "Pending"
    };
    setTasks([...tasks, task]);
    setIsModalOpen(false);
    setNewTask({ title: "", assignee: "Sarah", dueDate: new Date() });
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => 
        t.id === id 
        ? { ...t, status: t.status === 'Done' ? 'Pending' : 'Done' } 
        : t
    ));
  };

  // Helper to check if task is on selected day
  const isSameDay = (d1: Date, d2: Date) => 
    d1.getDate() === d2.getDate() && 
    d1.getMonth() === d2.getMonth() && 
    d1.getFullYear() === d2.getFullYear();

  const selectedTasks = selectedDate 
    ? tasks.filter(t => isSameDay(t.dueDate, selectedDate))
    : [];

  const modifiers = {
      highlight: tasks.map(t => t.dueDate)
  };
  const modifiersStyles = {
      highlight: { color: 'white', backgroundColor: '#696ADE' }
  };

  return (
    <div className="min-h-screen bg-secondary p-4 md:p-6 overflow-x-hidden">
      <div className="max-w-3xl mx-auto">
        <PageHeader title="Family Care-Quest" />
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Interactive Calendar Widget */}
            <div className="bg-white rounded-2xl shadow-sm p-4 flex justify-center">
                <DayPicker
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    modifiers={modifiers}
                    modifiersStyles={modifiersStyles}
                    footer={selectedDate ? `Selected: ${format(selectedDate, 'PP')}` : "Pick a day."}
                />
            </div>

            {/* Selected Day's Agenda */}
            <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col">
                 <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">
                    Agenda for {selectedDate ? format(selectedDate, 'PP') : '...'}
                 </h3>
                 <div className="space-y-3 flex-1 overflow-y-auto max-h-60 custom-scrollbar">
                    {selectedTasks.length > 0 ? (
                        selectedTasks.map(task => (
                             <div 
                                key={task.id} 
                                onClick={() => toggleTask(task.id)}
                                className={`p-3 rounded-lg border-l-4 cursor-pointer transition-all ${task.status === 'Done' ? 'bg-green-50 border-green-500 opacity-60' : 'bg-gray-50 border-primary'}`}
                             >
                                <div className="flex justify-between items-start">
                                    <p className={`font-bold ${task.status === 'Done' ? 'text-gray-500 line-through' : 'text-gray-900'}`}>{task.title}</p>
                                    {task.status === 'Done' && <span className="text-green-600 font-bold">✓</span>}
                                </div>
                                <p className="text-xs text-gray-500">Assignee: {task.assignee}</p>
                             </div>
                        ))
                    ) : (
                        <div className="text-center py-8 text-gray-400">
                            <p>No tasks specifically for this day.</p>
                        </div>
                    )}
                 </div>
                 <button 
                    onClick={() => setIsModalOpen(true)}
                    className="mt-4 w-full py-2 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition"
                 >
                    + Add Task
                 </button>
            </div>
        </div>

        {/* Bonding Commitment Nudge */}
        <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6 mb-8 flex items-center justify-between">
            <div>
                <p className="text-purple-600 font-bold uppercase text-xs tracking-wider mb-1">Bonding Commitment</p>
                <h2 className="text-xl font-bold text-gray-900">Botanic Gardens Walk</h2>
                <p className="text-gray-600 text-sm mt-1">Feb 15, 2024 • 9:00 AM</p>
            </div>
            <div className="text-center bg-white p-3 rounded-lg shadow-sm">
                <span className="block text-2xl font-bold text-purple-600">5</span>
                <span className="text-xs text-gray-500 uppercase">Days Left</span>
            </div>
        </div>

        {/* Task Board */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-gray-800">Logistics Board (All Tasks)</h3>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition"
                >
                    + New Task
                </button>
            </div>
            <div className="divide-y divide-gray-50">
                {tasks.map((task) => (
                    <div 
                        key={task.id} 
                        onClick={() => toggleTask(task.id)}
                        className="p-4 hover:bg-gray-50 flex items-center gap-4 cursor-pointer group select-none"
                    >
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${task.status === 'Done' ? 'bg-green-500 border-green-500' : 'border-gray-300 group-hover:border-primary'}`}>
                            {task.status === 'Done' && <span className="text-white text-xs font-bold">✓</span>}
                        </div>
                        <div className="flex-1">
                            <p className={`font-medium transition-all ${task.status === 'Done' ? 'text-gray-400 line-through' : 'text-gray-900'}`}>{task.title}</p>
                            <div className="flex gap-2 mt-1">
                                <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600">👤 {task.assignee}</span>
                                <span className={`text-xs px-2 py-0.5 rounded ${task.status === 'Done' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                    📅 {format(task.dueDate, 'MMM d')}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Add Task Modal */}
        <Modal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)}
            title="Create New Task"
        >
            <form onSubmit={handleAddTask} className="space-y-4">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Task Title</label>
                    <input 
                        type="text" 
                        required
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                        placeholder="e.g., Buy Milk"
                        value={newTask.title}
                        onChange={e => setNewTask({...newTask, title: e.target.value})}
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Assignee</label>
                    <select 
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                        value={newTask.assignee}
                        onChange={e => setNewTask({...newTask, assignee: e.target.value})}
                    >
                        <option>Sarah</option>
                        <option>John</option>
                        <option>David</option>
                        <option>All</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Date</label>
                    <div className="p-2 bg-gray-50 rounded-lg text-gray-600 border border-gray-200">
                        {selectedDate ? format(selectedDate, 'PPP') : "Today"}
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Selected via calendar</p>
                </div>
                <button 
                    type="submit"
                    className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary/90 transition shadow-lg shadow-primary/30"
                >
                    Create Task
                </button>
            </form>
        </Modal>
      </div>
    </div>
  );
}
