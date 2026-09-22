import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import MainLayout from "./router/MainLayout";
import Home from "./components/pages/Home";
import Trips from "./components/pages/Trips";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "trips",
          element: <Trips />
        }
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
