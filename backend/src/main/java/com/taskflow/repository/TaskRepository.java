package com.taskflow.repository;

import com.taskflow.model.Task;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * TaskRepository — The Database Access Layer
 * =============================================
 *
 * WHAT DOES THIS FILE DO?
 * This is like your database query file. But here's the magic:
 * We DON'T write any database queries! Spring Data MongoDB does it for us.
 *
 * HOW DOES IT WORK?
 * By extending MongoRepository<Task, String>, we get these methods FOR FREE:
 *
 *   findAll()          → Returns all tasks (like Task.find() in Mongoose)
 *   findById(id)       → Find one task by ID (like Task.findById() in Mongoose)
 *   save(task)         → Insert or update a task (like task.save() in Mongoose)
 *   deleteById(id)     → Delete a task by ID (like Task.findByIdAndDelete() in Mongoose)
 *   count()            → Count total tasks
 *   existsById(id)     → Check if a task exists
 *
 * MongoRepository<Task, String> means:
 *   - Task  → The model/document type we're working with
 *   - String → The data type of the ID field (MongoDB uses String IDs)
 *
 * WHAT IS @Repository?
 * It tells Spring: "This is a data access component. Manage it for me."
 * Spring creates an implementation of this interface at runtime.
 *
 * WHY IS THIS AN INTERFACE (not a class)?
 * Because Spring generates the actual code at runtime.
 * We just declare WHAT we need, not HOW to do it. That's the power of Spring!
 */
@Repository
public interface TaskRepository extends MongoRepository<Task, String> {
    // No code needed here! Spring auto-generates all CRUD methods.
    // If you need custom queries later, you can add them here like:
    // List<Task> findByCompleted(boolean completed);
}
