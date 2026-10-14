import { useEffect, useState, useMemo } from "react";
import { useAuth } from "./useAuth";
import { db } from "../config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { trips } from "../data/Trips";
import wishlistContext from "./wishlist-context";

const STORAGE_KEY = "tripverse_wishlist_local";

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [loading, setLoading] = useState(false);

  // Sync with Firestore when user logs in
  useEffect(() => {
    let isMounted = true;

    if (!user) {
      return;
    }

    const fetchUserWishlist = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "wishlists", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists() && isMounted) {
          const data = docSnap.data();
          const remoteList = Array.isArray(data.tripIds) ? data.tripIds : [];
          setWishlist((currentList) => {
            const merged = Array.from(new Set([...currentList, ...remoteList]));
            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
            } catch {
              // ignore
            }
            return merged;
          });
        } else if (isMounted) {
          setWishlist((currentList) => {
            if (currentList.length > 0) {
              setDoc(docRef, { tripIds: currentList, updatedAt: new Date().toISOString() }, { merge: true }).catch((err) => {
                console.warn("Push wishlist error:", err);
              });
            }
            return currentList;
          });
        }
      } catch (err) {
        console.warn("Firestore wishlist sync error:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchUserWishlist();

    return () => {
      isMounted = false;
    };
  }, [user]);

  // Save changes to localStorage and Firestore
  const updateWishlist = async (newList) => {
    setWishlist(newList);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
    } catch (e) {
      console.warn("Local storage write failed:", e);
    }

    if (user) {
      try {
        const docRef = doc(db, "wishlists", user.uid);
        await setDoc(docRef, { tripIds: newList, updatedAt: new Date().toISOString() }, { merge: true });
      } catch (err) {
        console.warn("Failed to persist wishlist to Firestore:", err);
      }
    }
  };

  const toggleWishlist = (tripId) => {
    const numericId = Number(tripId);
    if (wishlist.includes(numericId)) {
      const updated = wishlist.filter((id) => id !== numericId);
      updateWishlist(updated);
    } else {
      const updated = [...wishlist, numericId];
      updateWishlist(updated);
    }
  };

  const isInWishlist = (tripId) => {
    return wishlist.includes(Number(tripId));
  };

  const wishlistTrips = useMemo(() => {
    return trips.filter((t) => wishlist.includes(t.id));
  }, [wishlist]);

  const value = {
    wishlist,
    wishlistTrips,
    toggleWishlist,
    isInWishlist,
    loading,
  };

  return <wishlistContext.Provider value={value}>{children}</wishlistContext.Provider>;
};

export default WishlistProvider;
