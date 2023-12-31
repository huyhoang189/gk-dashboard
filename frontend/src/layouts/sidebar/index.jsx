import { useState } from "react";
import { PUBLIC_ROUTER } from "../../commons/router-common";
import { Image, Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo.png";
const { Sider } = Layout;
const Sidebar = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const onSelectItem = (e) => {
    const path = e?.keyPath.reverse().join("\\");

    navigate(path.replace("rc-menu-more\\", "").replace("configs\\", ""));
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div style={{ padding: "10px 60px" }}>
        <Image src={logo} preview={false} />
      </div>
      <Menu
        theme="dark"
        mode="inline"
        items={PUBLIC_ROUTER}
        onClick={onSelectItem}
      />
    </Sider>
  );
};

export default Sidebar;
