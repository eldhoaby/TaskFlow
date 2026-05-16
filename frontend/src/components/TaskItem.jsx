/**
 * TaskItem Component — Single Task Row
 * =======================================
 *
 * WHAT DOES THIS COMPONENT DO?
 * Displays one task with:
 * - Checkbox to toggle completed/pending
 * - Task title (with strikethrough when completed)
 * - Edit button to rename the task
 * - Delete button to remove the task
 *
 * PROPS:
 * - task          → The task object { id, title, completed }
 * - onToggle(id)  → Toggle completed status
 * - onEdit(id, newTitle) → Update task title
 * - onDelete(id)  → Delete the task
 *
 * HOOKS USED:
 * - useState → To manage edit mode and edited title
 */

import { useState } from "react";

function TaskItem({ task, onToggle, onEdit, onDelete }) {
  // State to track if we're in edit mode
  const [isEditing, setIsEditing] = useState(false);
  // State to track the edited title
  const [editTitle, setEditTitle] = useState(task.title);

  /**
   * Save the edited title
   */
  const handleSave = () => {
    if (editTitle.trim() === "") return; // Don't save empty titles
    onEdit(task.id, editTitle.trim());
    setIsEditing(false); // Exit edit mode
  };

  /**
   * Cancel editing and reset to original title
   */
  const handleCancel = () => {
    setEditTitle(task.title); // Reset to original
    setIsEditing(false);
  };

  /**
   * Handle Enter key to save, Escape key to cancel
   */
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") handleCancel();
  };

  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      {/* Checkbox to toggle completed status */}
      <input
        type="checkbox"
        className="task-checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />

      {/* Task Title — Show input when editing, text when not */}
      {isEditing ? (
        <input
          type="text"
          className="task-edit-input"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <span
          className="task-title"
          onDoubleClick={() => setIsEditing(true)} // Double-click to edit
        >
          {task.title}
        </span>
      )}

      {/* Action Buttons */}
      <div className="task-actions">
        {isEditing ? (
          <>
            <button className="btn btn-save" onClick={handleSave}>
              Save
            </button>
            <button className="btn btn-cancel" onClick={handleCancel}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              className="btn btn-edit"
              onClick={() => setIsEditing(true)}
            >
              ✏️
            </button>
            <button
              className="btn btn-delete"
              onClick={() => onDelete(task.id)}
            >
              🗑️
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default TaskItem;
