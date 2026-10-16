import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

function Wishlist() {
  const {
    wishlistItems,
    removeFromWishlist,
  } = useWishlist();

  const { addToCart } = useCart();

  const handleAddToCart = (item) => {
    addToCart(item);
    alert(`${item.title} added to cart!`);
  };

  return (
    <div className="wishlist-page">
      <h1>Your Wishlist ♡</h1>

      {wishlistItems.length === 0 ? (
        <div className="empty-wishlist">
          <div className="simple-page-icon">♡</div>
          <h2>Your wishlist is empty</h2>
          <p>Save your favourite books to see them here.</p>
        </div>
      ) : (
        <div className="wishlist-items">
          {wishlistItems.map((item) => (
            <div className="wishlist-item" key={item.id}>

              <div className="wishlist-book-cover">
                {item.emoji || "📚"}
              </div>

              <div className="wishlist-book-info">
                <h2>{item.title}</h2>
                <p>{item.author}</p>
                <strong>₹{item.price}</strong>
              </div>

              <div className="wishlist-actions">

                <button
                  className="wishlist-cart-btn"
                  onClick={() => handleAddToCart(item)}
                >
                  🛒 Add to Cart
                </button>

                <button
                  className="remove-wishlist-btn"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  Remove
                </button>

              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;