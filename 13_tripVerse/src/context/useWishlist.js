import { useContext } from "react";
import wishlistContext from "./wishlist-context";

export const useWishlist = () => {
  return useContext(wishlistContext);
};

export default useWishlist;
