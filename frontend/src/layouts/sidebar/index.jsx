import { useState } from "react";
import { getPublicRouter, PUBLIC_ROUTER } from "../../commons/router-common";
import { Flex, Image, Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import bg from "../../assets/img/3043140.jpg";
import { useTranslation } from "react-i18next";
const { Sider } = Layout;
const Sidebar = ({ user }) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
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
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      collapsedWidth="60"
      width={250}
    >
      <Flex justify="center">
        <Image src={logo} preview={false} width={100} style={{ padding: 10 }} />
      </Flex>

      <Menu
        style={{}}
        theme="dark"
        mode="inline"
        items={publicRouter}
        onClick={onSelectItem}
      />
    </Sider>
  );
};

export default Sidebar;
