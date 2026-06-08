📝 Draftly - Notes Taking Web App

Draftly is a full-stack notes-taking web application designed to let users securely create, manage, and store personal notes. Built with a focus on security and simplicity, it features robust user authentication, protected routing, and a clean, responsive user interface.

---

## 🚀 Features

* 🔐 **Secure Authentication:** User signup and login powered by JWT (JSON Web Tokens) stored securely in HTTP-only cookies.
* 🔑 **Password Hashing:** Industry-standard password encryption using `bcrypt.js`.
*🛡️ **Proper Authorization:** Implements strict data ownership controls, ensuring logged-in users can only view, edit, or delete their own personal notes and are completely restricted from accessing other users' data.
* 📝 **Full CRUD Operations:** Seamlessly create, read, update, and delete personal notes.
* 🔒 **Protected Routes:** Strict route guards ensure users can only access and manage their own notes.
* ⚡ **High Performance:** Fast, lightweight, and scalable backend built on Express.js.
* 🗄️ **Robust Database:** Document-based storage via MongoDB, managed cleanly with Mongoose schemas.
* 🎨 **Responsive UI:** Clean, modern user interface built using EJS templates, HTML, and custom CSS.

---

## 🛠️ Tech Stack

### Frontend
* HTML5 & CSS3
* EJS (Embedded JavaScript Templates)

### Backend
* Node.js
* Express.js

### Database
* MongoDB (via Mongoose ODM)

### Authentication & Security
* JSON Web Tokens (JWT)
* bcrypt.js
* cookie-parser

---

## 📁 Project Structure

```text
notes-app/
│
├── models/          # Mongoose schemas (User.js, Note.js)
├── views/           # EJS templates for the front-end pages
├── public/          # Static assets (CSS, images, client-side JS)
├── server.js           # Main application entry point and server config
├── .env             # Local environment configurations (ignored by git)
└── package.json     # Project dependencies and scripts
```
⚙️ Installation & Setup

Follow these steps to get a local copy of Draftly up and running on your machine.

1. Clone the Repository
```text
git clone [https://github.com/kunalraj1310/draftly.git](https://github.com/kunalraj1310/draftly.git)
cd draftly
```
2. Install Dependencies
```
npm install
```
3. Configure Environment Variables

Create a .env file in the root directory of your project and add the following keys:

Code snippet
```
MONGO_URI=your_mongodb_connection_string
JWT_SEC=your_secret_key
```
⚠️ Note: Replace your_mongodb_connection_string with your actual local or Atlas MongoDB URI, and your_secret_key with a strong random string.

4. Run the Application
To start the server in production mode:
```
node run.js
```
For development with auto-restarting on file changes, use nodemon:
```
nodemon run.js
```
🌐 Deployment
This application can easily be deployed to various cloud hosting platforms:

Backend & Frontend: Render, Railway, or Vercel (requires serverless function adjustment for Express).

Database: MongoDB Atlas for managed cloud database hosting.

⚠️ Common Issues & Troubleshooting
MongooseError: Operation buffering timed out
Fix: Verify your MONGO_URI is correct. If using MongoDB Atlas, ensure your current IP address is whitelisted in the Network Access tab, and verify that your database connection finishes successfully before your Express server begins listening to routes.

Deployment Issues (e.g., on Vercel)
Fix: Avoid opening a new MongoDB connection on every incoming request. Ensure you cache the database connection globally or use standard singleton connection practices to prevent hitting Atlas connection limits.

👨‍💻 Author
Kunal Raj * GitHub: @kunalraj1310

📄 License
This project is licensed under the MIT License. Feel free to use, modify, and distribute it as you see fit.
