import React, { useState, useEffect } from "react";
import { Loader2, AlertCircle } from "lucide-react";

import { getTasks, createTask, updateTask, deleteTask } from "./services/api";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { TaskInput } from "./components/task/TaskInput";
import { TaskList } from "./components/task/TaskList";
import { StatsPanel } from "./components/task/StatsPanel";
import { Button } from "./components/ui/Button";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError("Unable to connect to the server. Please make sure the backend is running.");
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (title) => {
    try {
      const newTask = await createTask({ title, completed: false });
      setTasks([...tasks, newTask]);
    } catch (err) {
      console.error("Error adding task:", err);
      alert("Failed to add task. Please try again.");
    }
  };

  const handleToggle = async (id) => {
    try {
      const task = tasks.find((t) => t.id === id);
      const updated = await updateTask(id, {
        ...task,
        completed: !task.completed,
      });
      setTasks(tasks.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      console.error("Error toggling task:", err);
    }
  };

  const handleEdit = async (id, newTitle) => {
    try {
      const task = tasks.find((t) => t.id === id);
      const updated = await updateTask(id, { ...task, title: newTitle });
      setTasks(tasks.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      console.error("Error editing task:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  return (
    <div className="flex min-h-screen flex-col font-sans">
      <Navbar />

      <main className="flex-1 px-4 py-8 sm:px-6 md:py-12">
        <div className="mx-auto max-w-4xl">
          
          {/* Header Area */}
          <div className="mb-10 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-3">
              What are you working on?
            </h1>
            <p className="text-lg text-slate-500 max-w-xl mx-auto">
              Organize your tasks, stay focused, and get more done today.
            </p>
          </div>

          <TaskInput onAdd={handleAddTask} />

          {/* Error State */}
          {error && (
            <div className="mb-8 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700 shadow-sm">
              <AlertCircle size={20} className="shrink-0" />
              <p className="flex-1 text-sm font-medium">{error}</p>
              <Button variant="danger" size="sm" onClick={fetchTasks}>
                Retry
              </Button>
            </div>
          )}

          {/* Main Content Area */}
          {!error && (
            <div className="space-y-6">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                  <Loader2 size={32} className="animate-spin mb-4 text-indigo-500" />
                  <p className="text-sm font-medium">Loading your tasks...</p>
                </div>
              ) : (
                <>
                  <StatsPanel tasks={tasks} />
                  <TaskList
                    tasks={tasks}
                    onToggle={handleToggle}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </>
              )}
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
