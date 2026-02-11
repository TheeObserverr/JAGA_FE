"use client";
import PageHeader from "../components/PageHeader";
import Modal from "../components/Modal";
import { useState } from "react";

export default function FamilyDoctorPage() {
  const [modalType, setModalType] = useState<'none' | 'reschedule' | 'addCalendar'>('none');

  return (
    <div className="min-h-screen bg-secondary p-6">
      <div className="max-w-3xl mx-auto">
        <PageHeader title="Family Doctor" />

        {/* Upcoming Appointment */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 border-l-4 border-primary">
            <div className="flex justify-between items-start mb-2">
                <h2 className="text-lg font-bold text-gray-900">Upcoming Appointment</h2>
                <span className="bg-blue-50 text-blue-600 text-xs font-bold px-2 py-1 rounded">CONFIRMED</span>
            </div>
            <div className="flex items-center gap-4 mt-4">
                <div className="bg-gray-100 w-16 h-16 rounded-lg flex flex-col items-center justify-center text-gray-600 font-bold leading-tight">
                    <span className="text-xs uppercase">FEB</span>
                    <span className="text-2xl">20</span>
                </div>
                <div>
                    <p className="font-bold text-gray-800">Toa Payoh Polyclinic</p>
                    <p className="text-gray-600 text-sm">Dr. Lim • 10:00 AM</p>
                    <p className="text-gray-500 text-xs mt-1">Regular diabetic checkup.</p>
                </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
                <button 
                    onClick={() => setModalType('reschedule')}
                    className="flex-1 bg-gray-50 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition"
                >
                    Reschedule
                </button>
                <button 
                     onClick={() => setModalType('addCalendar')}
                    className="flex-1 bg-primary text-white py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition"
                >
                    Add to Calendar
                </button>
            </div>
        </div>

        {/* Medical Summary */}
        <h3 className="font-bold text-gray-800 mb-4 px-1">Medical Summaries (Simplified)</h3>
        <div className="space-y-4">
            <div className="bg-white p-5 rounded-xl shadow-sm">
                <div className="flex justify-between mb-2">
                    <h4 className="font-bold text-gray-900">Nov 15, 2025 - General Checkup</h4>
                    <span className="text-xs text-gray-400">Dr. Lim</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                    Blood pressure is <strong>stable (130/80)</strong>. Cholesterol levels have improved slightly since starting the new medication. No change in medication required. Continue low-salt diet.
                </p>
                <div className="mt-3 flex gap-2">
                    <span className="text-xs bg-yellow-50 text-yellow-700 px-2 py-1 rounded">⚠️ Monitor Salt</span>
                    <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded">✅ BP Stable</span>
                </div>
            </div>
        </div>

        {/* Dynamic Modal */}
        <Modal
            isOpen={modalType !== 'none'}
            onClose={() => setModalType('none')}
            title={modalType === 'reschedule' ? 'Reschedule Appointment' : 'Success!'}
        >
            {modalType === 'reschedule' ? (
                <div className="space-y-4">
                    <p className="text-gray-600">Please select a new preferred date and time for Dr. Lim.</p>
                    <input type="datetime-local" className="w-full border p-2 rounded-lg" />
                    <textarea placeholder="Reason for rescheduling..." className="w-full border p-2 rounded-lg h-24"></textarea>
                    <button onClick={() => setModalType('none')} className="w-full bg-primary text-white font-bold py-3 rounded-xl">Request Change</button>
                </div>
            ) : (
                <div className="text-center py-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">📅</div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">Added to Calendar</h3>
                    <p className="text-gray-600 text-sm">A reminder has been set for Feb 20, 9:00 AM.</p>
                    <button onClick={() => setModalType('none')} className="mt-6 w-full bg-gray-100 text-gray-800 font-bold py-3 rounded-xl">Close</button>
                </div>
            )}
        </Modal>
      </div>
    </div>
  );
}
