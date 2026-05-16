/**
 * TaskForm Component — Add New Tasks
 * =====================================
 *
 * WHAT DOES THIS COMPONENT DO?
 * Renders an input field and an "Add" button.
 * When the user submits, it calls the parent's onAddTask function.
 *
 * PROPS:
 * - onAddTask(title) → Function passed from App.jsx to create a new task
 *
 * HOOKS USED:
 * - useState → To track what the user is typing in the input field
 */

import { useState } from "react";

function TaskForm({ onAddTask }) {
  // State to track the input field value
  const [title, setTitle] = useState("");

  /**
   * Handle form submission
   * Prevents page refresh, validates input, calls parent function
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh (default form behavior)

    // Don't add empty tasks
    if (title.trim() === "") return;

    // Call the parent function to create the task
    onAddTask(title.trim());

    // Clear the input field after adding
    setTitle("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="task-input"
        placeholder="What needs to be done?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        autoFocus
      />
      <button type="submit" className="btn btn-add">
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;
