package com.taskflow.controller;

import com.taskflow.model.Task;
import com.taskflow.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * TaskController — The REST API Layer
 * =====================================
 *
 * WHAT DOES THIS FILE DO?
 * This is like your Express.js router. It defines API endpoints that the
 * React frontend will call using Axios.
 *
 * API ENDPOINTS:
 * ┌────────┬──────────────────┬──────────────────────────────┐
 * │ Method │ Endpoint         │ Description                  │
 * ├────────┼──────────────────┼──────────────────────────────┤
 * │ GET    │ /api/tasks       │ Get all tasks                │
 * │ POST   │ /api/tasks       │ Create a new task            │
 * │ PUT    │ /api/tasks/{id}  │ Update an existing task      │
 * │ DELETE │ /api/tasks/{id}  │ Delete a task                │
 * └────────┴──────────────────┴──────────────────────────────┘
 *
 * ANNOTATIONS EXPLAINED:
 * @RestController → Combines @Controller + @ResponseBody
 *                   Tells Spring: "This class handles HTTP requests and
 *                   returns JSON data (not HTML pages)"
 *
 * @RequestMapping("/api/tasks") → Base URL for all endpoints in this controller
 *                                  All endpoints start with /api/tasks
 *
 * @CrossOrigin → Allows requests from different origins (ports)
 *                Our React runs on port 5173, backend on port 8080
 *                Without this, browsers block the requests (CORS error)
 *                Similar to: app.use(cors()) in Express.js
 */
@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "*")  // Allow all origins (for development)
public class TaskController {

    @Autowired  // Spring injects the TaskService instance automatically
    private TaskService taskService;

    // ==========================================
    // GET /api/tasks — Get All Tasks
    // ==========================================
    // Similar to: app.get('/api/tasks', async (req, res) => { ... }) in Express
    @GetMapping
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    // ==========================================
    // POST /api/tasks — Create a New Task
    // ==========================================
    // @RequestBody tells Spring: "Parse the JSON body into a Task object"
    // Similar to: app.post('/api/tasks', async (req, res) => { const task = req.body; ... })
    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return taskService.createTask(task);
    }

    // ==========================================
    // PUT /api/tasks/{id} — Update a Task
    // ==========================================
    // @PathVariable extracts 'id' from the URL
    // Similar to: app.put('/api/tasks/:id', async (req, res) => { const { id } = req.params; ... })
    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable String id, @RequestBody Task task) {
        Task updatedTask = taskService.updateTask(id, task);

        // ResponseEntity lets us control the HTTP status code
        if (updatedTask != null) {
            return ResponseEntity.ok(updatedTask);           // 200 OK
        } else {
            return ResponseEntity.notFound().build();        // 404 Not Found
        }
    }

    // ==========================================
    // DELETE /api/tasks/{id} — Delete a Task
    // ==========================================
    // Similar to: app.delete('/api/tasks/:id', async (req, res) => { ... })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable String id) {
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();  // 204 No Content (success, nothing to return)
    }
}
