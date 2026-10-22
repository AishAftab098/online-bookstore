import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer
      style={{
        background: "linear-gradient(185deg, #1f140c 0%, #120b07 100%)",
        color: "#f3e9dc",
        padding: "45px 20px 25px 20px",
        marginTop: "70px",
        borderTop: "3px solid #8b4a2b",
        boxShadow: "0px -5px 15px rgba(0,0,0,0.3)",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        {/* Brand Name & Tagline */}
        <div style={{ textAlign: "center" }}>
          <h2
            style={{
              margin: "0",
              fontSize: "26px",
              fontWeight: "800",
              color: "#e8c39e",
              letterSpacing: "1px",
            }}
          >
            📚 BookNest
          </h2>
          <p
            style={{
              margin: "8px 0 0 0",
              fontSize: "14px",
              color: "#cbb196",
              maxWidth: "450px",
            }}
          >
            Your ultimate online sanctuary for exploring, reading, and building
            your dream bookshelf.
          </p>
        </div>

        {/* Quick Navigation Pills */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "12px",
            margin: "10px 0",
          }}
        >
          {[
            { name: "Home 🏠", path: "/" },
            { name: "Books 📖", path: "/books" },
            { name: "My Orders 📦", path: "/my-orders" },
            { name: "Wishlist ❤️", path: "/wishlist" },
          ].map((item, index) => (
            <Link
              key={index}
              to={item.path}
              style={{
                color: "#f3e9dc",
                textDecoration: "none",
                fontSize: "13px",
                fontWeight: "600",
                backgroundColor: "rgba(255, 255, 255, 0.07)",
                padding: "8px 16px",
                borderRadius: "20px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                transition: "all 0.3s ease",
              }}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Divider Line */}
        <div
          style={{
            width: "100%",
            maxWidth: "800px",
            height: "1px",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            margin: "10px 0",
          }}
        />

        {/* Copyright & Developer Tag */}
        <div
          style={{
            textAlign: "center",
            fontSize: "13px",
            color: "#9e8874",
            lineHeight: "1.6",
          }}
        >
          <p style={{ margin: "0 0 4px 0" }}>
            © {new Date().getFullYear()}{" "}
            <strong style={{ color: "#d2b48c" }}>BookNest</strong>. All Rights
            Reserved.
          </p>
          <p style={{ margin: "0" }}>
            Crafted with passion & ❤️ by{" "}
            <span
              style={{
                color: "#e8c39e",
                fontWeight: "700",
                borderBottom: "1px dashed #e8c39e",
              }}
            >
              Aisha
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;