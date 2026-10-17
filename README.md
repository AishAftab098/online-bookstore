# 📚 BookNest – Online Bookstore Platform

BookNest is a full-stack online bookstore platform where users can explore books, view book details, add books to their cart and wishlist, and place orders using Cash on Delivery.

---

## ✨ Features

- 🏠 User-friendly Home page
- 📚 Browse available books
- 🔍 View detailed information about individual books
- 🛒 Add books to Cart
- ➕ Increase or decrease book quantity
- ❌ Remove books from Cart
- ❤️ Add and manage Wishlist
- 📦 Checkout with delivery details
- 💵 Cash on Delivery option
- ✅ Order confirmation page
- 🆔 Automatic Order ID generation
- 🗄️ Store orders in MongoDB
- 📱 Responsive and clean user interface

---

## 🛠️ Technologies Used

### Frontend
- React.js
- React Router
- Axios
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Development Tools
- Vite
- Nodemon
- Git & GitHub

---

## 📂 Project Structure

```text
Online Bookstore Platform/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── App.css
│   └── package.json
│
└── server/
    ├── models/
    │   ├── Book.js
    │   └── Order.js
    ├── routes/
    │   ├── bookRoutes.js
    │   └── orderRoutes.js
    ├── server.js
    └── package.json
⚙️ Installation & Setup
Clone the repository

Bash
git clone [https://github.com/AishAftab098/online-bookstore](https://github.com/AishAftab098/online-bookstore)
Navigate to the project

Bash
cd "Online Bookstore Platform"
Install frontend dependencies

Bash
cd client
npm install
Start the frontend

Bash
npm run dev
The frontend will run on: http://localhost:5173

Install backend dependencies (Open another terminal)

Bash
cd server
npm install
Configure environment variables
Create a .env file inside the server folder and add your credentials:

Code snippet
MONGO_URI=your_mongodb_connection_string
PORT=5000
Start the backend

Bash
npm run dev
The backend will run on: http://localhost:5000

🛒 Order Flow
Plaintext
Browse Books → Add to Cart → Checkout → Enter Delivery Details → Select Cash on Delivery → Place Order → Order Saved in MongoDB → Order Success

💳 Payment
Currently, the project supports Cash on Delivery (COD). Online payment gateway integration can be added as a future enhancement.

🔮 Future Enhancements
👤 User authentication and registration

🔐 Secure login system

💳 Online payment gateway integration

📊 Admin dashboard

📚 Admin book management

📦 Order tracking

🔎 Advanced book search and filtering

⭐ Book ratings and reviews

📧 Order confirmation emails

⚠️ Important Security Note
Do not push your .env file to GitHub because it contains sensitive MongoDB credentials.

Make sure your root-level .gitignore file includes the following entries:

Code snippet
node_modules/
.env

👩‍💻 Author
Aish Aftab

📄 License
This project was created for educational and project purposes.
