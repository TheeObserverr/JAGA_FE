"use client";
import { useRouter } from "next/navigation";

export default function PageHeader({ title }: { title: string }) {
  const router = useRouter();
  return (
    <div className="flex items-center gap-4 mb-6">
      <button 
        onClick={() => router.back()} 
        className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-600 hover:bg-gray-50"
      >
        ←
      </button>
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
    </div>
  );
}
