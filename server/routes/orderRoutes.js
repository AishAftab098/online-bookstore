
const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

// CREATE A NEW ORDER
router.post("/", async (req, res) => {
  try {
    const { customer, items, total, paymentMethod } = req.body;

    if (
      !customer?.name ||
      !customer?.phone ||
      !customer?.address ||
      !customer?.city ||
      !customer?.pincode
    ) {
      return res.status(400).json({
        message: "Please provide all delivery details.",
      });
    }

    if (
      !Array.isArray(items) ||
      items.length === 0 ||
      paymentMethod !== "Cash on Delivery"
    ) {
      return res.status(400).json({
        message: "Invalid order details.",
      });
    }

    if (
      items.some(
        (item) =>
          !item.title ||
          !Number.isInteger(item.quantity) ||
          item.quantity < 1 ||
          !Number.isFinite(item.price) ||
          item.price < 0
      )
    ) {
      return res.status(400).json({
        message: "Invalid book details.",
      });
    }

    // Get all orders route
    router.get("/", async (req, res) => {
      try {
        const orders = await Order.find().sort({ createdAt: -1 }); // Naye orders sabse upar dikhenge
        res.status(200).json(orders);
      } catch (error) {
        console.error("Fetch orders error:", error);
        res.status(500).json({ message: "Server error while fetching orders" });
      }
    });

    // Recalculate total from submitted items for this demo.
    const calculatedTotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = await Order.create({
      orderId: `BN${Date.now()}${Math.floor(Math.random() * 1000)}`,
      customer,
      items: items.map((item) => ({
        bookId: item.id ? String(item.id) : "",
        title: item.title,
        author: item.author || "",
        price: item.price,
        quantity: item.quantity,
        emoji: item.emoji || "📚",
      })),
      total: calculatedTotal,
      paymentMethod: "Cash on Delivery",
    });

    res.status(201).json({
      message: "Order saved successfully!",
      order,
    });
  } catch (error) {
    console.error("Order save error:", error.message);

    res.status(500).json({
      message: "Could not save order.",
    });
  }
});

module.exports = router;
