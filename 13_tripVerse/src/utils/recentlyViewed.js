import { trips } from "../data/Trips";

const STORAGE_KEY = "tripverse_recently_viewed_ids";
const MAX_RECENT_ITEMS = 6;

export const recordTripView = (tripId) => {
  if (!tripId) return;
  const numId = Number(tripId);
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const existing = raw ? JSON.parse(raw) : [];
    const filtered = existing.filter((id) => id !== numId);
    const updated = [numId, ...filtered].slice(0, MAX_RECENT_ITEMS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn("Could not save recently viewed trip:", err);
  }
};

export const getRecentlyViewedTrips = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const ids = JSON.parse(raw);
    if (!Array.isArray(ids)) return [];
    return ids
      .map((id) => trips.find((t) => t.id === id))
      .filter(Boolean);
  } catch {
    return [];
  }
};
