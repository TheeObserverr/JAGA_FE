"use client";
import { createContext, useContext, useState } from "react";

interface ChatContextType {
    isChatOpen: boolean;
    setIsChatOpen: (v: boolean) => void;
    toggleChat: () => void;
}

const ChatContext = createContext<ChatContextType | null>(null);

export function ChatProvider({ children }: { children: React.ReactNode }) {
    const [isChatOpen, setIsChatOpen] = useState(false);

    const toggleChat = () => setIsChatOpen(!isChatOpen);

    return (
        <ChatContext.Provider value={{ isChatOpen, setIsChatOpen, toggleChat }}>
            {children}
        </ChatContext.Provider>
    );
}

export const useChat = () => {
    const context = useContext(ChatContext);
    if (!context) throw new Error("useChat must be used within a ChatProvider");
    return context;
};
