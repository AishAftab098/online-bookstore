# 📚 BookNest – Online Bookstore Platform

BookNest is a full-stack online bookstore platform where users can explore books, view book details, add books to their cart and wishlist, and place orders using Cash on Delivery.

# ✨ Features
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
  
# 🛠️ Technologies Used
Frontend
- React.js
- React Router
- Axios
- CSS
  
Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
  
Development Tools
- Vite
- Nodemon
- Git & GitHub
  
# 📂 Project Structure
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

# ⚙️ Installation & Setup
1. Clone the repository
git clone https://github.com/AishAftab098/online-bookstore

2. Navigate to the project
cd "Online Bookstore Platform"

3. Install frontend dependencies
cd client
npm install

4. Start the frontend
npm run dev

The frontend will run on:
http://localhost:5173

5. Install backend dependencies
Open another terminal:
cd server
npm install

6. Configure environment variables
Create a .env file inside the server folder:
MONGO_URI=your_mongodb_connection_string
PORT=5000

7. Start the backend
npm run dev

The backend will run on:
http://localhost:5000

# 🛒 Order Flow
Browse Books
     ↓
Add to Cart
     ↓
Checkout
     ↓
Enter Delivery Details
     ↓
Select Cash on Delivery
     ↓
Place Order
     ↓
Order Saved in MongoDB
     ↓
Order Success

# 💳 Payment
Currently, the project supports Cash on Delivery (COD).
Online payment gateway integration can be added as a future enhancement.

# 🔮 Future Enhancements
- 👤 User authentication and registration
- 🔐 Secure login system
- 💳 Online payment gateway integration
- 📊 Admin dashboard
- 📚 Admin book management
- 📦 Order tracking
- 🔎 Advanced book search and filtering
- ⭐ Book ratings and reviews
- 📧 Order confirmation emails
  
# 👩‍💻 Author
Aish Aftab

📄 License
This project was created for educational and project purposes.

### ⚠️important

Do not push your **`.env` file to GitHub because it might contain MongoDB credentials.

Add these in your `.gitignore` file:

```gitignore
node_modules/
.env                                                               
