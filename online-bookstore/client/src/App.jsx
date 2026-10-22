import React from "react";
import { Routes, Route } from "react-router-dom";

// Components & Pages
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Books from "./pages/Books";
import BookDetails from "./pages/BookDetails";
import Cart from "./pages/cart";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";
import Wishlist from "./pages/wishlist";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />

      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>

      {/* Direct Footer code yhi likh diya hai taaki import ki koi jhanjhat na rahe */}
      <footer
        style={{
          background: "linear-gradient(135deg, #1f140c 0%, #120b07 100%)",
          color: "#f3e9dc",
          padding: "30px 20px",
          textAlign: "center",
          borderTop: "3px solid #8b4a2b",
          marginTop: "auto",
        }}
      >
        <h3 style={{ margin: "0 0 8px 0", color: "#e8c39e" }}>📚 BookNest</h3>
        <p style={{ margin: "0", fontSize: "13px", color: "#cbb196" }}>
          © {new Date().getFullYear()} BookNest. All Rights Reserved. | Crafted with ❤️ by Aisha
        </p>
      </footer>
    </div>
  );
}

export default App;