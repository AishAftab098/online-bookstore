import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState(() => {
    const savedWishlist = localStorage.getItem("booknest-wishlist");

    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  // Save wishlist in browser
  useEffect(() => {
    localStorage.setItem(
      "booknest-wishlist",
      JSON.stringify(wishlistItems)
    );
  }, [wishlistItems]);

  // ADD TO WISHLIST
  const addToWishlist = (book) => {
    setWishlistItems((previousItems) => {
      const alreadyAdded = previousItems.some(
        (item) => item.id === book.id
      );

      if (alreadyAdded) {
        return previousItems;
      }

      return [...previousItems, book];
    });
  };

  // REMOVE FROM WISHLIST
  const removeFromWishlist = (bookId) => {
    setWishlistItems((previousItems) =>
      previousItems.filter((item) => item.id !== bookId)
    );
  };

  // CHECK IF BOOK IS IN WISHLIST
  const isInWishlist = (bookId) => {
    return wishlistItems.some(
      (item) => item.id === bookId
    );
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}