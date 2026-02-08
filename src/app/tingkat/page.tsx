"use client";
import PageHeader from "../components/PageHeader";
import Modal from "../components/Modal";
import { useState } from "react";

export default function TingkatPage() {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const subscriptions = [
      { id: 1, name: "Healthy Tingkat (Low Salt)", frequency: "Weekdays (Dinner)", status: "Active", nextDelivery: "Tonight, 6:00 PM" },
      { id: 2, name: "Adult Diapers (L)", frequency: "Monthly", status: "Auto-Refill", nextDelivery: "Feb 28" },
  ];

  const pastOrders = [
      { id: 101, item: "Healthy Tingkat - Dinner", date: "Feb 08", status: "Delivered" },
      { id: 102, item: "Adult Diapers (L) x 2", date: "Jan 28", status: "Delivered" },
      { id: 103, item: "Healthy Tingkat - Dinner", date: "Jan 27", status: "Delivered" },
  ];

  return (
    <div className="min-h-screen bg-secondary p-6">
      <div className="max-w-3xl mx-auto">
        <PageHeader title="Tingkat (Auto-Supplies)" />
        
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-8">
            <p className="text-blue-800 text-sm">
                <strong>💡 JAGA Intel:</strong> Uncle Tan's weight has been stable. The current meal plan is effective.
            </p>
        </div>

        <h3 className="font-bold text-gray-800 mb-4 px-1">Active Subscriptions</h3>
        <div className="grid gap-4">
            {subscriptions.map(sub => (
                <div key={sub.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden">
                    <div className="flex justify-between items-start">
                        <div>
                            <h4 className="font-bold text-lg text-gray-900">{sub.name}</h4>
                            <p className="text-gray-500 text-sm">{sub.frequency}</p>
                        </div>
                        <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded uppercase">{sub.status}</span>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center">
                        <span className="text-xs text-gray-400">Next Delivery</span>
                        <span className="font-medium text-gray-800">{sub.nextDelivery}</span>
                    </div>
                </div>
            ))}
        </div>

         <div className="mt-8 text-center">
            <button 
                onClick={() => setIsHistoryOpen(true)}
                className="text-primary font-bold text-sm hover:underline"
            >
                View Past Orders
            </button>
        </div>

        <Modal
            isOpen={isHistoryOpen}
            onClose={() => setIsHistoryOpen(false)}
            title="Order History"
        >
            <div className="space-y-3">
                {pastOrders.map(order => (
                    <div key={order.id} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg border-b border-gray-100 last:border-0">
                        <div>
                            <p className="font-bold text-gray-800">{order.item}</p>
                            <p className="text-xs text-gray-500">{order.date}</p>
                        </div>
                        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">{order.status}</span>
                    </div>
                ))}
                <button className="w-full text-center text-primary text-xs font-bold mt-4">Load More...</button>
            </div>
        </Modal>
      </div>
    </div>
  );
}
