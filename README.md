# 🧠 Quiz App

An advanced **full-stack quiz application** built with **React, Vite, TailwindCSS, Express, and Node.js**, allowing users to take quizzes across multiple categories and difficulty levels with real-time scoring, progress tracking, and review options.

## 🚀 Features

* 🎯 **Category & Difficulty Selection** – Customize your quiz experience
* ⏳ **Real-time Timer** – Challenge yourself under time limits
* ✅ **Answer Review System** – Mark questions for later and revisit before submission
* 📊 **Score Summary** – View detailed results with correct and incorrect answers
* ⚡ **Fast & Responsive UI** – Powered by React, Vite, and TailwindCSS
* 🔗 **RESTful API Backend** – Express-based server for fetching quiz questions dynamically
* 🌐 **Deployed on Vercel (Frontend)** and **Render (Backend)**

---

## 🛠️ Tech Stack

### **Frontend**

* React (Vite)
* TailwindCSS
* Framer Motion (Animations)

### **Backend**

* Node.js
* Express.js
* REST API for quiz data

### **Deployment**

* **Frontend:** Vercel
* **Backend:** Render

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Kumaraditya18/quiz_app.git
cd quiz_app
```

### 2️⃣ Install Dependencies

* **Client:**

```bash
cd client
npm install
```

* **Server:**

```bash
cd ../server
npm install
```

### 3️⃣ Environment Variables

Create a `.env` file in the `client` folder and add:

```
REACT_APP_API_BASE_URL=https://quiz-app-26dn.onrender.com
```

### 4️⃣ Run the Application

* **Start Backend:**

```bash
cd server
npm start
```

* **Start Frontend:**

```bash
cd ../client
npm run dev
```

The app will be available at **[http://localhost:5173](http://localhost:5173)**.

---

## 📦 Deployment

### **Frontend (Vercel)**

* Root Directory: `client`
* Build Command: `npm run build`
* Output Directory: `dist`

### **Backend (Render)**

* Deploy server folder as a **Node.js app** with `npm start`.

---
## 🤝 Contributing

Contributions are welcome! Feel free to fork this repo, create a branch, and submit a PR.

---

## 📜 License

This project is licensed under the **MIT License** – you’re free to use and modify it.


