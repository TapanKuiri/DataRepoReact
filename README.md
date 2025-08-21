# 📂 FILENEST App  

A full-stack web application where users can **upload, view, delete, and download files** securely.  
Built with **React, Node.js, Express, MongoDB, Cloudinary**, and styled using **Tailwind CSS**.  

🔗 **Live Demo**: [[Website Link](https://your-deployed-link.com)  ](https://filenest-one.vercel.app/)

---

## 🚀 Features  

- 🔑 **User Authentication**  
  - Secure login & signup with **JWT**  
  - Passwords hashed using **bcrypt.js**  

- 📤 **File Upload**  
  - Files uploaded via **Cloudinary** (supports images, PDFs, docs, etc.)  
  - File metadata stored in **MongoDB**  

- 👁️ **File Management**  
  - View files directly in the browser (PDFs, images, etc.)  
  - Download files with proper filename support  
  - Delete files securely  

- 🎨 **Modern UI**  
  - Responsive, clean design with **Tailwind CSS**  

- 🌍 **Deployment**  
  - Fully deployed and accessible online  

---

## 🛠️ Tech Stack  

### Frontend  
- ⚛️ React.js  
- 🎨 Tailwind CSS  
- 🔔 React Toastify (notifications)  
- 🌐 Axios (API calls)  

### Backend  
- 🟢 Node.js  
- ⚡ Express.js  
- 🗄️ MongoDB (Mongoose)  
- 🔐 JWT (Authentication)  
- 🔒 bcrypt.js (Password hashing)  
- ☁️ Cloudinary (File storage)  

---

## 📸 Screenshots  
<img width="1892" height="944" alt="image" src="https://github.com/user-attachments/assets/41b16f93-a1c9-448e-a129-47c3bd40f608" />
<img width="1909" height="934" alt="image" src="https://github.com/user-attachments/assets/d4246b46-ac91-44d8-adc6-59d400741e9d" />
<img width="1900" height="949" alt="image" src="https://github.com/user-attachments/assets/734fd0a6-4b75-454e-8c4c-873956e6ac8c" />



## 📂 Project Structure  

FILENEST
├── backend # Backend code (Node.js + Express)
│ ├── config # Configuration files (DB, Cloudinary)
│ ├── controllers # Route controllers (fileController, userController)
│ ├── middleware # Middlewares (authUser, multer)
│ ├── models # MongoDB models (userModel)
│ ├── routes # API routes
│ ├── server.js # Entry point of backend server
│ ├── .env # Environment variables (ignored in Git)
│ ├── package.json # Backend dependencies
│ └── vercel.json # Deployment config (if using Vercel)
│
├── client # Frontend code (React + Vite)
│ ├── public # Static files
│ ├── src # Main source folder
│ │ ├── assets # Images, icons, static assets
│ │ ├── components # Reusable UI components
│ │ ├── context # React Context (state management)
│ │ ├── pages # Application pages
│ │ ├── App.css # Global styles
│ │ ├── App.jsx # Root React component
│ │ ├── index.css # Tailwind & global CSS
│ │ └── main.jsx # Entry point of React app
│ ├── .env # Frontend environment variables
│ ├── package.json # Frontend dependencies
│ ├── vite.config.js # Vite config file
│ └── vercel.json # Deployment config (if using Vercel)
│
├── .gitignore # Git ignore rules
├── README.md # Project documentation
└── package-lock.json # Lock file for dependencies


