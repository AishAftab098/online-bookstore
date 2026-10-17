
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const books = [
  {
    id: 1,
    title: "The Power of Habit",
    author: "Charles Duhigg",
    price: 399,
    category: "Self Development",
    image: "https://cdn.penguin.co.in/wp-content/uploads/2023/06/9781847946249.jpg",
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    price: 499,
    category: "Self Development",
    image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1655988385l/40121378.jpg",
  },
  {
    id: 3,
    title: "The Alchemist",
    author: "Paulo Coelho",
    price: 299,
    category: "Fiction",
    image: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1483412266i/865.jpg",
  },
  {
    id: 4,
    title: "Clean Code",
    author: "Robert C. Martin",
    price: 599,
    category: "Technology",
    image: "https://m.media-amazon.com/images/I/71T7aD3EOTL._UF1000,1000_QL80_.jpg",
  },
  {
    id: 5,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    price: 449,
    category: "Finance",
    image: "https://m.media-amazon.com/images/I/81eQqmEj65L._UF1000,1000_QL80_.jpg",
  },
  {
    id: 6,
    title: "Ikigai",
    author: "Hector Garcia",
    price: 349,
    category: "Self Development",
    image: "https://m.media-amazon.com/images/I/71lJBs5MNlL._AC_UF1000,1000_QL80_.jpg",
  },
];

function Books() {
  const { addToWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [search, setSearch] = useState("");
  const [searchParams] = useSearchParams();
  const [category, setCategory] = useState(
    searchParams.get("category") || "All"
  );
  const [sort, setSort] = useState("default");

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || book.category === category;

    return matchesSearch && matchesCategory;
  });

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sort === "low") {
      return a.price - b.price;
    }

    if (sort === "high") {
      return b.price - a.price;
    }

    if (sort === "az") {
      return a.title.localeCompare(b.title);
    }

    return 0;
  });

  return (
    <div className="books-page">

      {/* Page Header */}
      <section className="books-header">
        <p>OUR COLLECTION</p>
        <h1>Explore All Books 📚</h1>
        <span>
          Discover stories, knowledge, and inspiration.
        </span>
      </section>

      {/* Search and Filter */}
      <section className="books-controls">

        <div className="books-search">
          🔍
          <input
            type="text"
            placeholder="Search by title or author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Fiction">Fiction</option>
          <option value="Technology">Technology</option>
          <option value="Finance">Finance</option>
          <option value="Self Development">
            Self Development
          </option>
        </select>

        {/* New Sort Dropdown */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="default">Sort Books</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
          <option value="az">Name: A to Z</option>
        </select>

      </section>

      {/* Books Grid */}
      <section className="books-grid">

        {sortedBooks.map((book) => (
          <Link
            to={`/book/${book.id}`}
            className="book-card"
            key={book.id}
          >
            <div className="book-card-cover">
              {book.image ? (
                <img
                  src={book.image}
                  alt={`${book.title} book cover`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              ) : (
                <>
                  <span>{book.emoji}</span>
                  <h2>{book.title}</h2>
                  <small>{book.author}</small>
                </>
              )}
            </div>

            <div className="book-card-info">
              <span className="book-category">
                {book.category}
              </span>

              <h3>{book.title}</h3>
              <p>By {book.author}</p>

              <div className="book-card-bottom">
                <strong>₹{book.price}</strong>

                <button
                  onClick={(event) => {
                    event.preventDefault();
                    addToCart(book);
                    alert(`${book.title} added to cart!`);
                  }}
                >
                  Add to Cart
                </button>

                <button
                  className="wishlist-btn"
                  onClick={(event) => {
                    event.preventDefault();
                    addToWishlist(book);
                    alert(`${book.title} added to wishlist!`);
                  }}
                >
                  ♡ Wishlist
                </button>
              </div>
            </div>

          </Link>
        ))
        }

      </section >

      {
        filteredBooks.length === 0 && (
          <div className="no-books">
            <h2>No books found 📚</h2>
            <p>Try another title or category.</p>
          </div>
        )
      }

    </div >
  );
}

export default Books;