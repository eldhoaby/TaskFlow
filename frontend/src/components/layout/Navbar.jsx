import React from "react";
import { CheckSquare, User } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        {/* Logo Section */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
            <CheckSquare size={20} strokeWidth={2.5} />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            TaskFlow
          </span>
        </div>

        {/* Right side - Mock Avatar for SaaS look */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:block text-sm font-medium text-slate-500">
            Welcome back
          </div>
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">
            <User size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
