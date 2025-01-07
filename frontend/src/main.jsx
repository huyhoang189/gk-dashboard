import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./toolkits/store";
import { router } from "./routers";
import { ConfigProvider } from "antd";
import "../i18n";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ConfigProvider
    theme={{
      token: {
        fontFamily: "'Roboto', sans-serif",
        colorPrimary: "#004682",
        colorBgHeader: "#F3F0CA",
        colorBgNavbar: "#192655",
        borderRadius: 8,
        colorBorderSecondary: "#d6d9dc",
        colorBorder: "#d6d9dc",
        fontSize: 12,
      },
      components: {},
    }}
  >
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </ConfigProvider>
);
