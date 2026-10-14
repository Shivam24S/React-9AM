import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./router/MainLayout";
import Loading from "./components/ui/Loading";
import Error from "./components/ui/Error";
import ProtectedRoute from "./router/ProtectedRoute";

const Home = lazy(() => import("./components/pages/Home"));
const Trips = lazy(() => import("./components/pages/Trips"));
const TripDetail = lazy(() => import("./components/pages/TripDetail"));
const Wishlist = lazy(() => import("./components/pages/Wishlist"));
const Auth = lazy(() => import("./components/forms/Auth"));
const BookingForm = lazy(() => import("./components/forms/BookingForm"));
const MyBookings = lazy(() => import("./components/pages/MyBookings"));

// Stable router instance outside of component render cycle
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "trips",
        element: <Trips />,
      },
      {
        path: "trips/:id",
        element: <TripDetail />,
      },
      {
        path: "wishlist",
        element: <Wishlist />,
      },
      {
        path: "auth",
        element: <Auth />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "booking/:id",
            element: <BookingForm />,
          },
          {
            path: "myBookings",
            element: <MyBookings />,
          },
        ],
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
]);

const App = () => {
  return (
    <Suspense fallback={<Loading fullScreen={true} message="Loading TripVerse..." />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
