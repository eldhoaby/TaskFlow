# TaskFlow — Complete Project Walkthrough

## 📋 What Was Built

A full-stack To-Do application called **TaskFlow** with:
- **Backend**: Spring Boot 3 REST API with MongoDB Atlas
- **Frontend**: React 19 (Vite) with Axios, dark mode, responsive CSS
- **Database**: MongoDB Atlas (cloud)

---

## 📁 Complete File Structure

```
d:\todoapp\
├── backend/
│   ├── .mvn/wrapper/maven-wrapper.properties
│   ├── mvnw.cmd                                ← Maven wrapper (auto-downloads Maven)
│   ├── pom.xml                                 ← Dependencies (like package.json)
│   ├── .gitignore
│   └── src/main/
│       ├── resources/
│       │   └── application.properties          ← MongoDB Atlas URI + server config
│       └── java/com/taskflow/
│           ├── TaskFlowApplication.java        ← Main entry point
│           ├── model/Task.java                 ← Data model (MongoDB document)
│           ├── repository/TaskRepository.java  ← Database access (auto CRUD)
│           ├── service/TaskService.java        ← Business logic
│           └── controller/TaskController.java  ← REST API endpoints
│
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── public/favicon.svg
│   └── src/
│       ├── main.jsx                            ← React entry point
│       ├── App.jsx                             ← Main component (state + logic)
│       ├── App.css                             ← All styles + dark mode
│       ├── api/taskApi.js                      ← Axios HTTP calls
│       └── components/
│           ├── TaskForm.jsx                    ← Add task input + button
│           ├── TaskList.jsx                    ← Maps tasks to TaskItems
│           └── TaskItem.jsx                    ← Single task (toggle/edit/delete)
│
├── .gitignore
└── README.md
```

---

## 🔄 How the App Works (Data Flow)

```
User clicks "Add Task"
       │
       ▼
  TaskForm.jsx (React)
       │ calls handleAddTask()
       ▼
  App.jsx (React State)
       │ calls createTask() from taskApi.js
       ▼
  taskApi.js → axios.post("http://localhost:8080/api/tasks", { title })
       │
       ▼
  TaskController.java → @PostMapping receives the request
       │ calls taskService.createTask(task)
       ▼
  TaskService.java → Business logic
       │ calls taskRepository.save(task)
       ▼
  TaskRepository.java → Spring Data saves to MongoDB
       │
       ▼
  MongoDB Atlas → Document stored in "tasks" collection
       │
       ▼
  Response flows back: MongoDB → Repository → Service → Controller → Axios → React State → UI updates
```

---

## 🧩 Key Java Concepts Used

### 1. **Annotations** (`@`)
Annotations are like decorators/metadata. They tell Spring what to do:
| Annotation | Meaning |
|---|---|
| `@SpringBootApplication` | "This is the main class, start everything" |
| `@RestController` | "This class handles HTTP requests, return JSON" |
| `@Service` | "This class contains business logic" |
| `@Repository` | "This class talks to the database" |
| `@Document` | "This class maps to a MongoDB collection" |
| `@Autowired` | "Spring, please inject this dependency" |
| `@GetMapping` | "Handle GET requests at this URL" |
| `@PostMapping` | "Handle POST requests at this URL" |
| `@CrossOrigin` | "Allow requests from other domains (CORS)" |

### 2. **MVC Pattern**
```
Model      → Task.java (data structure)
View       → React Frontend (separate app)
Controller → TaskController.java (API endpoints)
```
The **Service** layer sits between Controller and Repository for business logic.

### 3. **Dependency Injection**
Instead of creating objects ourselves (`new TaskRepository()`), Spring creates and provides them automatically via `@Autowired`. This is called **Inversion of Control (IoC)**.

### 4. **MongoRepository Interface**
By extending `MongoRepository<Task, String>`, Spring auto-generates all CRUD methods. We write ZERO database queries.

### 5. **Optional<T>**
Java's way of handling nullable values safely. Instead of returning `null`, `findById()` returns `Optional<Task>`, forcing us to check `isPresent()` before using the value.

---

## 🧪 Testing with Postman

### Step 1: Start the Backend
```bash
cd d:\todoapp\backend
mvnw.cmd spring-boot:run
```

### Step 2: Open Postman and test each endpoint:

#### ✅ Create a Task
- **Method**: `POST`
- **URL**: `http://localhost:8080/api/tasks`
- **Body** → Raw → JSON:
```json
{
    "title": "Learn Spring Boot"
}
```
- **Expected**: 200 OK with the created task (including auto-generated `id`)

#### ✅ Get All Tasks
- **Method**: `GET`
- **URL**: `http://localhost:8080/api/tasks`
- **Expected**: 200 OK with array of all tasks

#### ✅ Update a Task
- **Method**: `PUT`
- **URL**: `http://localhost:8080/api/tasks/{paste-id-here}`
- **Body** → Raw → JSON:
```json
{
    "title": "Learn Spring Boot - DONE!",
    "completed": true
}
```
- **Expected**: 200 OK with updated task

#### ✅ Delete a Task
- **Method**: `DELETE`
- **URL**: `http://localhost:8080/api/tasks/{paste-id-here}`
- **Expected**: 204 No Content

---

## 🔧 MongoDB Atlas Setup (Step-by-Step)

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/) and sign in
2. Click **"Build a Database"** → Select **Free (M0) tier**
3. Choose a cloud provider and region → Click **"Create"**
4. **Database Access**: Create a user with username & password
5. **Network Access**: Click **"Add IP Address"** → **"Allow Access from Anywhere"** (0.0.0.0/0)
6. Click **"Connect"** on your cluster → **"Connect your application"**
7. Select **Java** driver → Copy the connection string
8. Paste it in `backend/src/main/resources/application.properties`:
```properties
spring.data.mongodb.uri=mongodb+srv://youruser:yourpassword@cluster0.xxxxx.mongodb.net/taskflow?retryWrites=true&w=majority
```
> ⚠️ Replace `youruser`, `yourpassword`, and the cluster URL with your actual values.

---

## 🌐 Deployment Guide (Beginner-Friendly)

### Backend → Deploy to Render (Free)
1. Push backend code to GitHub
2. Go to [render.com](https://render.com/) → New Web Service
3. Connect your GitHub repo
4. Build Command: `cd backend && ./mvnw clean package -DskipTests`
5. Start Command: `java -jar backend/target/taskflow-backend-1.0.0.jar`
6. Add Environment Variable: `SPRING_DATA_MONGODB_URI` = your Atlas connection string

### Frontend → Deploy to Vercel (Free)
1. Go to [vercel.com](https://vercel.com/) → Import Project
2. Set **Root Directory** to `frontend`
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. Update `taskApi.js` to use your deployed backend URL instead of `localhost:8080`

---

## 🎤 Interview Preparation

### How to Explain This Project (30-second pitch)

> "I built TaskFlow, a full-stack To-Do application using React for the frontend, Spring Boot for the backend REST API, and MongoDB Atlas as the database. The app supports complete CRUD operations — users can add, view, edit, and delete tasks, and toggle their completion status. I used the MVC architecture pattern with separate Controller, Service, and Repository layers. The frontend communicates with the backend through Axios HTTP calls, and I also implemented dark mode and responsive design."

---

### Common Interview Questions

#### Spring Boot Questions
1. **What is Spring Boot?**
   > A Java framework that simplifies building web applications. It provides auto-configuration, embedded server (Tomcat), and starter dependencies.

2. **What is the difference between @Controller and @RestController?**
   > `@Controller` returns views (HTML). `@RestController` = `@Controller` + `@ResponseBody`, returns JSON data directly.

3. **What is Dependency Injection?**
   > Instead of creating objects ourselves, Spring creates them and provides (injects) them where needed. We use `@Autowired` to tell Spring what we need.

4. **What is the MVC pattern?**
   > Model-View-Controller. Model = data, View = UI, Controller = handles requests. Separates concerns for cleaner code.

5. **Why use a Service layer?**
   > To separate business logic from the Controller. Controller handles HTTP, Service handles logic, Repository handles database.

#### MongoDB Questions
6. **Why MongoDB over MySQL?**
   > MongoDB stores data as flexible JSON documents (no rigid table schema). Great for rapid development and when data structures may change.

7. **What is MongoRepository?**
   > A Spring Data interface that provides pre-built CRUD methods. We extend it and get `findAll()`, `save()`, `deleteById()` for free.

#### React Questions
8. **What is useState?**
   > A React hook that lets functional components have state. Returns `[value, setValue]`.

9. **What is useEffect?**
   > A React hook for side effects (API calls, subscriptions). With `[]` dependency, it runs once on component mount.

10. **How does the frontend connect to the backend?**
    > Using Axios to send HTTP requests to the Spring Boot REST API endpoints. The backend returns JSON, which React renders in the UI.

#### Architecture Questions
11. **Explain the data flow in your app.**
    > User action → React component → Axios call → Spring Boot Controller → Service → Repository → MongoDB → Response back through same layers.

12. **What is CORS and why do you need it?**
    > Cross-Origin Resource Sharing. Browsers block requests between different ports (5173 → 8080). `@CrossOrigin` in Spring Boot allows it.

---

### Resume Description

```
TaskFlow — Full Stack To-Do Application
• Built a responsive To-Do application with React (frontend), Spring Boot (backend), and MongoDB Atlas (database)
• Implemented RESTful API with CRUD operations following MVC architecture pattern
• Integrated React frontend with Spring Boot backend using Axios for HTTP communication
• Designed clean UI with dark mode support, loading states, and error handling
• Tech: React, Spring Boot, Spring Data MongoDB, Axios, CSS3, MongoDB Atlas
```

---

### GitHub Repository Description
```
✅ TaskFlow — A full-stack To-Do app built with React, Spring Boot & MongoDB Atlas. Clean MVC architecture, REST APIs, dark mode, responsive UI.
```

### GitHub Topics/Tags
```
react, spring-boot, mongodb, java, full-stack, todo-app, rest-api, 
spring-data-mongodb, axios, crud, mvc-architecture, beginner-friendly
```

---

## ✅ Validation Results

| Check | Status |
|---|---|
| Frontend starts (Vite dev server) | ✅ Runs on port 5173 |
| UI renders correctly | ✅ Clean, responsive, dark mode ready |
| Error handling shows | ✅ "Backend not running" message with retry button |
| Backend code compiles | ⏳ Needs MongoDB Atlas URI configured |
| All components created | ✅ TaskForm, TaskList, TaskItem, App |
| API layer ready | ✅ taskApi.js with all 4 CRUD functions |
| README complete | ✅ Professional with setup instructions |

---

## ⚡ Next Steps for You

1. **Configure MongoDB Atlas** — Update `application.properties` with your Atlas connection string
2. **Start the backend** — Run `mvnw.cmd spring-boot:run` from `d:\todoapp\backend`
3. **Start the frontend** — Run `npm run dev` from `d:\todoapp\frontend`
4. **Test with Postman** — Verify all 4 API endpoints work
5. **Push to GitHub** — `git init`, `git add .`, `git commit`, `git push`
6. **Take screenshots** — Add them to the README
