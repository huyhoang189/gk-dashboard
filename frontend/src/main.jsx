import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./toolkits/store";
import { router } from "./routers";
import { ConfigProvider } from "antd";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#004682",
        colorBgHeader: "#F3F0CA",
        colorBgNavbar: "#192655",
        borderRadius: 2,
        colorBorderSecondary: "#d6d9dc",
        colorBorder: "#d6d9dc",
        fontSize: 13,
      },
    }}
  >
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </ConfigProvider>
);
