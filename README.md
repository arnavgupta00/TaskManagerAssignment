# To-Do List Application

This is a simple To-Do List application that allows users to manage their tasks. The application supports creating, reading, updating, and deleting (CRUD) tasks. Each task has a title, description, status (e.g., pending, in-progress, completed), and due date.

### This is an assignment from AI Certs.


## Technologies Used

- Frontend: [Vite](https://vitejs.dev/), React, TypeScript
- Backend: Node.js, TypeScript, Express

## Features

- Display a list of all tasks with their title, status, and due date.
- Edit and delete tasks.
- Create new tasks.
- Update task status.
- Filter tasks (e.g., today's tasks, all tasks).

## Getting Started

### Prerequisites

- Node.js (v14 or above)
- npm (v6 or above)

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/arnavgupta00/TaskManagerAssignment.git
    cd TaskManagerAssignment
    ```

2. Install dependencies for both frontend and backend:

    ```sh
    # Install frontend dependencies
    cd expense-frontend-vite-react
    npm install

    # Install backend dependencies
    cd ../expense-backend-node
    npm install
    ```

### Running the Application

#### Backend (Node.js with TypeScript)

1. Navigate to the backend directory:

    ```sh
    cd expense-backend-node
    ```

2. Build and start the backend server:

    ```sh
    npm start
    ```

    The backend server will run on `http://localhost:3000`.

#### Frontend (Vite)

1. Navigate to the frontend directory:

    ```sh
    cd expense-frontend-vite-react
    ```

2. Start the Vite development server:

    ```sh
    npm run dev
    ```

    The frontend application will run on `http://localhost:5173`.

### API Endpoints

- `GET /api/tasks`: Retrieve all tasks.
- `GET /api/tasks/:id`: Retrieve a single task by ID.
- `POST /api/tasks`: Create a new task.
- `PUT /api/tasks/:id`: Update an existing task by ID.
- `DELETE /api/tasks/:id`: Delete a task by ID.


