POS & Order Management System

A full-featured Point of Sale (POS) and Order Management System built with React, Node.js, Express, and MongoDB, designed to help businesses manage orders, track daily earnings, and generate printable receipts efficiently.

Features

Order Management: View, update, and complete orders with detailed item lists.

Print Receipts: Generate and print detailed receipts for customers.

Customer Management: Store and display customer details for each order.

Dynamic Status Updates: Mark orders as Processing or Completed, with visual indicators.

Responsive Design: Works on desktop and tablet screens with modern UI/UX.

Secure Authentication: JWT-based authentication for secure backend access.

MongoDB Integration: Stores orders, items, and customer data reliably.

Tech Stack

Frontend: React.js, TailwindCSS, React Icons

Backend: Node.js, Express.js, MongoDB

State Management: Redux / Zustand

Notifications: Snackbar / Toast messages for user actions

Environment Variables: .env for database URI, JWT secret, and server port

Installation

Clone the repository

git clone https://github.com/your-username/pos-order-system.git
cd pos-order-system


Install dependencies for both frontend and backend

npm install        # backend
cd client
npm install        # frontend


Set up environment variables

Create a .env file based on .env.example:

PORT=8000
MONGODB_URI=your_mongodb_uri_here
JWT_SECRET=your_jwt_secret_here


Start the development servers

# Backend
npm run dev

# Frontend (in client folder)
npm start

Usage

Add or view orders on the dashboard.

Mark orders as Processing or Completed.

Print receipts directly from the order card.



Contributing

Fork the repository

Create a new branch: git checkout -b feature/your-feature

Make your changes and commit: git commit -m "Add some feature"

Push to the branch: git push origin feature/your-feature

Open a Pull Request
