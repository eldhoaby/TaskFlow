import React from "react";
import { CheckCircle2, CircleDashed, ListTodo } from "lucide-react";

export function StatsPanel({ tasks }) {
  if (tasks.length === 0) return null;

  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;

  const progress = Math.round((completed / total) * 100) || 0;

  return (
    <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        
        {/* Progress Text */}
        <div>
          <h2 className="text-lg font-semibold text-slate-800">Your Progress</h2>
          <p className="text-sm text-slate-500">{progress}% completed</p>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700">
            <ListTodo size={16} className="text-indigo-500" />
            <span>{total} Total</span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700">
            <CheckCircle2 size={16} className="text-emerald-500" />
            <span>{completed} Done</span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 text-sm font-medium text-amber-700">
            <CircleDashed size={16} className="text-amber-500" />
            <span>{pending} Pending</span>
          </div>
        </div>

      </div>

      {/* Progress Bar */}
      <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div 
          className="h-full rounded-full bg-indigo-500 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
