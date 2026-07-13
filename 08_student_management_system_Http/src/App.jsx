import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./routes/MainLayout";
import Student from "./components/UI/Student";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <div> 404 not found</div>,
      children: [
        {
          index: true,
          element: <Student />,
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
