# POS & Order Management System

![GitHub Repo Size](https://img.shields.io/github/repo-size/akrs-code/pos-order-system) 
![GitHub contributors](https://img.shields.io/github/contributors/akrs-code/pos-order-system)
![GitHub license](https://img.shields.io/github/license/akrs-code/pos-order-system)

A **full-featured Point of Sale (POS) and Order Management System** built with **React**, **Node.js**, **Express**, and **MongoDB**, designed to help businesses manage orders, track daily earnings, and generate printable receipts efficiently.

---

## 🚀 Features

- **Order Management:** View, update, and complete orders with detailed item lists.  
- **Daily Earnings Tracking:** Automatically records daily sales and resets every day.  
- **Print Receipts:** Generate and print detailed receipts for customers.  
- **Customer Management:** Store and display customer details for each order.  
- **Dynamic Status Updates:** Mark orders as Processing or Completed, with visual indicators.  
- **Responsive Design:** Works on desktop and tablet screens with modern UI/UX.  
- **Secure Authentication:** JWT-based authentication for secure backend access.  
- **MongoDB Integration:** Stores orders, items, and customer data reliably.

---

## 🛠 Tech Stack

- **Frontend:** React.js, TailwindCSS, React Icons  
- **Backend:** Node.js, Express.js, MongoDB  
- **State Management:** Redux / Zustand  
- **Notifications:** Snackbar / Toast messages for user actions  
- **Environment Variables:** `.env` for database URI, JWT secret, and server port  

---

## 💾 Installation

1. **Clone the repository**

```bash
git clone https://github.com/akrs-code/pos-restaurant-system.git
cd pos-order-system

# Backend
cd backend
npm install

# Frontend
cd frontend
npm install

# Create a .env file based on .env.example:
PORT=8000
MONGODB_URI=your_mongodb_uri_here
JWT_SECRET=your_jwt_secret_here

# Backend
npm run dev

# Frontend (in client folder)
npm run dev

# Contributing
Fork the repository
Create a branch: git checkout -b feature/your-feature
Make changes and commit: git commit -m "Add some feature"
Push to the branch: git push origin feature/your-feature
Open a Pull Request


