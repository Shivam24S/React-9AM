import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import MainLayout from "./router/MainLayout";

const App = () => {
  const router = createBrowserRouter([
    {
      element: <MainLayout />,
      children: [
        {
          index: true,
          // element: <></>,
        },
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
