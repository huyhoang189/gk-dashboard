import React, { useState } from "react";
import { Breadcrumb, Layout, theme } from "antd";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { LayoutWrapper } from "../assets/styles/layout-style";
const { Header, Content, Footer, Sider } = Layout;

const MainLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <LayoutWrapper
      style={{
        minHeight: "100vh",
      }}
    >
      <Sidebar />
      <Layout>
        <Content
          style={{
            margin: "16px 16px",
            border: "1px solid #acb2b9",
            padding: "10px",
            backgroundColor: "#fff",
          }}
        >
          <Outlet />
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          ©2023 Created by Cyber86z
        </Footer>
      </Layout>
    </LayoutWrapper>
  );
};
export default MainLayout;
