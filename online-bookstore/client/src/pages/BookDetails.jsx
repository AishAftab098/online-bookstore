import { Link, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const books = [
  {
    id: 1,
    title: "The Power of Habit",
    author: "Charles Duhigg",
    price: 399,
    category: "Self Development",
    emoji: "📘",
    color: "book-blue",
    description:
      "Discover how habits work and how small changes can create a big difference in everyday life.",
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    price: 499,
    category: "Self Development",
    emoji: "📗",
    color: "book-green",
    description:
      "Learn a practical approach to building good habits and breaking bad ones.",
  },
  {
    id: 3,
    title: "The Alchemist",
    author: "Paulo Coelho",
    price: 299,
    category: "Fiction",
    emoji: "📙",
    color: "book-orange",
    description:
      "A beautiful story about dreams, adventure, and following your own path.",
  },
  {
    id: 4,
    title: "Clean Code",
    author: "Robert C. Martin",
    price: 599,
    category: "Technology",
    emoji: "💻",
    color: "book-dark",
    description:
      "A guide to writing cleaner, more readable, and maintainable software.",
  },
  {
    id: 5,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    price: 449,
    category: "Finance",
    emoji: "📕",
    color: "book-red",
    description:
      "Explore how emotions and behavior influence the way people think about money.",
  },
  {
    id: 6,
    title: "Ikigai",
    author: "Hector Garcia",
    price: 349,
    category: "Self Development",
    emoji: "📒",
    color: "book-yellow",
    description:
      "Explore ideas around purpose, balance, and finding meaning in everyday life.",
  },
];

function BookDetails() {
  const { id } = useParams();

  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const book = books.find((item) => item.id === Number(id));

  if (!book) {
    return (
      <div className="not-found">
        <h2>Book not found 📚</h2>
        <Link to="/books">← Back to Books</Link>
      </div>
    );
  }

  const recommendedBooks = books.filter(
    (item) => item.id !== book.id
  );

  const handleAddToCart = () => {
    addToCart(book);
    alert(`${book.title} added to cart!`);
  };

  const handleAddToWishlist = () => {
    addToWishlist(book);
    alert(`${book.title} added to wishlist!`);
  };

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

          <div className={`details-cover ${book.color}`}>
            <span className="details-emoji">{book.emoji}</span>
            <h2>{book.title}</h2>
            <p>{book.author}</p>
          </div>

          <div className="mini-books">
            {recommendedBooks.slice(0, 5).map((item) => (
              <Link
                to={`/book/${item.id}`}
                className={`mini-book ${item.color}`}
                key={item.id}
              >
                {item.emoji}
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
          {recommendedBooks.slice(0, 5).map((item) => (
            <Link
              to={`/book/${item.id}`}
              className="recommended-card"
              key={item.id}
            >
              <div
                className={`recommended-cover ${item.color}`}
              >
                <span>{item.emoji}</span>
              </div>

              <h3>{item.title}</h3>
              <p>{item.author}</p>
              <strong>₹{item.price}</strong>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

export default BookDetails;