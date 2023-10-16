# TaskMaster - To-Do App

TaskMaster is a simple yet powerful to-do list application that allows users to efficiently manage their tasks. It provides a user-friendly interface, robust backend, and essential features to help you stay organized and productive.

![Screenshot from 2023-10-16 12-54-41](https://github.com/Code12Git/Todos-App/assets/108590542/b0e9763c-66c2-45ad-ba37-9cdd229a01c5)


## Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [License](#license)

## Features

 TaskMaster offers the following features:

### User Authentication
- Registration and login to securely manage your to-dos.

### Task Management
- Create, read, update, and delete tasks.
- Search tasks by title.
- Sort tasks by priority.
- Update the status of tasks.
- See tasks accoring to page

### Priority Management
- Change the priority of tasks.

## Prerequisites

Before getting started, make sure you have the following tools and technologies installed:

- Node.js
- PostgreSQL database
- Prisma
- Next.js
- Express

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/taskmaster.git

2. Navigate to the project directory:
   ```bash
   cd Todos-App

3. Install project dependencies for both the frontend and backend:
   ```bash
   cd frontend
   npm install

   cd ../backend
   npm install

## Configuration

### Database Configuration

1. Create a PostgreSQL database and configure your database connection in the backend/prisma/.env file. You can use the .env.example as a template.

2. Apply migrations to create the database tables:   
    ```bash
   cd backend
   npx prisma migrate dev

## Environment Variables
In the backend/.env file, configure the following environment variables:

- JWT_SECRET: A secret key for JWT token generation.
- PORT: Port number for the Express server.
    
## Usage
Start the frontend and backend servers using the following commands:

Frontend (Next.js):

 ```bash
cd frontend
npm run dev
 ```

Backend (Express):
 ```bash
cd backend
npm start
```

Access the TaskMaster application at http://localhost:3000 in your web browser.

## API Endpoints

The following API endpoints are available:

- POST /api/register: Register a new user.
- POST /api/login: Log in an existing user.
- GET /api/todo: Get all tasks.
- GET /api/todo/:id: Get a task by ID.
- POST /api/todo: Create a new task.
- PUT /api/todo/:id: Update a task by ID.
- PATCH /api/todo/:id: Update the status or priority of a task by ID.
- DELETE /api/todo/:id: Delete a task by ID.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

Happy task management with TaskMaster! 📝🚀

```bash
Feel free to replace "yourusername" with your actual GitHub username and customize any other parts of the README as needed.




