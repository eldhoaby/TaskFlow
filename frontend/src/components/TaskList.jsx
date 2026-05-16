/**
 * TaskList Component — Displays All Tasks
 * ==========================================
 *
 * WHAT DOES THIS COMPONENT DO?
 * Maps over the tasks array and renders a TaskItem for each task.
 * Shows a friendly message when there are no tasks.
 *
 * PROPS:
 * - tasks           → Array of task objects
 * - onToggle(id)    → Passed down to TaskItem
 * - onEdit(id, title) → Passed down to TaskItem
 * - onDelete(id)    → Passed down to TaskItem
 *
 * WHY A SEPARATE COMPONENT?
 * Keeping TaskList separate from App.jsx follows the
 * "Single Responsibility Principle" — each component does ONE thing.
 */

import TaskItem from "./TaskItem";

function TaskList({ tasks, onToggle, onEdit, onDelete }) {
  // Show a message when there are no tasks
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-icon">📝</p>
        <p className="empty-text">No tasks yet. Add one above!</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id} // React needs a unique key for each list item
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default TaskList;
