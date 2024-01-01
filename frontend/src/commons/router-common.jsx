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
    key: "monitering-query",
    label: "Giám sát truy vấn",
    icon: <HomeOutlined />,
    children: [
      {
        key: "challenge-log",
        label: "challenge",
      },
      {
        key: "success-log",
        label: "success",
      },
      {
        key: "error-log",
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
