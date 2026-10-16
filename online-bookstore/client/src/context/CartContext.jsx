import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("booknest-cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("booknest-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // ADD TO CART
  const addToCart = (book) => {
    setCartItems((previousItems) => {
      const alreadyAdded = previousItems.find(
        (item) => item.id === book.id
      );

      if (alreadyAdded) {
        return previousItems.map((item) =>
          item.id === book.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...previousItems, { ...book, quantity: 1 }];
    });
  };

  // INCREASE QUANTITY
  const increaseQuantity = (bookId) => {
    setCartItems((previousItems) =>
      previousItems.map((item) =>
        item.id === bookId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // DECREASE QUANTITY
  const decreaseQuantity = (bookId) => {
    setCartItems((previousItems) =>
      previousItems
        .map((item) =>
          item.id === bookId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // REMOVE COMPLETELY
  const removeFromCart = (bookId) => {
    setCartItems((previousItems) =>
      previousItems.filter((item) => item.id !== bookId)
    );
  };

  // CLEAR CART AFTER ORDER
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}