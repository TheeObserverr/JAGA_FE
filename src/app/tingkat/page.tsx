"use client";
import PageHeader from "../components/PageHeader";
import Modal from "../components/Modal";
import { useState } from "react";

export default function TingkatPage() {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [selectedSub, setSelectedSub] = useState<any>(null);

  const subscriptions = [
      { 
          id: 1, 
          name: "Healthy Tingkat (Low Salt)", 
          frequency: "Weekdays (Dinner)", 
          status: "Active", 
          nextDelivery: "Tonight, 6:00 PM",
          supplier: "Kim Paradise Catering",
          menu: ["Steamed Seabass with Soy Sauce", "Stir-fry Kai Lan with Garlic", "Brown Rice", "Winter Melon Soup"],
          description: "Diabetic-friendly meal plan. Low sodium, no MSG, using healthier oil."
      },
      { 
          id: 2, 
          name: "Adult Diapers (L)", 
          frequency: "Monthly", 
          status: "Auto-Refill", 
          nextDelivery: "Feb 28",
          supplier: "NTUC Health",
          items: ["Tena Value Adult Diapers (L) - 10pcs x 3 Packs"],
          description: "High absorbency with leakage protection. Auto-refill set for every 28 days."
      },
  ];

  const pastOrders = [
      { id: 101, item: "Healthy Tingkat - Dinner", date: "Feb 08", status: "Delivered" },
      { id: 102, item: "Adult Diapers (L) x 2", date: "Jan 28", status: "Delivered" },
      { id: 103, item: "Healthy Tingkat - Dinner", date: "Jan 27", status: "Delivered" },
  ];

  return (
    <div className="min-h-screen bg-secondary p-6 pb-32">
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
                <div 
                    key={sub.id} 
                    onClick={() => setSelectedSub(sub)}
                    className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden cursor-pointer hover:shadow-md transition active:scale-[0.98]"
                >
                    <div className="flex justify-between items-start">
                        <div>
                            <h4 className="font-bold text-lg text-gray-900 group-hover:text-primary transition">{sub.name}</h4>
                            <p className="text-gray-500 text-sm">{sub.supplier}</p>
                        </div>
                        <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded uppercase">{sub.status}</span>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center">
                        <div>
                             <p className="text-xs text-gray-400 font-bold uppercase">Next Delivery</p>
                             <p className="text-sm font-bold text-gray-800">{sub.nextDelivery}</p>
                        </div>
                        <span className="text-primary text-sm font-bold">View Details →</span>
                    </div>
                </div>
            ))}
        </div>
        
        {/* Detail Modal */}
        <Modal
            isOpen={!!selectedSub}
            onClose={() => setSelectedSub(null)}
            title={selectedSub?.name || "Details"}
        >
            <div className="space-y-6">
                <div>
                    <h4 className="text-xs font-bold text-gray-500 uppercase mb-1">Supplier / Brand</h4>
                    <p className="text-gray-900 font-bold text-lg">{selectedSub?.supplier}</p>
                </div>

                {selectedSub?.menu && (
                    <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                        <h4 className="text-xs font-bold text-orange-800 uppercase mb-3">🍱 Today's Menu</h4>
                        <ul className="space-y-2">
                            {selectedSub.menu.map((item: string, idx: number) => (
                                <li key={idx} className="flex items-center gap-2 text-gray-800 font-medium text-sm">
                                    <span className="text-orange-500">•</span> {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {selectedSub?.items && (
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                        <h4 className="text-xs font-bold text-blue-800 uppercase mb-2">📦 Package Contents</h4>
                        <ul className="space-y-1">
                            {selectedSub.items.map((item: string, idx: number) => (
                                <li key={idx} className="font-bold text-gray-900">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <div>
                    <h4 className="text-xs font-bold text-gray-500 uppercase mb-1">Description & Notes</h4>
                    <p className="text-gray-600 leading-relaxed text-sm">{selectedSub?.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                    <div>
                         <p className="text-xs text-gray-400 font-bold uppercase">Frequency</p>
                         <p className="font-bold text-gray-900">{selectedSub?.frequency}</p>
                    </div>
                    <div>
                         <p className="text-xs text-gray-400 font-bold uppercase">Status</p>
                         <p className="font-bold text-green-600">{selectedSub?.status}</p>
                    </div>
                </div>

                <button className="w-full bg-gray-100 text-gray-600 font-bold py-3 rounded-xl hover:bg-gray-200 transition">
                    Modify Subscription (Contact Support)
                </button>
            </div>
        </Modal>

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
