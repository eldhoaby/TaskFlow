/**
 * taskApi.js — Axios API Layer
 * ==============================
 *
 * WHAT DOES THIS FILE DO?
 * This is our centralized API file. All HTTP calls to the backend go through here.
 * It's like having one place for all your fetch() calls.
 *
 * WHY USE AXIOS?
 * - Simpler syntax than fetch()
 * - Automatic JSON parsing (no need for response.json())
 * - Better error handling
 * - Works great with async/await
 *
 * HOW IT WORKS:
 * React Component → calls taskApi function → Axios sends HTTP request → Spring Boot receives it
 */

import axios from "axios";

// Base URL of our Spring Boot backend
// In development: React runs on port 5173, Spring Boot on port 8080
const API_URL = "http://localhost:8080/api/tasks";

/**
 * GET all tasks from the backend
 * Calls: GET /api/tasks
 */
export const getTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data; // Axios auto-parses JSON, returns the data directly
};

/**
 * CREATE a new task
 * Calls: POST /api/tasks
 * Sends: { title: "...", completed: false } in the request body
 */
export const createTask = async (task) => {
  const response = await axios.post(API_URL, task);
  return response.data;
};

/**
 * UPDATE an existing task
 * Calls: PUT /api/tasks/{id}
 * Sends: Updated task data in the request body
 */
export const updateTask = async (id, task) => {
  const response = await axios.put(`${API_URL}/${id}`, task);
  return response.data;
};

/**
 * DELETE a task
 * Calls: DELETE /api/tasks/{id}
 */
export const deleteTask = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
