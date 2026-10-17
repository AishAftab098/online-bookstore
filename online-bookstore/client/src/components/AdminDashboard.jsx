import { useState, useEffect } from "react";
import axios from "axios";

function AdminDashboard() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // Database se saari books fetch karna
  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/books");
      setBooks(res.data);
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Naya book add karne ka function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newBook = {
      title,
      author,
      price: Number(price),
      category,
      image,
      description,
    };

    try {
      await axios.post("http://localhost:5000/api/books", newBook);
      alert("🎉 Book added successfully!");

      // Form clear kar do
      setTitle("");
      setAuthor("");
      setPrice("");
      setCategory("");
      setImage("");
      setDescription("");

      // List ko refresh karo taaki nayi book turant list mein dikhe
      fetchBooks();
    } catch (err) {
      console.error("Error adding book:", err);
      alert("❌ Failed to add book. Please check backend server!");
    } finally {
      setLoading(false);
    }
  };

  // Book delete karne ka function
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await axios.delete(`http://localhost:5000/api/books/${id}`);
        alert("🗑️ Book deleted successfully!");
        fetchBooks(); // List refresh karo
      } catch (err) {
        console.error("Error deleting book:", err);
        alert("❌ Failed to delete book.");
      }
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto", padding: "30px", background: "#fff", borderRadius: "12px", boxShadow: "0 4px 15px rgba(0,0,0,0.08)" }}>
      <h2 style={{ fontSize: "24px", marginBottom: "8px", color: "#222" }}>Admin Dashboard</h2>
      <p style={{ color: "#666", marginBottom: "25px", fontSize: "14px" }}>Add new books and manage your bookstore database</p>

      {/* Add Book Form */}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "40px" }}>
        <h3 style={{ fontSize: "18px", color: "#333", borderBottom: "2px solid #eee", paddingBottom: "8px" }}>Add New Book</h3>
        
        <div>
          <label style={{ display: "block", fontWeight: "600", marginBottom: "6px", fontSize: "14px" }}>Book Title *</label>
          <input
            type="text"
            placeholder="e.g. Think Like a Monk"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: "100%", padding: "10px 14px", borderRadius: "6px", border: "1px solid #ccc", outline: "none" }}
          />
        </div>

        <div>
          <label style={{ display: "block", fontWeight: "600", marginBottom: "6px", fontSize: "14px" }}>Author Name *</label>
          <input
            type="text"
            placeholder="e.g. Jay Shetty"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            style={{ width: "100%", padding: "10px 14px", borderRadius: "6px", border: "1px solid #ccc", outline: "none" }}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div>
            <label style={{ display: "block", fontWeight: "600", marginBottom: "6px", fontSize: "14px" }}>Price (₹) *</label>
            <input
              type="number"
              placeholder="e.g. 450"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              style={{ width: "100%", padding: "10px 14px", borderRadius: "6px", border: "1px solid #ccc", outline: "none" }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontWeight: "600", marginBottom: "6px", fontSize: "14px" }}>Category *</label>
            <input
              type="text"
              placeholder="e.g. Motivation, Fiction"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              style={{ width: "100%", padding: "10px 14px", borderRadius: "6px", border: "1px solid #ccc", outline: "none" }}
            />
          </div>
        </div>

        <div>
          <label style={{ display: "block", fontWeight: "600", marginBottom: "6px", fontSize: "14px" }}>
            Image URL * <span style={{ fontWeight: "normal", color: "#888", fontSize: "12px" }}>(Google Image Address)</span>
          </label>
          <input
            type="url"
            placeholder="https://..."
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
            style={{ width: "100%", padding: "10px 14px", borderRadius: "6px", border: "1px solid #ccc", outline: "none" }}
          />
        </div>

        <div>
          <label style={{ display: "block", fontWeight: "600", marginBottom: "6px", fontSize: "14px" }}>Book Description *</label>
          <textarea
            placeholder="Write a brief overview of the book..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            required
            style={{ width: "100%", padding: "10px 14px", borderRadius: "6px", border: "1px solid #ccc", outline: "none", resize: "vertical" }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: "10px",
            padding: "12px",
            backgroundColor: loading ? "#888" : "#8B4513",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Adding Book..." : "+ Add Book"}
        </button>
      </form>

      {/* Manage Existing Books Section */}
      <h3 style={{ fontSize: "18px", color: "#333", borderBottom: "2px solid #eee", paddingBottom: "8px", marginBottom: "16px" }}>
        Existing Database Books ({books.length})
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {books.length === 0 ? (
          <p style={{ color: "#666", fontSize: "14px" }}>No books added in database yet.</p>
        ) : (
          books.map((book) => (
            <div
              key={book._id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "14px 16px",
                background: "#f9f9f9",
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
              }}
            >
              <div>
                <strong style={{ fontSize: "15px", color: "#222" }}>{book.title}</strong>
                <div style={{ fontSize: "13px", color: "#666", marginTop: "2px" }}>
                  by {book.author} · <span style={{ color: "#8B4513", fontWeight: "600" }}>₹{book.price}</span> ({book.category})
                </div>
              </div>

              <button
                onClick={() => handleDelete(book._id)}
                style={{
                  background: "#ff4d4d",
                  color: "#fff",
                  border: "none",
                  padding: "8px 14px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: "600",
                }}
              >
                Delete 🗑️
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;