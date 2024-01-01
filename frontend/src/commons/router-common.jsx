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
    key: "moniters",
    label: "Giám sát truy vấn",
    icon: <HomeOutlined />,
    children: [
      {
        key: "challenges",
        label: "challenge",
      },
      {
        key: "success",
        label: "success",
      },
      {
        key: "error",
        label: "error",
      },
    ],
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
      {
        key: "whitelists",
        label: "Whitelist",
      },
      {
        key: "nginx",
        label: "Cấu hình Challenge",
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
