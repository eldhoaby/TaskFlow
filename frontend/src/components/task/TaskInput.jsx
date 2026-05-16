import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "../ui/Button";

export function TaskInput({ onAdd }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title.trim());
    setTitle("");
  };

  return (
    <div className="relative mb-8 w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          className="w-full rounded-2xl border border-slate-200/80 bg-white py-4 pl-6 pr-36 text-slate-800 shadow-md shadow-slate-200/40 transition-all duration-300 placeholder:text-slate-400 hover:shadow-lg focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 text-base sm:text-lg"
          autoFocus
        />
        <div className="absolute right-2">
          <Button 
            type="submit" 
            disabled={!title.trim()}
            className="rounded-xl font-semibold shadow-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
          >
            <Plus size={18} className="mr-1" />
            Add Task
          </Button>
        </div>
      </form>
    </div>
  );
}
