# DFCU - HR Management System - Deployment Guide

## Components

1. Frontend (React.js)
2. Backend (Node.js with Express and MySQL)
3. Database (MySQL)

## Prerequisites

- Node.js and npm (or Yarn) installed.
- MySQL installed.
- Git installed (optional but recommended for pulling the project from a repository).

1. Cloning the Repository

Run the command below to clone the repository (Assuming you have git installed)

`git clone https://github.com/agwadan/dfcu-hrms.git`

You can also just download the zip folder containing the project source code.

2. Database Setup (MySQL)

- If you don't have MySQL installed, you will need to download it for the operating system that you're using.

- Import the Database from SQL file: Once MySQL is installed, you can import the database structure and data using the SQL file included in the project repository.

- Create an .env file in your backend directory to configure database connection details and other settings.

```
PORT=3000
DB_HOST=localhost
DB_USER=root or your MySQL username
DB_PASSWORD=your_password
DB_NAME=database_name
JWT_SECRET=your_secret_key

```

3. Backend Setup (Node.js + Express)

- In your terminal, access the backend directory using the command `cd backend`.
- Install the dependencies using `npm install` if you're using npm or `yarn` if you're using yarn.
- Run the command `npm start` or `yarn start` to start the backend.
- Your backend should now be running on port `3000` or whatever port number you set in your `.env` file.

4. Frontend Setup (React.js)

- In your terminal, access the frontend directory using the command `cd frontend`.
- Install the dependencies using `npm install` if you're using npm or `yarn` if you're using yarn.
- Run the command `npm run dev` or `yarn run dev` to start the frontend.
- Your frontend should now be running and can be accessed using the url `http://localhost:5173/`

## Things to Note

- The navigation menu on the client side of the web app is for testing purposes. It does not represent exactly what would appear in the production application.

## URLs for the different functions

- Adding a staff member: `http://localhost:5173/`
- Retrieving staff details: `http://localhost:5173/retrieve`
- Updating staff details: `http://localhost:5173/update`
- Adding New Admin: `http://localhost:5173/register-admin`
- Admin Login: `http://localhost:5173/login-admin`

