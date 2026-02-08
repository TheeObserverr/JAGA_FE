"use client";
import PageHeader from "../components/PageHeader";

export default function JagaLinkPage() {
  return (
    <div className="min-h-screen bg-secondary p-6">
      <div className="max-w-3xl mx-auto">
        <PageHeader title="JAGA-Link" />

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
            {/* Map Placeholder */}
            <div className="h-64 bg-gray-200 w-full flex items-center justify-center relative">
                 <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=1.3521,103.8198&zoom=13&size=600x300&sensor=false')] bg-cover opacity-60"></div>
                 
                 {/* Marker */}
                 <div className="bg-white px-4 py-2 rounded-full shadow-xl z-10 animate-bounce flex items-center gap-2 border-2 border-primary/20">
                    <span className="text-2xl">📍</span>
                    <span className="font-bold text-gray-900 text-sm">Uncle Tan</span>
                 </div>

                 {/* Timestamp Overlay */}
                 <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg text-xs shadow-md border border-gray-200">
                    <p className="text-gray-500 font-bold uppercase text-[10px] tracking-wider mb-0.5">Last Updated</p>
                    <p className="text-gray-900 font-bold">Just now</p>
                 </div>
            </div>
            
            <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900">Live Status</h2>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        Safe Zone
                    </span>
                </div>
                <div className="space-y-4">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-500">Device Battery</span>
                        <span className="font-medium text-gray-800">85% 🔋</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-500">Current Speed</span>
                        <span className="font-medium text-gray-800">0 km/h (Stationary)</span>
                    </div>
                </div>
            </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <h3 className="text-red-800 font-bold text-lg mb-2">Emergency Controls</h3>
            <p className="text-red-600 text-sm mb-4">Only use this if you cannot locate Uncle Tan and suspect he is missing.</p>
            <button className="bg-red-600 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-red-200 active:scale-95 transition">
                Report Missing to SPF
            </button>
        </div>
      </div>
    </div>
  );
}
