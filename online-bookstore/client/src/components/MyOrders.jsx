import { useEffect, useState } from "react";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // LocalStorage se last order fetch karna
    const lastOrder = localStorage.getItem("booknest-last-order");
    if (lastOrder) {
      setOrders([JSON.parse(lastOrder)]);
    }
  }, []);

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto", padding: "20px", fontFamily: "sans-serif" }}>
      <h2>My Orders & Tracking 📦</h2>
      {orders.length === 0 ? (
        <p style={{ marginTop: "20px", color: "#666" }}>You have not placed any orders yet.</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} style={{ border: "1px solid #ddd", borderRadius: "10px", padding: "20px", marginTop: "20px", background: "#fdfdfd", boxShadow: "0 4px 10px rgba(0,0,0,0.05)" }}>
            <h3>Order ID: #{Math.floor(Math.random() * 1000000)}</h3>
            <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
            <p><strong>Delivery Status:</strong> <span style={{ color: "green", fontWeight: "bold" }}>Order Placed / Out for Delivery 🚚</span></p>
            
            <h4 style={{ marginTop: "15px", borderBottom: "1px solid #eee", paddingBottom: "5px" }}>Items Ordered:</h4>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {order.items.map((item, i) => (
                <li key={i} style={{ margin: "8px 0", display: "flex", justifyContent: "space-between" }}>
                  <span>{item.title} × {item.quantity}</span>
                  <span><strong>₹{item.price * item.quantity}</strong></span>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}

export default MyOrders;