import { createContext } from "react";

export const wishlistContext = createContext({
  wishlist: [],
  wishlistTrips: [],
  toggleWishlist: () => {},
  isInWishlist: () => false,
  loading: false,
});

export default wishlistContext;
