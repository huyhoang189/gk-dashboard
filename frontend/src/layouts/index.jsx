import React, { useEffect, useState } from "react";
import {
  Avatar,
  Breadcrumb,
  Button,
  Divider,
  Flex,
  Image,
  Layout,
  Menu,
  Popover,
  Select,
  Space,
  theme,
  Typography,
} from "antd";
import Sidebar from "./sidebar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { LayoutWrapper } from "../assets/styles/layout-style";
import { UserOutlined } from "@ant-design/icons";
import authSlice from "../toolkits/auth/slice";
import { useDispatch, useSelector } from "react-redux";
import listenSlice from "../toolkits/listens/slice";
import { ACTION_NAME } from "../commons/constants";
import { useTranslation } from "react-i18next";
import vi_flag from "../assets/img/flag_vi.svg";
import en_flag from "../assets/img/flag_en.svg";
import logo from "../assets/img/logo.png";
import Navbar from "./navbar";
const { Header, Content, Footer, Sider } = Layout;

const MainLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const [lgValue, setLgValue] = useState("vi");

  const {
    token: { colorBgNavbar, borderRadiusLG },
  } = theme.useToken();
  const { user } = useSelector((state) => state.auths);

  useEffect(() => {
    window.document.title = "Anti-DDos";
  }, [window.location.pathname]);

  useEffect(() => {
    dispatch(authSlice.actions.checkAuthentication());
  }, [dispatch]);

  useEffect(() => {
    if (user?.id) {
      dispatch(
        listenSlice.actions.handleListen({
          item: {
            user_id: user?.id,
            url: window.location.href,
          },
          actionName: ACTION_NAME.CREATE,
        })
      );
    }
    i18n.changeLanguage(lgValue);
  }, [location.pathname]);

  const changeLanguage = (lng) => {
    setLgValue(lng);
    i18n.changeLanguage(lng); // Dynamically switch languages
  };

  return (
    <LayoutWrapper
      style={{
        minHeight: "100vh",
      }}
    >
      <Layout>
        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            height: 120,
          }}
        >
          <Flex
            style={{
              height: 70,
              width: "100%",
              backgroundColor: "#38454a",
              padding: "0 20px",
            }}
            justify={"space-between"}
            align="center"
          >
            <Flex align="center" justify={"flex-start"} gap={10}>
              <Image src={logo} width={60} preview={false} />
              <Typography.Title style={{ color: "#fff", fontWeight: 800 }}>
                {t("title")}
              </Typography.Title>
            </Flex>
            <Flex justify="center" align="center" gap={5}>
              <Select
                style={{ width: 140, backgroundColor: "transparent" }}
                onChange={(e) => changeLanguage(e)}
                value={lgValue}
                options={[
                  {
                    value: "vi",
                    label: (
                      <Flex justify="flex-start" align="center" gap={5}>
                        <Image preview={false} src={vi_flag} width={30} />
                        <span>Vietnamese</span>
                      </Flex>
                    ),
                  },
                  {
                    value: "en",
                    label: (
                      <Flex justify="flex-start" align="center" gap={5}>
                        <Image preview={false} src={en_flag} width={30} />
                        <span>English</span>
                      </Flex>
                    ),
                  },
                ]}
              >
                Select
              </Select>
            </Flex>
          </Flex>

          <Navbar />
        </div>

        <Content
          style={{
            margin: "8px 8px",
          }}
        >
          <Outlet />
        </Content>
        <Footer
          style={{
            padding: "10px 5px",
          }}
        >
          <Divider style={{ marginTop: 10, marginBottom: 10 }} />
          <Flex
            justify="space-between"
            align="center"
            style={{ width: "100%", fontWeight: "bold", padding: 10 }}
          >
            <span>{t("name_system")}</span>
            <span>
              {t("department_name")} ©{new Date().getFullYear()}
            </span>
          </Flex>
        </Footer>
      </Layout>
    </LayoutWrapper>
  );
};
export default MainLayout;
