package com.taskflow.service;

import com.taskflow.model.Task;
import com.taskflow.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * TaskService — The Business Logic Layer
 * ========================================
 *
 * WHAT DOES THIS FILE DO?
 * This is the "brain" of our application. It contains the business logic —
 * the rules for HOW things should work.
 *
 * WHY DO WE NEED A SERVICE LAYER?
 * In the MVC pattern:
 *   Controller → Handles HTTP requests (WHAT endpoint was called?)
 *   Service    → Contains business logic (HOW should we process this?)
 *   Repository → Talks to database (WHERE is the data?)
 *
 * Think of it like a restaurant:
 *   Controller = Waiter (takes your order)
 *   Service    = Chef (prepares the food)
 *   Repository = Kitchen Storage (gets the ingredients)
 *
 * WHAT IS @Service?
 * It tells Spring: "This is a business logic component. Manage it for me."
 * Spring creates ONE instance of this class and reuses it everywhere.
 *
 * WHAT IS @Autowired?
 * It tells Spring: "Inject (provide) the TaskRepository instance here."
 * This is called Dependency Injection — Spring gives us what we need automatically.
 * It's like importing a module in Node.js, but Spring manages the lifecycle.
 */
@Service
public class TaskService {

    @Autowired  // Spring automatically provides the TaskRepository instance
    private TaskRepository taskRepository;

    /**
     * GET ALL TASKS
     * Returns every task from the database.
     * Similar to: const tasks = await Task.find() in Mongoose
     */
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    /**
     * CREATE A NEW TASK
     * Saves a new task to the database and returns the saved task (with generated ID).
     * Similar to: const task = await Task.create({ title, completed }) in Mongoose
     */
    public Task createTask(Task task) {
        // New tasks should start as not completed
        task.setCompleted(false);
        return taskRepository.save(task);
    }

    /**
     * UPDATE AN EXISTING TASK
     * Finds a task by ID, updates its fields, and saves it back.
     * Similar to: await Task.findByIdAndUpdate(id, updates) in Mongoose
     *
     * Optional<Task> is Java's way of handling "might be null" values.
     * It forces us to handle the case where the task doesn't exist.
     */
    public Task updateTask(String id, Task updatedTask) {
        // Step 1: Find the task by ID
        Optional<Task> existingTask = taskRepository.findById(id);

        // Step 2: If found, update it
        if (existingTask.isPresent()) {
            Task task = existingTask.get();
            task.setTitle(updatedTask.getTitle());
            task.setCompleted(updatedTask.isCompleted());
            return taskRepository.save(task);  // save() updates if ID already exists
        }

        // Step 3: If not found, return null (Controller will handle the error)
        return null;
    }

    /**
     * DELETE A TASK
     * Removes a task from the database by its ID.
     * Similar to: await Task.findByIdAndDelete(id) in Mongoose
     */
    public void deleteTask(String id) {
        taskRepository.deleteById(id);
    }
}
