import React from "react";
import { TaskCard } from "./TaskCard";
import { EmptyState } from "../ui/EmptyState";

export function TaskList({ tasks, onToggle, onEdit, onDelete }) {
  if (tasks.length === 0) {
    return <EmptyState />;
  }

  // Sort tasks: pending first, then completed. Then by creation (id sort)
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed === b.completed) return 0;
    return a.completed ? 1 : -1;
  });

  return (
    <div className="flex flex-col gap-3">
      {sortedTasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
