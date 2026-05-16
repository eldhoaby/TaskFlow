import React from "react";
import { Sparkles } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50/50 py-16 px-6 text-center shadow-sm">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 shadow-sm ring-8 ring-indigo-50/50">
        <Sparkles size={28} className="text-indigo-500" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-slate-800">No tasks yet</h3>
      <p className="max-w-[16rem] text-sm text-slate-500">
        Your list is clear! Add a task above to start organizing your day.
      </p>
    </div>
  );
}
