import {
  ControlOutlined,
  HomeOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const PUBLIC_ROUTER = [
  {
    key: "home",
    label: "Trang chủ",
    icon: <HomeOutlined />,
  },
  {
    key: "configs",
    label: "Cấu hình",
    icon: <ControlOutlined />,
    children: [
      {
        key: "blacklists",
        label: "Blacklist",
      },
    ],
  },
  {
    key: "systems",
    label: "Hệ thống",
    icon: <SettingOutlined />,
    children: [],
  },
];

export { PUBLIC_ROUTER };
