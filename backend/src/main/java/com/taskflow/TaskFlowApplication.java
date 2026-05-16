package com.taskflow;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * TaskFlowApplication — The Main Entry Point
 * ============================================
 *
 * WHAT DOES THIS FILE DO?
 * This is like "node app.js" or "npm start" in Node.js.
 * When you run this file, it starts the entire Spring Boot application.
 *
 * WHAT IS @SpringBootApplication?
 * It's a shortcut that combines 3 annotations:
 * 1. @Configuration    — This class can define beans (objects managed by Spring)
 * 2. @EnableAutoConfiguration — Spring Boot auto-configures everything for us
 * 3. @ComponentScan    — Scans this package and sub-packages for our code
 *
 * HOW IT WORKS:
 * SpringApplication.run() starts:
 * - Embedded Tomcat server (like Express listening on a port)
 * - Connects to MongoDB Atlas automatically
 * - Registers all our Controllers, Services, and Repositories
 */
@SpringBootApplication
public class TaskFlowApplication {

    public static void main(String[] args) {
        // This single line starts the entire application!
        SpringApplication.run(TaskFlowApplication.class, args);
        System.out.println("🚀 TaskFlow Backend is running on http://localhost:8080");
    }
}
