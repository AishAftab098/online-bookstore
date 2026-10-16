import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

function Navbar() {
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <span className="logo-icon">📚</span>
        Book<span>Nest</span>
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/books">Books</Link>
        <Link to="/books">Explore</Link>
      </div>

      <div className="nav-actions">
        <Link to="/books" className="nav-search-icon">
          🔍
        </Link>

        <Link to="/cart" className="nav-cart">
          🛒
          <span>{cartCount}</span>
        </Link>

        <Link to="/wishlist" className="profile-icon">
          ♡
          <span>{wishlistItems.length}</span>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;