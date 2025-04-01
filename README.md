# Todo Application

A simple todo application built with React frontend and PostgreSQL database.

## Project Structure
- `frontend/` - React frontend application
- `backend/` - Node.js backend with Express and PostgreSQL

## Setup Instructions

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a PostgreSQL database named 'todo_db'
4. Update the database configuration in `backend/config/db.config.js`
5. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm start
   ```

## Features
- Add new todos with person name and task description
- View all todos
- Mark todos as complete
- Delete todos 