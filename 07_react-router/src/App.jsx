import React, { Children } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./routes/MainLayout";
import Home from "./components/Home";
import Service from "./components/Service";

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
          path: "service",
          element: <Service />
        }
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
