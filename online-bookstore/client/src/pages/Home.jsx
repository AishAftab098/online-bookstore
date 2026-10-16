import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const featuredBooks = [
  {
    id: 1,
    title: "The Power of Habit",
    author: "Charles Duhigg",
    category: "Self Development",
    price: 399,
    coverClass: "cover-one",
    label: "POPULAR",
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    category: "Personal Growth",
    price: 499,
    coverClass: "cover-two",
    label: "BESTSELLER",
  },
  {
    id: 3,
    title: "The Alchemist",
    author: "Paulo Coelho",
    category: "Fiction",
    price: 299,
    coverClass: "cover-three",
    label: "CLASSIC",
  },
];

function Home() {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  return (
    <div className="home">

      {/* ================= HERO ================= */}
      <section className="hero">
        <div className="hero-content">
          <p className="hero-label">A QUIET PLACE FOR BIG IDEAS</p>

          <h1>
            Books that
            <span>stay with you.</span>
          </h1>

          <p className="hero-description">
            Discover thoughtful stories, powerful ideas, and unforgettable
            books curated for curious minds.
          </p>

          <div className="hero-buttons">
            <Link to="/books" className="primary-btn">
              Explore Books →
            </Link>

            <Link to="/books" className="secondary-btn">
              View Collection
            </Link>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-badge">
            ✦ Curated for readers
          </div>

          <div className="book-stack">
            <div className="book book-one">
              <span>BOOKNEST</span>
              <strong>The Alchemist</strong>
            </div>

            <div className="book book-two">
              <span>BOOKNEST</span>
              <strong>Atomic Habits</strong>
            </div>

            <div className="book book-three">
              <span>BOOKNEST</span>
              <strong>The Power of Habit</strong>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SEARCH ================= */}
      <section className="search-section">
        <h2>What are you looking for?</h2>

        <div className="search-box">
          <span>🔍</span>

          <input
            type="text"
            placeholder="Search books, authors or categories..."
          />

          <Link to="/books">
            <button>Search</button>
          </Link>
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="categories-section">
        <div className="section-heading">
          <p>EXPLORE BY CATEGORY</p>

          <h2>Find your next read.</h2>
        </div>

        <div className="categories-grid">

          <Link
            to="/books?category=Fiction"
            className="category-card category-fiction"
          >
            <div>
              <div className="category-icon">📖</div>
              <span className="category-number">01</span>

              <h3>Fiction</h3>

              <p>
                Stories that transport you somewhere new.
              </p>
            </div>

            <span className="category-arrow">↗</span>
          </Link>

          <Link
            to="/books?category=Technology"
            className="category-card category-tech"
          >
            <div>
              <div className="category-icon">💻</div>
              <span className="category-number">02</span>

              <h3>Technology</h3>

              <p>
                Ideas shaping the world around us.
              </p>
            </div>

            <span className="category-arrow">↗</span>
          </Link>

          <Link
            to="/books?category=Finance"
            className="category-card category-mystery"
          >
            <div>
              <div className="category-icon">💰</div>
              <span className="category-number">03</span>

              <h3>Finance</h3>

              <p>
                Learn about money, business and growth.
              </p>
            </div>

            <span className="category-arrow">↗</span>
          </Link>

          <Link
            to="/books?category=Self%20Development"
            className="category-card category-growth"
          >
            <div>
              <div className="category-icon">🌱</div>
              <span className="category-number">04</span>

              <h3>Self Growth</h3>

              <p>
                Books to help you become your best self.
              </p>
            </div>

            <span className="category-arrow">↗</span>
          </Link>

        </div>
      </section>

      {/* ================= FEATURED BOOKS ================= */}
      <section className="featured-section">

        <div className="section-heading">
          <p>HANDPICKED FOR YOU</p>

          <h2>Featured Books</h2>
        </div>

        <div className="featured-grid">

          {featuredBooks.map((book) => (
            <div className="featured-book" key={book.id}>

              <div className={`book-cover ${book.coverClass}`}>

                <span>BOOKNEST EDITION</span>

                <strong>
                  {book.title}
                </strong>

              </div>

              <h3>{book.title}</h3>

              <p>
                by {book.author}
              </p>

              <p>
                {book.category}
              </p>

              <strong>₹{book.price}</strong>

              <div className="book-buttons">

                <Link
                  to={`/book/${book.id}`}
                  className="secondary-btn"
                >
                  Details →
                </Link>

                <button
                  onClick={() => {
                    addToCart(book);
                    alert(`${book.title} added to cart!`);
                  }}
                >
                  🛒 Add to Cart
                </button>

              </div>

              <button
                className="wishlist-btn"
                onClick={() => {
                  addToWishlist(book);
                  alert(`${book.title} added to wishlist!`);
                }}
              >
                ♡ Add to Wishlist
              </button>

            </div>
          ))}

        </div>

        <Link to="/books" className="view-all-btn">
          Explore all books →
        </Link>

      </section>

    </div>
  );
}

export default Home;