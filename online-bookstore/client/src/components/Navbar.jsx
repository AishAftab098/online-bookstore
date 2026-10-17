import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

function Navbar() {
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();
  const navigate = useNavigate();

  // Modal states
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Check if user is logged in
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("Logged out successfully! 👋");
    window.location.reload();
  };

  // Handle Login API
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("Login Successful! 🎉");
        setShowLoginModal(false);
        window.location.reload();
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Server connection failed");
    }
  };

  // Handle Signup API
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Registration Successful! Please login. ✅");
        setShowSignupModal(false);
        setShowLoginModal(true);
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      setError("Server connection failed");
    }
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="logo">
          <span className="logo-icon">📚</span>
          Book<span>Nest</span>
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/books">Books</Link>
          <Link to="/books">Explore</Link>
          <Link to="/my-orders">My Orders</Link>
          <Link to="/admin">Admin Dashboard</Link>
        </div>

        <div className="nav-actions">
          <Link to="/books" className="nav-search-icon">🔍</Link>
          <Link to="/cart" className="nav-cart">🛒<span>{cartCount}</span></Link>
          <Link to="/wishlist" className="profile-icon">♡<span>{wishlistItems.length}</span></Link>

          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginLeft: "15px" }}>
              <span style={{ fontWeight: "600", fontSize: "14px" }}>👤 {user.name}</span>
              <button 
                onClick={handleLogout} 
                style={{ 
                  background: "#dc3545", 
                  color: "#fff", 
                  border: "none", 
                  padding: "5px 12px", 
                  borderRadius: "15px", 
                  cursor: "pointer", 
                  fontWeight: "600",
                  fontSize: "13px"
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <button 
                onClick={() => setShowLoginModal(true)} 
                style={{ marginLeft: "15px", background: "#111", color: "#fff", border: "none", padding: "6px 16px", borderRadius: "20px", cursor: "pointer", fontWeight: "600" }}
              >
                Login
              </button>
              <button 
                onClick={() => setShowSignupModal(true)} 
                style={{ marginLeft: "10px", background: "#111", color: "#fff", border: "none", padding: "6px 16px", borderRadius: "20px", cursor: "pointer", fontWeight: "600" }}
              >
                Signup
              </button>
            </>
          )}
        </div>
      </nav>

      {/* --- LOGIN MODAL --- */}
      {showLoginModal && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <span style={closeBtnStyle} onClick={() => setShowLoginModal(false)}>&times;</span>
            <h2>Welcome Back to BookNest ✨</h2>
            {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}
            <form onSubmit={handleLogin}>
              <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required style={inputStyle} />
              <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required style={inputStyle} />
              <button type="submit" style={submitBtnStyle}>Login</button>
            </form>
            <p style={{ marginTop: "15px", fontSize: "14px" }}>
              Don't have an account? <span style={{ color: "#007bff", cursor: "pointer" }} onClick={() => { setShowLoginModal(false); setShowSignupModal(true); }}>Signup here</span>
            </p>
          </div>
        </div>
      )}

      {/* --- SIGNUP MODAL --- */}
      {showSignupModal && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <span style={closeBtnStyle} onClick={() => setShowSignupModal(false)}>&times;</span>
            <h2>Create an Account 🚀</h2>
            {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}
            <form onSubmit={handleSignup}>
              <input type="text" placeholder="Enter your full name" value={name} onChange={(e) => setName(e.target.value)} required style={inputStyle} />
              <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required style={inputStyle} />
              <input type="password" placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} required style={inputStyle} />
              <button type="submit" style={{ ...submitBtnStyle, background: "#28a745" }}>Register</button>
            </form>
            <p style={{ marginTop: "15px", fontSize: "14px" }}>
              Already have an account? <span style={{ color: "#007bff", cursor: "pointer" }} onClick={() => { setShowSignupModal(false); setShowLoginModal(true); }}>Login here</span>
            </p>
          </div>
        </div>
      )}
    </>
  );
}

const modalOverlayStyle = {
  position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000,
  backdropFilter: "blur(4px)"
};

const modalContentStyle = {
  backgroundColor: "#fff", padding: "30px", borderRadius: "12px", width: "380px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.2)", position: "relative", textAlign: "center"
};

const closeBtnStyle = {
  position: "absolute", top: "10px", right: "15px", fontSize: "24px", cursor: "pointer", color: "#aaa"
};

const inputStyle = {
  width: "100%", padding: "10px 12px", margin: "10px 0", borderRadius: "6px",
  border: "1px solid #ddd", boxSizing: "border-box", fontSize: "14px"
};

const submitBtnStyle = {
  width: "100%", padding: "12px", background: "#111", color: "#fff",
  border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer", marginTop: "10px"
};

export default Navbar;