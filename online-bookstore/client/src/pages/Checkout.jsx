import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Checkout() {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("cod");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };


  const handlePayment = async (event) => {
    event.preventDefault();

    // 🔒 Login Check: Pehle check karein ki user logged-in hai ya nahi
    const userToken = localStorage.getItem("token") || localStorage.getItem("user");
    if (!userToken) {
      alert("❌ Please login to place an order!");
      navigate("/login");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    if (paymentMethod !== "cod") {
      alert("Currently, only Cash on Delivery is available.");
      return;
    }

    try {
      const response = await axios.post(
        "https://online-bookstore-backend-v6kg.onrender.com/api/orders",
        {
          customer: formData,
          items: cartItems,
          paymentMethod: "Cash on Delivery",
        }
      );

      localStorage.setItem(
        "booknest-last-order",
        JSON.stringify(response.data.order)
      );

      navigate("/order-success");
    } catch (error) {
      console.error("Order error:", error);

      alert(
        error.response?.data?.message ||
        "Order failed. Please check whether the backend is running."
      );
    }
  };


  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <div className="empty-cart">
          <div className="simple-page-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Add some books before checkout.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h1>Checkout 📦</h1>

      <div className="checkout-layout">
        <form
          className="checkout-form"
          onSubmit={handlePayment}
        >
          <section className="checkout-section">
            <h2>Delivery Details</h2>

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <textarea
              name="address"
              placeholder="Full Address"
              value={formData.address}
              onChange={handleChange}
              required
            />

            <div className="checkout-row">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={formData.pincode}
                onChange={handleChange}
                required
              />
            </div>
          </section>

          <section className="checkout-section">
            <h2>Payment Method</h2>

            <label className="payment-option">
              <input
                type="radio"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={(event) =>
                  setPaymentMethod(event.target.value)
                }
              />
              Cash on Delivery
            </label>

            <p>
              Pay for your books when your order is delivered.
            </p>
          </section>

          <button
            type="submit"
            className="checkout-pay-btn"
            style={{
              display: "block",
              width: "100%",
              padding: "16px 20px",
              marginTop: "25px",
              marginBottom: "30px",
              backgroundColor: "#9b5b3e",
              color: "#ffffff",
              border: "none",
              borderRadius: "12px",
              fontSize: "17px",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            Place Order · ₹{totalPrice}
          </button>
        </form>

        <aside className="checkout-summary">
          <h2>Order Summary</h2>

          {cartItems.map((item) => (
            <div className="checkout-item" key={item.id}>
              <span>
                {item.emoji} {item.title} × {item.quantity}
              </span>

              <span>
                ₹{item.price * item.quantity}
              </span>
            </div>
          ))}

          <hr />

          <div className="checkout-total">
            <strong>Total</strong>
            <strong>₹{totalPrice}</strong>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Checkout;
