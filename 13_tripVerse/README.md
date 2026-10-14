# TripVerse — Premium Curated Travel & Journeys

TripVerse is an end-to-end, high-performance travel discovery and reservation web application built with **React 19**, **Vite**, **React Router DOM**, **Bootstrap 5**, **React-Bootstrap**, **Firebase Authentication**, and **Cloud Firestore**.

The platform provides a modern, boutique travel agency experience: discovering curated itineraries, filtering trips by style and budget, managing persistent wishlists, viewing interactive day-by-day itineraries with photo galleries, calculating transparent totals, and reserving journeys with a user-scoped booking dashboard.

---

## 🌟 Key Features

### 1. Immersive Discovery & Homepage
- **Cinematic Hero**: Impactful photography, aspirational copy, and live multi-criteria search.
- **Search Bar**: Filter by destination keywords, travel style, and budget range with instant routing to catalog.
- **Featured Journeys**: Dynamic destination cards powered by real metadata (`src/data/Trips.js`).
- **Travel Styles & Experiences**: Fast-filter shortcuts (Beach Escapes, Cultural Tours, Adventure Treks, City Breaks, Nature Retreats, Luxury Getaways).
- **The TripVerse Standard**: 4-point transparent capability highlights (curated itineraries, fixed pricing, booking dashboard, personalized discovery).
- **How It Works**: Visual 4-step travel booking roadmap.
- **Traveler Feedback**: Illustrative demo community testimonials.

### 2. Comprehensive Catalog & Advanced Filtering
- **Multi-Filter Engine**: Filter by search query (title, destination, country), travel category, budget tiers, and duration length (short vs. extended).
- **Dynamic Sorting**: Sort by price (low-to-high, high-to-low), guest rating, and alphabetical title.
- **URL Query Synchronization**: Filter states reflect in URL query parameters (`useSearchParams`), enabling shareable search links and refresh persistence.
- **Recently Viewed Journeys**: Automatically tracks the last 6 viewed trips in `localStorage` without duplicates.
- **Instant Reset & Counters**: Accurate result counters and one-click filter resets.

### 3. Detailed Itinerary Experience
- **Interactive Gallery**: Main image viewer with clickable thumbnail gallery strip and automatic fallback on broken URLs.
- **Quick Metrics**: Duration, difficulty rating, guest review counts, and per-person rates.
- **Structured Day-by-Day Itinerary**: Clean accordion interface with day badges and detailed day notes.
- **Inclusions & Exclusions**: Side-by-side comparison lists with distinct badges.
- **Sticky Booking Sidebar**: Live traveler counter calculating total package costs dynamically.
- **Safe Routing**: Complete 404 fallback for invalid trip IDs preventing application crashes.
- **Related Recommendations**: Recommends similar trips within the same category or style.

### 4. Robust Authentication & Protected Flow
- **Firebase Authentication**: Email & password login, new account registration with display name, and Google OAuth Popup.
- **Return Redirect Support**: Unauthenticated guests attempting to book are redirected to `/auth` with return state (`state: { from: location }`), returning them directly to their reservation on login.
- **Password Visibility Toggle**: Inline toggle with SVG icons.
- **Friendly Error Translation**: Converts raw Firebase codes (`auth/invalid-credential`, `auth/email-already-in-use`, `auth/weak-password`) into clear messages.
- **Lifecycle Cleanup**: Strict `unsubscribe()` cleanup on `onAuthStateChanged` prevents memory leaks.
- **Fast Refresh Compliance**: Split context instances and custom hooks (`useAuth`, `useWishlist`, `useTheme`) in standalone `.js` files.

### 5. Verified Booking & Cloud Firestore Integration
- **Client & Schema Validation**: Name, email format, phone digits (7-15), minimum tomorrow departure date, and traveler count (1-20).
- **Dynamic Pricing Calculation**: Grand Total computed derived from validated trip price and traveler count (`pricePerPerson * numberOfTravelers`).
- **Double-Submit Prevention**: Button disabled with spinner during active asynchronous submissions.
- **Resilient Firestore Queries**: Primary query by `userId` ordered by `createdAt desc`. If the composite index is pending, it automatically falls back to client-side sorting so the UI never crashes or shows false empty states.
- **Cancellation Workflow**: Users can cancel existing bookings with an accessible `ConfirmationModal`.

### 6. Personal Wishlist System
- **Heart Toggle on Cards**: Save or remove trips directly from any card or detail page.
- **Firestore & Offline Sync**: Synchronizes wishlist with `doc(db, "wishlists", user.uid)` for logged-in users, with seamless `localStorage` fallback.
- **Dedicated Wishlist View**: `/wishlist` route displaying saved items and quick-add links.

### 7. Dual Theme System (Light / Dark Mode)
- **Persisted Preference**: Automatically respects system OS dark preference or user selection.
- **CSS Variable Tokens**: Instantaneous theme switching via `data-theme` attribute on `<html>` with zero CSS flashes.

---

## 🛠 Tech Stack

- **Framework**: React 19 (`react`, `react-dom`)
- **Build Tool**: Vite 8 with Rolldown bundler
- **Routing**: React Router DOM 7 (`createBrowserRouter`, `RouterProvider`)
- **Styling**: Bootstrap 5.3, React-Bootstrap, custom CSS Design System (`src/index.css`)
- **Authentication**: Firebase Auth (Email/Password, Google OAuth)
- **Database**: Firebase Cloud Firestore
- **Code Quality**: ESLint 10, React Hooks & React Refresh plugins

---

## 📁 Project Structure

```text
13_tripVerse/
├── firestore.indexes.json          # Firestore composite index definitions
├── firestore.rules                 # User-scoped Firestore security rules
├── index.html                      # HTML entry with metadata
├── package.json                    # Project dependencies and npm scripts
├── test-verification.mjs           # Automated data and pricing test suite
├── vite.config.js                  # Vite configuration & manualChunk split
├── src/
│   ├── main.jsx                    # Application entry mounting all providers
│   ├── App.jsx                     # Route definitions with lazy loading & Suspense
│   ├── index.css                   # Design tokens, variables & responsive styling
│   ├── config/
│   │   └── firebase.js             # Firebase initialization & HMR guard
│   ├── context/
│   │   ├── auth-context.js         # Auth context definition
│   │   ├── AuthContext.jsx         # AuthContextProvider component
│   │   ├── useAuth.js              # useAuth hook
│   │   ├── theme-context.js        # Theme context definition
│   │   ├── ThemeContext.jsx        # ThemeProvider component
│   │   ├── useTheme.js             # useTheme hook
│   │   ├── wishlist-context.js     # Wishlist context definition
│   │   ├── WishlistContext.jsx     # WishlistProvider component
│   │   └── useWishlist.js          # useWishlist hook
│   ├── data/
│   │   └── Trips.js                # 16 Curated travel packages with full metadata
│   ├── router/
│   │   ├── MainLayout.jsx          # Header, Main Content Outlet, Footer
│   │   └── ProtectedRoute.jsx      # Auth guard with redirect preservation
│   ├── utils/
│   │   └── recentlyViewed.js       # localStorage tracker for viewed trips
│   └── components/
│       ├── forms/
│       │   ├── Auth.jsx            # Sign In / Sign Up modal card
│       │   └── BookingForm.jsx     # Reservation form with live calculation
│       ├── pages/
│       │   ├── Home.jsx            # Premium homepage
│       │   ├── Trips.jsx           # Catalog with search, filters & sort
│       │   ├── TripDetail.jsx      # Detail view with gallery & itinerary
│       │   ├── Wishlist.jsx        # Saved trips page
│       │   └── MyBookings.jsx      # User reservation dashboard
│       └── ui/
│           ├── Breadcrumbs.jsx     # Route breadcrumbs
│           ├── ConfirmationModal.jsx # Destructive action confirmation dialog
│           ├── Error.jsx           # 404 Page Not Found component
│           ├── Footer.jsx          # Rich website footer
│           ├── Icons.jsx           # Native SVG icon library
│           ├── Loading.jsx         # Accessible loading spinner
│           ├── Navbar.jsx          # Responsive navbar with user menu
│           ├── SectionHeading.jsx  # Reusable section header
│           └── TripCard.jsx        # Interactive trip card with wishlist button
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create or verify `.env` in the root directory:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 3. Run Automated Tests
```bash
npm test
```

### 4. Run Linter
```bash
npm run lint
```

### 5. Start Development Server
```bash
npm run dev
```

### 6. Build for Production
```bash
npm run build
```

---

## 🔒 Firestore Security Rules & Indexes

### Security Rules (`firestore.rules`)
Deploy rules to protect user data:
```bash
firebase deploy --only firestore:rules
```
Rules ensure:
- Only authenticated users can read, create, or cancel their own bookings (`userId == request.auth.uid`).
- Cross-user data leaks or unauthorized updates are rejected by Firestore.
- User wishlists are strictly scoped to the owner UID.

### Composite Index (`firestore.indexes.json`)
Deploy the composite index required for sorting bookings:
```bash
firebase deploy --only firestore:indexes
```
Index specification:
- Collection: `bookings`
- Fields: `userId` (ASC), `createdAt` (DESC)

---

## 📄 License
Private project. Developed for TripVerse.
