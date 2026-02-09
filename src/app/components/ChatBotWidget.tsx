"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useChat } from "../context/ChatContext";
import { usePathname } from "next/navigation";

export default function ChatBotWidget() {
    const { isChatOpen, setIsChatOpen, toggleChat } = useChat();
    const pathname = usePathname();
    
    const [messages, setMessages] = useState([
        { id: 1, text: "Woof! 🐶 I'm Jaga. How can I help you today?", sender: 'bot' }
    ]);
    const [inputValue, setInputValue] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isChatOpen]);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const newUserMsg = { id: Date.now(), text: inputValue, sender: 'user' };
        setMessages(prev => [...prev, newUserMsg]);
        setInputValue("");

        // Mock bot response
        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: "I'm still learning! 🐾 But I'm happy to keep you company.",
                sender: 'bot'
            }]);
        }, 1000);
    };

    // Don't render on login page
    if (pathname === '/') return null;

    return (
        <div className="fixed bottom-24 right-4 z-[90] flex flex-col items-end pointer-events-none md:bottom-24 md:right-4 mobile-chat-container">
            <style jsx>{`
                @media (max-width: 768px) {
                    .mobile-chat-container {
                        bottom: 5.5rem; /* Above nav bar */
                        right: 1rem;
                        left: 1rem;
                        align-items: center; /* Center on mobile */
                    }
                }
            `}</style>

            {/* Chat Window */}
            {isChatOpen && (
                <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 mb-4 w-full md:w-80 h-[50vh] md:h-96 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200 pointer-events-auto">
                    {/* Header */}
                    <div className="bg-primary p-4 flex justify-between items-center text-white">
                        <div className="flex items-center gap-2">
                             <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                                <Image src="/mascot.png" width={32} height={32} alt="Avatar" />
                             </div>
                             <h4 className="font-bold">JAGA Bot</h4>
                        </div>
                        <button onClick={() => setIsChatOpen(false)} className="hover:bg-white/20 rounded-full p-1 transition">✕</button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 custom-scrollbar">
                        {messages.map(msg => (
                            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                                    msg.sender === 'user' 
                                        ? 'bg-primary text-white rounded-tr-none' 
                                        : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none shadow-sm'
                                }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 flex gap-2">
                        <input 
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/50 text-gray-900"
                        />
                        <button type="submit" className="bg-primary text-white p-2 rounded-full w-9 h-9 flex items-center justify-center hover:bg-primary/90 transition shadow-sm">
                            ➤
                        </button>
                    </form>
                </div>
            )}

            {/* Mascot Button (Hidden on Mobile) */}
            <button 
                onClick={toggleChat}
                className="pointer-events-auto transition hover:scale-105 active:scale-95 group relative hidden md:block"
            >
                {!isChatOpen && (
                     <div className="absolute -top-10 right-0 bg-white px-3 py-1.5 rounded-xl rounded-br-none shadow-md border border-gray-100 animate-bounce">
                        <p className="text-xs font-bold text-gray-800 whitespace-nowrap">Need help?</p>
                    </div>
                )}
                <div className="w-16 h-16 rounded-full border-4 border-white shadow-xl overflow-hidden bg-orange-100">
                    <Image 
                        src="/mascot.png" 
                        alt="Jaga Mascot" 
                        width={64} 
                        height={64} 
                        className="object-cover w-full h-full"
                    />
                </div>
            </button>
        </div>
    );
}
