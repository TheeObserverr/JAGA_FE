"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navigation({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Desktop sidebar state
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // Close services drawer on route change
    useEffect(() => {
        setIsServicesOpen(false);
    }, [pathname]);

    const navItems = [
        { name: "Home", href: "/dashboard", icon: <HomeIcon /> },
        { name: "Care Quest", href: "/care-quest", icon: <CalendarIcon /> },
        { name: "Services", action: () => setIsServicesOpen(true), icon: <GridIcon /> },
        { name: "Profile", href: "/profile", icon: <UserIcon /> },
    ];

    const services = [
        { name: "Care Quest", href: "/care-quest", icon: "📅", color: "bg-blue-100 text-blue-600" },
        { name: "Jiak Ba Buay", href: "/jiak-ba-buay", icon: "🍚", color: "bg-orange-100 text-orange-600" },
        { name: "Med Tracker", href: "/senior/med-log", icon: "💊", color: "bg-red-100 text-red-600" },
        { name: "Family Doctor", href: "/family-doctor", icon: "👨‍⚕️", color: "bg-cyan-100 text-cyan-600" },
        { name: "JAGA Link", href: "/jaga-link", icon: "⌚", color: "bg-green-100 text-green-600" },
        { name: "Tingkat", href: "/tingkat", icon: "🍱", color: "bg-yellow-100 text-yellow-600" },
        { name: "JAGA Together", href: "/jaga-together", icon: "👨‍👩‍👧‍👦", color: "bg-purple-100 text-purple-600" },
        { name: "Leaderboard", href: "/senior/leaderboard", icon: "🏆", color: "bg-amber-100 text-amber-600" },
    ];

    const filteredServices = services.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));

    // Don't show nav on login page
    if (pathname === "/") {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-secondary flex">
            
            {/* --- DESKTOP SIDEBAR --- */}
            <aside 
                className={`hidden md:flex flex-col bg-white border-r border-gray-200 transition-all duration-300 fixed h-full z-40 ${isSidebarOpen ? 'w-64' : 'w-20'}`}
            >
                {/* Header / Hamburger */}
                <div className={`p-4 flex items-center h-16 border-b border-gray-100 ${isSidebarOpen ? 'justify-between' : 'justify-center'}`}>
                    {isSidebarOpen && <span className="font-black text-2xl text-primary tracking-tight">JAGA</span>}
                    <button 
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 hover:bg-gray-100 rounded-lg text-gray-500"
                    >
                        <div className="w-6 h-6">
                            <MenuIcon />
                        </div>
                    </button>
                </div>

                {/* Nav Links */}
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {navItems.map((item, idx) => (
                        item.href ? (
                            <Link 
                                key={idx} 
                                href={item.href}
                                className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${pathname === item.href ? 'bg-primary text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                <span className="w-6 h-6 flex items-center justify-center">{item.icon}</span>
                                {isSidebarOpen && <span className="font-bold text-sm whitespace-nowrap">{item.name}</span>}
                            </Link>
                        ) : (
                             <button 
                                key={idx} 
                                onClick={item.action}
                                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors text-gray-600 hover:bg-gray-50`}
                            >
                                <span className="w-6 h-6 flex items-center justify-center">{item.icon}</span>
                                {isSidebarOpen && <span className="font-bold text-sm whitespace-nowrap">{item.name}</span>}
                            </button>
                        )
                    ))}
                </nav>

                {/* User Profile (Collapsed) */}
                <div className="p-4 border-t border-gray-100">
                     <Link href="/profile" className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg transition">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                            U
                        </div>
                        {isSidebarOpen && (
                            <div className="overflow-hidden">
                                <p className="text-sm font-bold text-gray-900 truncate">Uncle Tan</p>
                                <p className="text-xs text-gray-500 truncate">Senior</p>
                            </div>
                        )}
                    </Link>
                </div>
            </aside>

            {/* --- MAIN CONTENT WRAPPER --- */}
            <main className={`flex-1 transition-all duration-300 flex flex-col min-h-screen ${isSidebarOpen ? 'md:ml-64' : 'md:ml-20'} pb-24 md:pb-0`}>
                {/* Mobile Header (replaces page headers basically) */}
                <div className="md:hidden h-16 bg-white border-b border-gray-200 flex items-center justify-center sticky top-0 z-30">
                     <span className="font-black text-xl text-primary tracking-tight">JAGA</span>
                </div>

                <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
                    {children}
                </div>
            </main>

            {/* --- MOBILE BOTTOM NAV --- */}
            <nav className="md:hidden fixed bottom-6 left-4 right-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200 p-2 z-50 flex justify-around items-center">
                 {navItems.map((item, idx) => (
                     item.href ? (
                        <Link 
                            key={idx} 
                            href={item.href}
                            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${pathname === item.href ? 'text-primary bg-primary/10' : 'text-gray-400'}`}
                        >
                            <span className="w-6 h-6">{item.icon}</span>
                            <span className="text-[10px] font-bold">{item.name}</span>
                        </Link>
                     ) : (
                        <button 
                            key={idx} 
                            onClick={item.action}
                            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${isServicesOpen ? 'text-primary bg-primary/10' : 'text-gray-400'}`}
                        >
                            <span className="w-6 h-6">{item.icon}</span>
                            <span className="text-[10px] font-bold">{item.name}</span>
                        </button>
                     )
                ))}
            </nav>

            {/* --- SERVICES DRAWER (APP DRAWER STYLE) --- */}
            {isServicesOpen && (
                <div className="fixed inset-0 z-[60] flex flex-col">
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsServicesOpen(false)}></div>
                    
                    {/* Drawer Content */}
                    <div 
                        className="relative mt-auto md:mt-0 md:ml-auto md:w-96 h-[85vh] md:h-full bg-secondary rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom md:slide-in-from-right duration-300 touch-none"
                        onTouchStart={(e) => {
                            const touch = e.touches[0];
                            const currentY = touch.clientY;
                            e.currentTarget.setAttribute("data-start-y", currentY.toString());
                        }}
                        onTouchMove={(e) => {
                            const touch = e.touches[0];
                            const startY = parseFloat(e.currentTarget.getAttribute("data-start-y") || "0");
                            const diff = touch.clientY - startY;
                            if (diff > 0) {
                                e.currentTarget.style.transform = `translateY(${diff}px)`;
                            }
                        }}
                        onTouchEnd={(e) => {
                            const startY = parseFloat(e.currentTarget.getAttribute("data-start-y") || "0");
                            const touch = e.changedTouches[0];
                            const diff = touch.clientY - startY;
                            e.currentTarget.style.transform = ""; // Reset
                            if (diff > 100) { // Threshold to close
                                setIsServicesOpen(false);
                            }
                        }}
                    >
                        {/* Drag Handle (Mobile) */}
                        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mt-3 mb-1 md:hidden"></div>

                        {/* Search Bar */}
                        <div className="p-6 bg-white border-b border-gray-100">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-black text-gray-900">Services</h2>
                                <button onClick={() => setIsServicesOpen(false)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                                    <XIcon />
                                </button>
                            </div>
                            <div className="relative">
                                <SearchIcon className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                                <input 
                                    type="text" 
                                    placeholder="Search services..." 
                                    className="w-full bg-gray-100 border-none rounded-xl py-3 pl-10 pr-4 font-medium focus:ring-2 focus:ring-primary outline-none"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    autoFocus
                                />
                            </div>
                        </div>

                        {/* App Grid */}
                        <div className="flex-1 overflow-y-auto p-6">
                            <div className="grid grid-cols-3 md:grid-cols-3 gap-4">
                                {filteredServices.map((service, idx) => (
                                    <Link 
                                        key={idx} 
                                        href={service.href} 
                                        onClick={() => setIsServicesOpen(false)}
                                        className="flex flex-col items-center text-center gap-2 group"
                                    >
                                        <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center text-3xl shadow-sm group-hover:scale-110 transition-transform duration-200`}>
                                            {service.icon}
                                        </div>
                                        <span className="text-xs font-bold text-gray-600 leading-tight group-hover:text-gray-900">{service.name}</span>
                                    </Link>
                                ))}
                            </div>
                            {filteredServices.length === 0 && (
                                <p className="text-center text-gray-400 mt-10">No services found.</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// Icons
function HomeIcon() {
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
}
function CalendarIcon() {
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>;
}
function GridIcon() {
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>;
}
function UserIcon() {
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
}
function MenuIcon() {
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>;
}
function XIcon() {
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 18 12"/></svg>;
}
function SearchIcon({ className }: { className?: string }) {
    return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>;
}
