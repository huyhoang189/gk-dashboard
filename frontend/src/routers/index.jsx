import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts";
import Home from "../pages/home";
import Backlists from "../pages/blacklists";
import Whitelists from "../pages/whitelists";
import Page404 from "../pages/page404";
import Login from "../pages/auth";
import Challenges from "../pages/challenges";
import Successs from "../pages/successs";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Page404 />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "blacklists",
        element: <Backlists />,
      },
      {
        path: "whitelists",
        element: <Whitelists />,
      },
      {
        path: "challenges",
        element: <Challenges />,
      },
      {
        path: "success",
        element: <Successs />,
      },
    ],
  },
]);
