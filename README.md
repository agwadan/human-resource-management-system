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

- Import the Database from SQL file in the database folder: Once MySQL is installed, you can import the database structure and data using the SQL file included in the project repository.

- Create an .env file in your backend directory to configure database connection details and other settings.

```PORT=3000
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
- The auth generated code for testing purposes is `1234567890`

## URLs for the different functions on the client side

- Adding a staff member: `http://localhost:5173/`
- Retrieving staff details: `http://localhost:5173/retrieve`
- Updating staff details: `http://localhost:5173/update`
- Adding New Admin: `http://localhost:5173/register-admin`
- Admin Login: `http://localhost:5173/login-admin`

## Screenshots

### Register New Staff
![image](https://github.com/user-attachments/assets/c97d3d8a-330c-4504-8861-5502444d3010)

### Retrieving Staff Details
![image](https://github.com/user-attachments/assets/6f5cb9bd-a9a8-4b77-affd-2e06feea0a05)

### Retrieving Staff Details (One Staff Member)
![image](https://github.com/user-attachments/assets/f8eda3a7-7ff3-432e-860e-deba2ae0f200)

### Updating Staff Details 
![image](https://github.com/user-attachments/assets/2d0f3aec-fb02-4780-b296-47c19e5245b5)

### Admin Login
![image](https://github.com/user-attachments/assets/446f92d9-11e1-4d7e-a1c6-f52d114d992c)

### Admin Dashboard
![image](https://github.com/user-attachments/assets/1488aa4c-1eaa-47b2-aaff-8692abe1019f)

# Proposed next steps
- ### Hosting the Backend on a Cloud Service
To make the system production-ready, the backend should be hosted on a cloud service like AWS. 
- ### Implement the Authentication Code Generation
Currently, the authentication code is manually input for testing purposes. In the next iteration, implement automatic generation of the authentication code when the admin is adding a new staff member.
- ### Move Database to Cloud
Move the MySQL database to a cloud service like Amazon RDS or Google Cloud SQL to improve scalability and security.
- ### Refine Frontend UI/UX
Improve the user interface and experience by integrating better form validation, error handling, and a more user-friendly design.
- ### Set Up Continuous Integration/Continuous Deployment (CI/CD)
Automate testing, building, and deployment processes using tools like GitHub Actions.