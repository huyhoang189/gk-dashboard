import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts";
import Home from "../pages/home";
import Backlists from "../pages/blacklists";
import Whitelists from "../pages/whitelists";
import Page404 from "../pages/page404";
import Login from "../pages/auth";
import Challenges from "../pages/challenges";
import Successs from "../pages/successs";
import Configs from "../pages/configs";
import Thresholds from "../pages/thresholds";
import Emails from "../pages/emails";
import Dnss from "../pages/dnss";
import Databases from "../pages/databases";
import Histories from "../pages/histories";
import Backups from "../pages/backups";
import ElasticSearch from "../pages/elks";
import Roles from "../pages/roles";
import Users from "../pages/users";
import Departments from "../pages/departments";

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
        element: <Challenges />,
      },
      // {
      //   path: "home",
      //   element: <Challenges />,
      // },
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
      {
        path: "nginx",
        element: <Configs />,
      },
      {
        path: "threshold",
        element: <Thresholds />,
      },
      {
        path: "emails",
        element: <Emails />,
      },
      {
        path: "dnss",
        element: <Dnss />,
      },

      {
        path: "databases",
        element: <Databases />,
      },
      {
        path: "histories",
        element: <Histories />,
      },
      {
        path: "backups",
        element: <Backups />,
      },
      {
        path: "elks",
        element: <ElasticSearch />,
      },
      {
        path: "roles",
        element: <Roles />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "departments",
        element: <Departments />,
      },
    ],
  },
]);
