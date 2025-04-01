# Todo Application

A simple todo application built with React frontend and PostgreSQL database.

## Project Structure
- `frontend/` - React frontend application
- `backend/` - Node.js backend with Express and PostgreSQL

## Setup Instructions

### Using Docker (Recommended)

1. Make sure you have Docker and Docker Compose installed on your system
   - [Install Docker](https://docs.docker.com/get-docker/)
   - [Install Docker Compose](https://docs.docker.com/compose/install/)

2. Clone the repository:
   ```bash
   git clone <your-repository-url>
   cd todo
   ```

3. Start the application using Docker Compose:
   ```bash
   docker-compose up --build
   ```

4. The application will be available at:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - PostgreSQL Database: localhost:5432

5. To stop the application:
   ```bash
   docker-compose down
   ```

6. To stop the application and remove the database volume:
   ```bash
   docker-compose down -v
   ```

### Manual Setup (Alternative)

#### Backend Setup
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

#### Frontend Setup
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

## Database Configuration
The application uses PostgreSQL with the following default settings:
- Database Name: todo_db
- Username: postgres
- Password: 1234
- Port: 5432

## Environment Variables
### Backend
- DB_USER: postgres
- DB_HOST: localhost (or 'db' when using Docker)
- DB_NAME: todo_db
- DB_PASSWORD: 1234
- DB_PORT: 5432
- PORT: 5000

### Frontend
- REACT_APP_API_URL: http://localhost:5000/api 