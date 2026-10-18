import { useState, useEffect } from "react";
import axios from "axios";

// 🌐 Environment Variable configuration for API URL (Local vs Production)
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/books";

function AdminDashboard() {
  // Security & Authentication State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminPasscode, setAdminPasscode] = useState("");

  // Data States
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Form States (For Add & Edit)
  const [editingId, setEditingId] = useState(null); // Null means adding new, ID means editing
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [inStock, setInStock] = useState(true);
  const [loading, setLoading] = useState(false);

  // Check if admin was already logged in
  useEffect(() => {
    const savedAuth = localStorage.getItem("isAdminAuthenticated");
    if (savedAuth === "true") {
      setIsAdminLoggedIn(true);
      fetchBooks();
    }
  }, []);

  // Simple Admin Login Handler
  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPasscode === "admin123") {
      setIsAdminLoggedIn(true);
      localStorage.setItem("isAdminAuthenticated", "true");
      fetchBooks();
    } else {
      alert("❌ Wrong Admin Security Key!");
    }
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem("isAdminAuthenticated");
  };

  // Database se books mangwana
  const fetchBooks = async () => {
    try {
      const res = await axios.get(API_URL);
      setBooks(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching books:", err);
      setBooks([]);
    }
  };

  // Add YA Update karne ka single function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const bookData = {
      title,
      author,
      price: Number(price),
      category,
      image,
      description,
      inStock,
    };

    try {
      if (editingId) {
        // UPDATE existing book
        await axios.put(`${API_URL}/${editingId}`, bookData);
        alert("✏️ Book updated successfully!");
      } else {
        // ADD new book
        await axios.post(API_URL, bookData);
        alert("🎉 New book added successfully!");
      }

      resetForm();
      fetchBooks();
    } catch (err) {
      console.error("Error saving book:", err);
      alert("❌ Operation failed. Please check backend!");
    } finally {
      setLoading(false);
    }
  };

  // Form clear & cancel edit
  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setAuthor("");
    setPrice("");
    setCategory("");
    setImage("");
    setDescription("");
    setInStock(true);
  };

  // Edit Mode On karna
  const handleEdit = (book) => {
    setEditingId(book._id);
    setTitle(book.title);
    setAuthor(book.author);
    setPrice(book.price);
    setCategory(book.category);
    setImage(book.image);
    setDescription(book.description || "");
    setInStock(book.inStock !== undefined ? book.inStock : true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Delete Book
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        alert("🗑️ Book deleted successfully!");
        fetchBooks();
      } catch (err) {
        console.error("Error deleting book:", err);
        alert("❌ Failed to delete book.");
      }
    }
  };

  // Filtered Books for Search
  const filteredBooks = books.filter(
    (b) =>
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Total Inventory Value
  const totalValue = books.reduce((sum, b) => sum + Number(b.price || 0), 0);

  // 🔒 IF NOT LOGGED IN AS ADMIN: Show Access Control Login Screen
  if (!isAdminLoggedIn) {
    return (
      <div style={{ maxWidth: "400px", margin: "100px auto", padding: "30px", background: "#fff", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", textAlign: "center" }}>
        <h2 style={{ marginBottom: "10px", color: "#222" }}>🔒 Admin Access Only</h2>
        <p style={{ color: "#666", fontSize: "14px", marginBottom: "20px" }}>Enter admin passcode to manage store</p>
        <form onSubmit={handleAdminLogin}>
          <input
            type="password"
            placeholder="Enter Admin Key (Default: admin123)"
            value={adminPasscode}
            onChange={(e) => setAdminPasscode(e.target.value)}
            style={{ width: "100%", padding: "12px", borderRadius: "6px", border: "1px solid #ccc", marginBottom: "15px", outline: "none" }}
            required
          />
          <button
            type="submit"
            style={{ width: "100%", padding: "12px", background: "#8B4513", color: "#fff", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}
          >
            Login to Admin Panel
          </button>
        </form>
      </div>
    );
  }

  // 🔓 IF LOGGED IN: Render Full Admin Dashboard
  return (
    <div style={{ maxWidth: "950px", margin: "30px auto", padding: "20px", fontFamily: "sans-serif" }}>
      {/* Header Bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px", borderBottom: "2px solid #eee", paddingBottom: "15px" }}>
        <div>
          <h2 style={{ margin: 0, color: "#222" }}>⚙️ Control Center (Admin)</h2>
          <p style={{ margin: "4px 0 0 0", color: "#666", fontSize: "14px" }}>Manage books, inventory, and catalog settings</p>
        </div>
        <button onClick={handleLogout} style={{ background: "#e74c3c", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>
          Logout 🚪
        </button>
      </div>

      {/* 📊 Analytics Cards Bar */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "15px", marginBottom: "30px" }}>
        <div style={{ background: "#f8f9fa", padding: "15px", borderRadius: "8px", borderLeft: "4px solid #8B4513" }}>
          <span style={{ color: "#666", fontSize: "13px" }}>Total Titles</span>
          <h3 style={{ margin: "5px 0 0 0", fontSize: "22px" }}>{books.length} Books</h3>
        </div>
        <div style={{ background: "#f8f9fa", padding: "15px", borderRadius: "8px", borderLeft: "4px solid #27ae60" }}>
          <span style={{ color: "#666", fontSize: "13px" }}>Total Catalog Value</span>
          <h3 style={{ margin: "5px 0 0 0", fontSize: "22px" }}>₹{totalValue}</h3>
        </div>
        <div style={{ background: "#f8f9fa", padding: "15px", borderRadius: "8px", borderLeft: "4px solid #2980b9" }}>
          <span style={{ color: "#666", fontSize: "13px" }}>Categories Count</span>
          <h3 style={{ margin: "5px 0 0 0", fontSize: "22px" }}>{[...new Set(books.map((b) => b.category))].length} Unique</h3>
        </div>
      </div>

      {/* 📝 Add / Edit Form */}
      <div style={{ background: "#fff", padding: "25px", borderRadius: "10px", boxShadow: "0 2px 10px rgba(0,0,0,0.06)", marginBottom: "35px" }}>
        <h3 style={{ marginTop: 0, color: "#333" }}>{editingId ? "✏️ Edit Book Details" : "➕ Add New Book to Store"}</h3>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
            <div>
              <label style={{ fontSize: "13px", fontWeight: "bold" }}>Book Title *</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required style={{ width: "100%", padding: "9px", borderRadius: "5px", border: "1px solid #ccc" }} />
            </div>
            <div>
              <label style={{ fontSize: "13px", fontWeight: "bold" }}>Author Name *</label>
              <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required style={{ width: "100%", padding: "9px", borderRadius: "5px", border: "1px solid #ccc" }} />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "15px" }}>
            <div>
              <label style={{ fontSize: "13px", fontWeight: "bold" }}>Price (₹) *</label>
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required style={{ width: "100%", padding: "9px", borderRadius: "5px", border: "1px solid #ccc" }} />
            </div>
            <div>
              <label style={{ fontSize: "13px", fontWeight: "bold" }}>Category *</label>
              <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required style={{ width: "100%", padding: "9px", borderRadius: "5px", border: "1px solid #ccc" }} />
            </div>
            <div>
              <label style={{ fontSize: "13px", fontWeight: "bold" }}>Stock Status</label>
              <select value={inStock} onChange={(e) => setInStock(e.target.value === "true")} style={{ width: "100%", padding: "9px", borderRadius: "5px", border: "1px solid #ccc" }}>
                <option value="true">In Stock</option>
                <option value="false">Out of Stock</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ fontSize: "13px", fontWeight: "bold" }}>Image URL *</label>
            <input type="url" value={image} onChange={(e) => setImage(e.target.value)} required style={{ width: "100%", padding: "9px", borderRadius: "5px", border: "1px solid #ccc" }} />
            
            {/* 📸 Image Preview Component Added Here */}
            {image && (
              <div style={{ marginTop: "10px", padding: "10px", border: "1px solid #e0e0e0", borderRadius: "8px", backgroundColor: "#f9f9f9", display: "inline-block" }}>
                <p style={{ margin: "0 0 5px 0", fontSize: "12px", color: "#666" }}>📸 Image Preview:</p>
                <img 
                  src={image} 
                  alt="Preview" 
                  style={{ width: "70px", height: "95px", objectFit: "cover", borderRadius: "6px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
            )}
          </div>

          <div>
            <label style={{ fontSize: "13px", fontWeight: "bold" }}>Description *</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="3" required style={{ width: "100%", padding: "9px", borderRadius: "5px", border: "1px solid #ccc" }} />
          </div>

          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <button
              type="submit"
              disabled={loading}
              style={{ flex: 1, padding: "11px", background: editingId ? "#2980b9" : "#8B4513", color: "#fff", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}
            >
              {loading ? "Processing..." : editingId ? "Update Book Details" : "+ Save Book"}
            </button>
            {editingId && (
              <button type="button" onClick={resetForm} style={{ padding: "11px 20px", background: "#7f8c8d", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}>
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      {/* 🔍 Inventory Search & Book List */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
        <h3 style={{ margin: 0, color: "#333" }}>📚 Live Catalog ({filteredBooks.length})</h3>
        <input
          type="text"
          placeholder="🔍 Search inventory..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ padding: "8px 14px", width: "250px", borderRadius: "20px", border: "1px solid #ccc", outline: "none" }}
        />
      </div>

      {/* Inventory List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {filteredBooks.length === 0 ? (
          <p style={{ color: "#888", textAlign: "center", padding: "20px" }}>No books matching search.</p>
        ) : (
          filteredBooks.map((book) => (
            <div
              key={book._id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 16px",
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                <img src={book.image} alt={book.title} style={{ width: "45px", height: "60px", objectFit: "cover", borderRadius: "4px" }} />
                <div>
                  <strong style={{ fontSize: "15px", color: "#1a202c" }}>{book.title}</strong>
                  <div style={{ fontSize: "13px", color: "#718096", marginTop: "2px" }}>
                    {book.author} · <span style={{ color: "#8B4513", fontWeight: "bold" }}>₹{book.price}</span> · Category: {book.category}
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  onClick={() => handleEdit(book)}
                  style={{ background: "#edf2f7", color: "#2b6cb0", border: "1px solid #cbd5e0", padding: "6px 12px", borderRadius: "5px", cursor: "pointer", fontSize: "13px", fontWeight: "600" }}
                >
                  Edit ✏️
                </button>
                <button
                  onClick={() => handleDelete(book._id)}
                  style={{ background: "#fff5f5", color: "#c53030", border: "1px solid #feb2b2", padding: "6px 12px", borderRadius: "5px", cursor: "pointer", fontSize: "13px", fontWeight: "600" }}
                >
                  Delete 🗑️
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;