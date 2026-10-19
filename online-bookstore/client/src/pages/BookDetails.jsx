import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

// Agar aapke paas kuch static default books bhi hain toh unhe yahan rakh sakte hain
const defaultBooks = [
  {
    id: 1,
    title: "The Power of Habit",
    author: "Charles Duhigg",
    price: 399,
    category: "Self Development",
    emoji: "📘",
    color: "book-blue",
    image: "https://cdn.penguin.co.in/wp-content/uploads/2023/06/9781847946249.jpg",
    description: "Discover how habits work and how small changes can create a big difference in everyday life.",
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    price: 499,
    category: "Self Development",
    emoji: "📗",
    color: "book-green",
    image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1655988385l/40121378.jpg",
    description: "Learn a practical approach to building good habits and breaking bad ones.",
  },
  {
    id: 3,
    title: "The Alchemist",
    author: "Paulo Coelho",
    price: 299,
    category: "Fiction",
    emoji: "📙",
    color: "book-orange",
    image: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1483412266i/865.jpg",
    description: "A beautiful story about dreams, adventure, and following your own path.",
  },
  {
    id: 4,
    title: "Clean Code",
    author: "Robert C. Martin",
    price: 599,
    category: "Technology",
    emoji: "💻",
    color: "book-dark",
    image: "https://m.media-amazon.com/images/I/71T7aD3EOTL._UF1000,1000_QL80_.jpg",
    description: "A guide to writing cleaner, more readable, and maintainable software.",
  },
  {
    id: 5,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    price: 449,
    category: "Finance",
    emoji: "📕",
    color: "book-red",
    image: "https://m.media-amazon.com/images/I/81eQqmEj65L._UF1000,1000_QL80_.jpg",
    description: "Explore how emotions and behavior influence the way people think about money.",
  },
  {
    id: 6,
    title: "Ikigai",
    author: "Hector Garcia",
    price: 349,
    category: "Self Development",
    emoji: "📒",
    color: "book-yellow",
    image: "https://m.media-amazon.com/images/I/71lJBs5MNlL._AC_UF1000,1000_QL80_.jpg",
    description: "Explore ideas around purpose, balance, and finding meaning in everyday life.",
  },
];

function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [allBooks, setAllBooks] = useState(defaultBooks);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  // Backend se database ki books aur specific book ki details fetch karna
  useEffect(() => {
    setLoading(true);

    // 1. Pehle saari books le aao (recommended list ke liye)
    axios.get("https://online-bookstore-backend-v6kg.onrender.com/api/books")
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setAllBooks([...defaultBooks, ...res.data]);
        }
      })
      .catch((err) => console.log("Error fetching all books:", err));

    // 2. Phir specific book details fetch karo
    axios.get(`https://online-bookstore-backend-v6kg.onrender.com/api/books/${id}`)
      .then((res) => {
        setBook(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("API fetch failed, checking static books...", err);
        // Agar backend mein na mile toh static array mein check karo (jaise id 1, 2, 3...)
        const foundStaticBook = defaultBooks.find((item) => item.id === Number(id));
        setBook(foundStaticBook || null);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "80px", fontSize: "18px" }}>
        Loading book details... 📚
      </div>
    );
  }

  if (!book) {
    return (
      <main className="details-page" style={{ textAlign: "center", padding: "80px" }}>
        <h2>Book not found 📚</h2>
        <Link to="/books" className="back-link" style={{ display: "inline-block", marginTop: "15px" }}>
          ← Back to Books
        </Link>
      </main>
    );
  }

  // Recommended books filter (current book ko chod kar baaki books)
  const recommendedBooks = allBooks.filter(
    (item) => (item._id || item.id) !== (book._id || book.id)
  );

  const handleAddToCart = () => {
    addToCart(book);
    alert(`${book.title} added to cart!`);
  };

  const handleAddToWishlist = () => {
    addToWishlist(book);
    alert(`${book.title} added to wishlist!`);
  };

  const bookImage = book.image || book.imageUrl || "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500";
  const bookEmoji = book.emoji || "📚";
  const bookColor = book.color || "book-blue";

  return (
    <main className="details-page">
      <Link to="/books" className="back-link">
        ← back to the bookshelf
      </Link>

      <section className="details-card">
        {/* LEFT SIDE */}
        <div className="cover-area">
          <div className="reading-sticker">
            currently
            <br />
            reading ✨
          </div>

          <div className={`details-cover ${bookColor}`}>
            {bookImage ? (
              <img
                src={bookImage}
                alt={`${book.title} book cover`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500";
                }}
              />
            ) : (
              <>
                <span className="details-emoji">{bookEmoji}</span>
                <h2>{book.title}</h2>
                <p>{book.author}</p>
              </>
            )}
          </div>

          <div className="mini-books">
            {recommendedBooks.slice(0, 5).map((item) => (
              <Link
                to={`/book/${item._id || item.id}`}
                className={`mini-book ${item.color || "book-blue"}`}
                key={item._id || item.id}
              >
                {item.emoji || "📚"}
              </Link>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="details-content">
          <span className="details-category">
            {book.category}
          </span>

          <h1>{book.title}</h1>

          <p className="details-author">
            by <strong>{book.author}</strong>
          </p>

          <div className="details-rating">
            <span className="stars">★★★★★</span>
            <span className="rating-text">
              4.9 · reader approved
            </span>
          </div>

          <div className="details-price">
            ₹{book.price}
            <small>
              free delivery · good vibes included ✨
            </small>
          </div>

          <p className="details-description">
            {book.description}
          </p>

          <div className="details-buttons">
            <button
              className="details-cart"
              onClick={handleAddToCart}
            >
              🛒 Add to Cart
            </button>

            <button
              className="details-wishlist"
              onClick={handleAddToWishlist}
            >
              ♡ Wishlist
            </button>
          </div>

          <div className="details-features">
            <div>
              <span>🚚</span>
              <p>ships fast</p>
              <small>usually 2–5 days</small>
            </div>

            <div>
              <span>🛡️</span>
              <p>safe checkout</p>
              <small>100% secure</small>
            </div>

            <div>
              <span>↩️</span>
              <p>easy returns</p>
              <small>no stress</small>
            </div>
          </div>
        </div>
      </section>

      {/* RECOMMENDED BOOKS */}
      <section className="recommended-section">
        <div className="recommended-heading">
          <div>
            <span>✦</span>
            <h2>You might also like</h2>
          </div>

          <Link to="/books">View all →</Link>
        </div>

        <div className="recommended-grid">
          {recommendedBooks.slice(0, 5).map((item) => {
            const itemId = item._id || item.id;
            const itemImg = item.image || item.imageUrl;
            return (
              <Link
                to={`/book/${itemId}`}
                className="recommended-card"
                key={itemId}
              >
                <div className={`recommended-cover ${item.color || "book-blue"}`}>
                  {itemImg ? (
                    <img
                      src={itemImg}
                      alt={`${item.title} book cover`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500";
                      }}
                    />
                  ) : (
                    <span>{item.emoji || "📚"}</span>
                  )}
                </div>

                <h3>{item.title}</h3>
                <p>{item.author}</p>
                <strong>₹{item.price}</strong>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default BookDetails;