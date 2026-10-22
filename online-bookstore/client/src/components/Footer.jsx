import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer
      style={{
        background: "linear-gradient(135deg, #1f140c 0%, #120b07 100%)",
        color: "#f3e9dc",
        padding: "40px 20px",
        marginTop: "auto", // Isse footer hamesha bottom par rahega
        borderTop: "3px solid #8b4a2b",
        width: "100%",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <h2 style={{ margin: "0 0 10px 0", color: "#e8c39e" }}>📚 BookNest</h2>
        <p style={{ margin: "0 0 15px 0", fontSize: "14px", color: "#cbb196" }}>
          Your ultimate online sanctuary for exploring and buying books.
        </p>

        <div style={{ margin: "15px 0", display: "flex", justifyContent: "center", gap: "20px" }}>
          <Link to="/" style={{ color: "#f3e9dc", textDecoration: "none" }}>Home</Link>
          <Link to="/books" style={{ color: "#f3e9dc", textDecoration: "none" }}>Books</Link>
          <Link to="/my-orders" style={{ color: "#f3e9dc", textDecoration: "none" }}>My Orders</Link>
        </div>

        <hr style={{ borderColor: "rgba(255,255,255,0.1)", margin: "20px 0" }} />

        <p style={{ fontSize: "13px", color: "#9e8874", margin: 0 }}>
          © {new Date().getFullYear()} BookNest. All Rights Reserved. | Crafted with ❤️ by <strong>Aisha</strong>
        </p>
      </div>
    </footer>
  );
}

export default Footer; // 👈 Yeh line sabse zaroori hai!