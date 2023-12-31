import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts";
import Home from "../pages/home";
import Backlists from "../pages/blacklists";
import Page404 from "../pages/page404";

export const router = createBrowserRouter([
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
    ],
  },
]);
