import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-page">
      <h1>Your Shopping Cart 🛒</h1>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <div className="simple-page-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Add some books to see them here.</p>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.id}>

                <div className="cart-book-cover">
                  {item.emoji}
                </div>

                <div className="cart-book-info">
                  <h2>{item.title}</h2>

                  <p>by {item.author}</p>

                  <p>₹{item.price} per book</p>

                  <div className="quantity-controls">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() => increaseQuantity(item.id)}
                    >
                      +
                    </button>
                  </div>

                  <strong>
                    ₹{item.price * item.quantity}
                  </strong>
                </div>

                <button
                  className="remove-cart-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>

              </div>
            ))}
          </div>

          <div className="cart-summary">
            <p>
              {cartItems.length} different book
              {cartItems.length !== 1 ? "s" : ""}
            </p>

            <h2>Total: ₹{totalPrice}</h2>

            <button onClick={() => navigate("/checkout")}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;