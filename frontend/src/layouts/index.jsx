import React, { useEffect, useState } from "react";
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
import authSlice from "../toolkits/auth/slice";
import { useDispatch, useSelector } from "react-redux";
const { Header, Content, Footer, Sider } = Layout;

const MainLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { user } = useSelector((state) => state.auths);

  useEffect(() => {
    window.document.title = "Anti-DDOS";
  }, [window.location.pathname]);

  useEffect(() => {
    dispatch(authSlice.actions.checkAuthentication());
  }, [dispatch]);

  return (
    <LayoutWrapper
      style={{
        minHeight: "100vh",
      }}
    >
      <Sidebar user={user} />

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
                      dispatch(authSlice.actions.logout());
                      // navigate("login", { replace: true });
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
                <h3>{user?.username}</h3>
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
