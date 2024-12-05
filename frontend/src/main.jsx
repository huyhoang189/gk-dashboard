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
        colorPrimary: "#004682",
        colorBgHeader: "#F3F0CA",
        colorBgNavbar: "#192655",
        borderRadius: 8,
        colorBorderSecondary: "#d6d9dc",
        colorBorder: "#d6d9dc",
        fontSize: 12,
      },
      components: {
        // Menu: {
        //   darkItemBg: "#006666",
        //   darkSubMenuItemBg: "#006666",
        //   darkItemColor: "#fff",
        //   darkItemHoverBg: "#009999",
        //   darkItemSelectedBg: "#004d4d",
        //   itemSelectedBg: "#009999",
        //   darkPopupBg: "#008080",
        // },
      },
    }}
  >
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </ConfigProvider>
);
