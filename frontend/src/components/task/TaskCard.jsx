import React, { useState } from "react";
import { Check, Edit2, Trash2, X } from "lucide-react";
import { cn } from "../../lib/utils";

export function TaskCard({ task, onToggle, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const handleSave = () => {
    if (!editTitle.trim()) return;
    onEdit(task.id, editTitle.trim());
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") {
      setEditTitle(task.title);
      setIsEditing(false);
    }
  };

  return (
    <div
      className={cn(
        "group relative flex items-center gap-4 rounded-2xl border border-slate-200/60 bg-white p-4 sm:p-5 shadow-sm transition-all duration-300 ease-out hover:border-indigo-200 hover:shadow-md hover:shadow-indigo-500/5 overflow-hidden",
        task.completed && "bg-slate-50 text-slate-500"
      )}
    >
      {/* Left Accent Border */}
      <div 
        className={cn(
          "absolute left-0 top-0 h-full w-1 transition-colors duration-300",
          task.completed ? "bg-emerald-400" : "bg-indigo-500 opacity-0 group-hover:opacity-100"
        )} 
      />
      {/* Custom Checkbox */}
      <button
        onClick={() => onToggle(task.id)}
        className={cn(
          "flex h-6 w-6 shrink-0 items-center justify-center rounded border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
          task.completed
            ? "border-indigo-500 bg-indigo-500 text-white"
            : "border-slate-300 bg-transparent hover:border-indigo-400"
        )}
        aria-label="Toggle task"
      >
        {task.completed && <Check size={14} strokeWidth={3} />}
      </button>

      {/* Title Area */}
      <div className="flex-1 overflow-hidden">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full rounded-md border-b-2 border-indigo-500 bg-transparent py-1 pl-1 text-slate-800 focus:outline-none"
              autoFocus
            />
            <button onClick={handleSave} className="text-emerald-600 hover:text-emerald-700 p-1">
              <Check size={18} />
            </button>
            <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-slate-600 p-1">
              <X size={18} />
            </button>
          </div>
        ) : (
          <span
            onDoubleClick={() => setIsEditing(true)}
            className={cn(
              "block truncate text-base transition-colors duration-200",
              task.completed ? "text-slate-600 line-through decoration-slate-400" : "text-slate-800"
            )}
          >
            {task.title}
          </span>
        )}
      </div>

      {/* Action Buttons - Reveal on Hover */}
      {!isEditing && (
        <div className="flex shrink-0 items-center gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100 sm:opacity-100 sm:invisible sm:group-hover:visible">
          <button
            onClick={() => setIsEditing(true)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Edit task"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            aria-label="Delete task"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
