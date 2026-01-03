# POS & Order Management System

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

# Clone the repository
git clone https://github.com/akrs-code/pos-restaurant-system.git
cd pos-restaurant-system

# Backend setup
cd backend
npm install

# Frontend setup
cd ../frontend
npm install

# Create a .env file based on .env.example
# Example:
# PORT=8000
# MONGODB_URI=your_mongodb_uri_here
# JWT_SECRET=your_jwt_secret_here

# Start the backend server
cd ../backend
npm run dev

# Start the frontend (from frontend folder)
cd ../frontend
npm run dev

## 💾 Contribution

# Fork the repository to your account

# Clone your fork
git clone https://github.com/your-username/pos-restaurant-system.git
cd pos-restaurant-system

# Create a new branch for your feature
git checkout -b feature/your-feature

# Make your changes, then stage and commit them
git add .
git commit -m "Add some feature"

# Push your branch to your fork
git push origin feature/your-feature



