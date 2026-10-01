import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import MainLayout from "./router/MainLayout";
import { lazy } from "react";
import { Suspense } from "react";
import Loading from "./components/ui/Loading";
import Error from "./components/ui/Error";

const Home = lazy(() => import("./components/pages/Home"))
const Trips = lazy(() => import("./components/pages/Trips"))
const TripDetail = lazy(() => import("./components/pages/TripDetail"))
const Auth = lazy(() => import("./components/forms/Auth"))

const App = () => {

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
          element: <Trips />
        },
        {
          path: "trips/:id",
          element: <TripDetail />
        },
        {
          path: "auth",
          element: <Auth />
        }
      ],
    },
  ]);

  return (
    <>
      <Suspense fallback={<Loading />} >
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
};

export default App;
