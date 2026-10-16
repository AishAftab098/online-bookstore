
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function OrderSuccess() {
  const navigate = useNavigate();
  const { clearCart } = useCart();

  const savedOrder = localStorage.getItem("booknest-last-order");
  const order = savedOrder ? JSON.parse(savedOrder) : null;

  const handleContinueShopping = () => {
    if (clearCart) {
      clearCart();
    }

    navigate("/books");
  };

  if (!order) {
    return (
      <div className="order-success-page">
        <h1>No order found 📦</h1>
        <p>Please place an order first.</p>
        <Link to="/books">Explore Books</Link>
      </div>
    );
  }

  return (
    <div className="order-success-page">
      <div className="success-icon">✓</div>

      <h1>Order Placed Successfully!</h1>
      <p>Thank you for shopping with BookNest 📚</p>

      <div className="success-order-card">
        <h2>Order Confirmation</h2>

        <p>
          <strong>Order ID:</strong> {order.orderId}
        </p>

        <p>
          <strong>Name:</strong> {order.customer.name}
        </p>

        <p>
          <strong>Payment:</strong> Cash on Delivery
        </p>

        <p>
          <strong>Order Date:</strong> {order.orderDate}
        </p>

        <hr />

        <h3>Your Books</h3>

        {order.items.map((item) => (
          <div className="success-order-item" key={item.id}>
            <span>
              {item.emoji || "📚"} {item.title} × {item.quantity}
            </span>
            <strong>₹{item.price * item.quantity}</strong>
          </div>
        ))}

        <hr />

        <h2>Total: ₹{order.total}</h2>
        <p>💵 Pay when your books are delivered.</p>
      </div>

      <button
        className="continue-shopping-btn"
        onClick={handleContinueShopping}
      >
        Continue Shopping
      </button>
    </div>
  );
}

export default OrderSuccess;
