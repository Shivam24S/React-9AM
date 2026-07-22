import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./routes/MainLayout";
import Student from "./components/Student";
import AddStudent from "./components/AddStudent";
import EditStudent from "./components/EditStudent";

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
        }, {
          path: "editStudentData",
          element: <EditStudent />
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
