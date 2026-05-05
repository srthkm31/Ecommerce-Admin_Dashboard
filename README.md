# 🛒 Ecommerce Admin Dashboard (Backend-Focused Project)

## 📌 Overview

This project is a **full-stack ecommerce admin dashboard** built primarily to **revise and strengthen backend concepts and frontend-backend integration**.

The focus of this project is **not UI/UX**, but on:

* API design
* Authentication & authorization
* Database relationships
* Full-stack data flow

> ⚠️ The UI is intentionally kept very basic to prioritize backend logic and system design.

---

## 🚀 Features

### 🔐 Authentication & Authorization

* JWT-based authentication
* Role-based access control (User / Admin)
* Protected routes (frontend + backend)

---

### 👤 User Features

* Browse products
* Place orders
* View personal order history

---

### 🛠️ Admin Features

* Access admin dashboard
* Create products
* View all orders
* Update order status:

  * `pending → shipped → delivered`

---

### 📦 Order Management

* Relational structure:

  * User ↔ Orders ↔ OrderItems ↔ Products
* Quantity handling per product
* Status-based workflow

---

## 🧠 Key Learning Objectives

This project was built to revise:

* REST API design using Express
* Middleware (authentication & role checks)
* Prisma ORM and relational schema design
* Handling async frontend-backend communication
* Debugging real-world issues (401, 500 errors, data types)
* State management and conditional rendering in React

---

## 🧰 Tech Stack

### Frontend

* React (Vite)
* Axios
* Tailwind CSS (basic usage)

### Backend

* Node.js
* Express.js
* Prisma ORM

### Database

* PostgreSQL

---

## 📁 Project Structure

```text
EcommerceAdminDashboard/
│
├── frontend/   # React application
├── server/     # Express + Prisma backend
├── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/ecommerce-admin-dashboard.git
cd ecommerce-admin-dashboard
```

---

### 2️⃣ Backend Setup

```bash
cd server
npm install
```

Create a `.env` file:

```env
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
```

Run migrations:

```bash
npx prisma migrate dev
```

Start backend:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

---

## 🔐 Environment Variables

Create `server/.env`:

```env
DATABASE_URL=your_database_url
JWT_SECRET=your_secret
```

---

## ⚠️ Notes

* This project is **backend-focused**, UI is intentionally minimal
* No production-level styling or UX improvements included
* Designed as a **learning/revision project**, not a production-ready app

---

## 📈 Future Improvements (Optional)

* Product edit/delete (full CRUD)
* Better UI/UX design
* Toast notifications & loading states
* Deployment (frontend + backend)
* Image upload for products

---

## 🎯 Conclusion

This project demonstrates a solid understanding of:

* Full-stack application architecture
* Backend-driven development
* Real-world debugging and integration
