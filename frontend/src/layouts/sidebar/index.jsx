import { useState } from "react";
import { PUBLIC_ROUTER } from "../../commons/router-common";
import { Image, Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import bg from "../../assets/img/3043140.jpg";
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
      style={{
        background: `url(${bg})`, // Replace with the actual path to your image
        backgroundSize: "cover", // Adjust as needed
        backgroundRepeat: "no-repeat", // Adjust as needed
        backgroundPosition: "bottom right", // Adjust as needed
      }}
    >
      <div style={{ padding: "10px 60px" }}>
        <Image src={logo} preview={false} />
      </div>
      <Menu
        style={{ opacity: 0.9, backgroundColor: "#192655" }}
        theme="dark"
        mode="inline"
        items={PUBLIC_ROUTER}
        onClick={onSelectItem}
      />
    </Sider>
  );
};

export default Sidebar;
