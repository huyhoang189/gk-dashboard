import { useState } from "react";
import { getPublicRouter, PUBLIC_ROUTER } from "../../commons/router-common";
import { Avatar, Dropdown, Flex, Image, Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import bg from "../../assets/img/3043140.jpg";
import { useTranslation } from "react-i18next";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import authSlice from "../../toolkits/auth/slice";
const { Sider } = Layout;
const Navbar = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const onSelectItem = (e) => {
    const path = e?.keyPath.reverse().join("\\");

    navigate(
      path
        .replace("rc-menu-more\\", "")
        .replace("configs\\", "")
        .replace("moniters\\", "")
        .replace("systems\\", "")
    );
  };

  let publicRouter = [];

  if (user?.roles !== undefined) {
    publicRouter =
      user.roles?.permissions === "ADMIN"
        ? PUBLIC_ROUTER
        : PUBLIC_ROUTER.filter(
            (e) => e.key !== "systems" && e.key !== "configs"
          );
  } else {
    // console.log("user null");
  }

  //adding
  publicRouter = getPublicRouter(t);

  return (
    <Flex
      style={{
        width: "100%",
        padding: "0 20px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
        backgroundColor: "#fff",
      }}
      justify="space-between"
      align="center"
    >
      <Menu
        items={publicRouter}
        onClick={onSelectItem}
        mode="horizontal"
        style={{ minWidth: "50%" }}
      />
      <Dropdown
        placement="bottom"
        arrow
        trigger={["click"]}
        menu={{
          items: [
            {
              key: "LOGOUT",
              label: (
                <Flex gap={10}>
                  <LogoutOutlined /> <span>Đăng xuất</span>
                </Flex>
              ),
            },
          ],
          onClick: (e) => {
            const { key } = e;
            if (key === "LOGOUT") {
              dispatch(authSlice.actions.logout());
            }
          },
        }}
      >
        <Flex
          size={8}
          style={{ height: 40 }}
          align="center"
          justify="center"
          gap={5}
        >
          <Avatar icon={<UserOutlined />} size={30} />
          <h3 style={{}}>{user?.name || "Giám sát hệ thống"}</h3>
        </Flex>
      </Dropdown>
    </Flex>
  );
};

export default Navbar;
