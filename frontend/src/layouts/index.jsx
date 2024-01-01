import React, { useState } from "react";
import {
  Avatar,
  Breadcrumb,
  Flex,
  Layout,
  Menu,
  Popover,
  Space,
  theme,
} from "antd";
import Sidebar from "./sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { LayoutWrapper } from "../assets/styles/layout-style";
import { UserOutlined } from "@ant-design/icons";
const { Header, Content, Footer, Sider } = Layout;

const MainLayout = () => {
  const navigate = useNavigate();
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
        <Header
          style={{
            height: 50,
            width: "100%",
            backgroundColor: colorBgContainer,
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Flex
            style={{ height: 50, width: "100%" }}
            justify={"flex-end"}
            align="center"
          >
            <Popover
              content={
                <Menu
                  mode="inline"
                  theme="light"
                  style={{ width: 200, margin: 0 }}
                >
                  <Menu.Item
                    // key={uuid()}
                    onClick={() => {
                      // dispatch(authSlice.actions.toggleModal(null));
                    }}
                  >
                    Thông tin cá nhân
                  </Menu.Item>
                  <Menu.Item
                    // key={uuid()}
                    onClick={() => {
                      // dispatch(authSlice.actions.logout());
                      navigate("login", { replace: true });
                    }}
                  >
                    Đăng xuất
                  </Menu.Item>
                </Menu>
              }
              trigger="click"
              placement="bottom"
            >
              <Space size={8} style={{ height: 50 }}>
                <Avatar icon={<UserOutlined />} size={30} />
                <h3>Administrators</h3>
              </Space>
            </Popover>
          </Flex>
        </Header>
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
