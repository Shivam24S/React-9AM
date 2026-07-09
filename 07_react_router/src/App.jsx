import React, { lazy } from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./routes/MainLayout";

import About from "./components/About";
import Service from "./components/Service";
import Product from "./components/Product";
import Error from "./components/Error";

import { Suspense } from "react";
import Loading from "./components/Loading";

const Home = lazy(()=>import("./components/Home"))

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
          path: "about",
          element: <About />,
        },
        {
          path: "service",
          element: <Service />,
        },
        {
          path: "product/:id",
          element: <Product />,
        },
      ],
    },
  ]);

  return <Suspense fallback={<Loading />} >
    <RouterProvider router={router}></RouterProvider>
  </Suspense>;
};

export default App;
