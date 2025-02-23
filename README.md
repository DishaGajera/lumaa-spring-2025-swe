**Overview**
This Task Management application is built with:

   Frontend: React + TypeScript
   Backend: Node.js (Express)
   Database: PostgreSQL
Key Features
   User Authentication:
   Secure JWT-based authentication for login and signup
   Password hashing using bcrypt for enhanced security
Task Management:
   View, create, update (mark as complete, edit), and delete tasks
Database Management:
   PostgreSQL for persistent data storage
   Pre-configured database dump for easy setup

**Deliverables**
Steps to Set Up the Database
   Install PostgreSQL
   
   Download and install from the PostgreSQL official website.
   Create a New Database
   
   using PostgreSQL shell:
      psql -U postgres -c "CREATE DATABASE taskmanagement;"
   
   Restore the Database Dump
   Navigate to the project directory where the dump file is located and run:
      psql -U postgres -d taskmanagement -f database_dump.sql
   
   Verify the Database Setup
   Log in to PostgreSQL:
      psql -U postgres -d taskmanagement
   
   Check tables:
      \dt
   
   Verify sample data:
      SELECT * FROM users;
      SELECT * FROM tasks;

   Update Database Connection in the Project

**Create a .env file inside the server directory and add the following:**

   DB_USER=postgres
   DB_PASSWORD=yourpassword
   DB_HOST=localhost
   DB_PORT=5432
   DB_DATABASE=taskmanagement
   JWT_SECRET=your_secret_key

**How to Run the Frontend**
   Navigate to the frontend directory:
      cd client
   Install dependencies:
      npm install
   Start the development server:
      npm run dev

**How to Run the Backend**
   Navigate to the backend directory:
      cd server
   Install dependencies:
      npm install
   Start the backend server:
      npm run dev

**Short Video Demo**
   Watch the application in action, demonstrating:
   
   User registration and login **(JWT authentication, password hashing)**
   Creating, updating, and deleting tasks
   Watch Demo: https://drive.google.com/file/d/141X3SM_hDP2jUPaYYgeP_oLUsQrwV5-S/view?usp=sharing

**Testing Notes**
   API testing was performed using Postman.
   Verified JWT token expiration and refresh logic.

**Salary Expectations Per Month (Mandatory)**
   Full-time (40 hours/week): $4,500 per month
   Part-time (20 hours/week): $2,100 per month
