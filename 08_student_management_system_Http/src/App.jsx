import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./routes/MainLayout";
import Student from "./components/Student";
import AddStudent from "./components/AddStudent";

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
        {
          path: "add",
          element: <AddStudent />
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
