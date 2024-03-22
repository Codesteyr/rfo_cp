import { Navigate, createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Login from "./assets/views/Login";
import Signup from "./assets/views/Signup";
import Dashboard from "./assets/views/Dashboard";
import Download from "./assets/views/Download";
import Donate from "./assets/views/Donate";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        // Теперь при переходе на / попадем на Users
        path: "/",
        element: <Navigate to="/dashboard" />,
      },

      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/Download",
        element: <Download />,
      },
      {
        path: "/Donate",
        element: <Donate />,
      },
    ],
  },

  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      // {
      //     path: "/unavailable",
      //     element: <Unavailable />,
      // },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/Dashboard" />,
  },
]);

export default router;
