#  Wisdom Academy Football (W.A.F) - Official Website & Admin Portal

A modern, full-stack web application for Wisdom Academy Football, featuring a responsive public website for players & parents, and a secure, JWT-protected admin dashboard for managing registrations, news, events, and media.

##  Features

### 🌐 Public Website
- Responsive homepage with hero section, mission/vision/values, and development tiers
- News & events feed with category filtering
- Player registration form with validation & success feedback
- Contact form & academy location map
- Newsletter subscription & social media integration

### 🛡️ Admin Dashboard
- JWT Authentication: Secure login with role-based access control
- Analytics Overview: Total players, pending registrations, gallery stats
- Registration Manager: View, filter, search, approve/reject player applications
- News & Events CRUD: Create, publish, and delete articles/events
- Media Gallery: Drag-and-drop image/video upload with preview & delete
- Responsive UI: Collapsible sidebar, mobile-friendly layout, toast notifications

### 🛠️ Tech Stack
Frontend: HTML5, CSS3, Vanilla JavaScript, Bootstrap 5 
Backend: Node.js, Express.js 
Database: MongoDB + Mongoose ODM 
Auth: JSON Web Tokens (JWT), bcryptjs 
File Uploads: Multer (Admin Gallery) 
Dev Tools: Nodemon, dotenv, express-validator, helmet, cors 

### Project Structure

wisdom-academy-football/
├── backend/
│   ├── src/
│   │   ├── config/db.js
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/seedAdmin.js
│   │   └── app.js
│   ├── uploads/
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── admin/
│   │   ├── css/admin.css
│   │   ├── js/admin.js
│   │   ├── dashboard.html
│   │   ├── registrations.html
│   │   ├── news.html
│   │   └── gallery.html
│   ├── css/style.css
│   ├── js/api.js, auth.js, main.js
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   └── assets/
│
├── .gitignore
└── README.md
