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
    key: "elks",
    label: "Giám sát lưu lượng",
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
      {
        key: "threshold",
        label: "Ngưỡng cảnh báo",
      },
      {
        key: "dnss",
        label: "DNS",
      },
      {
        key: "emails",
        label: "Email",
      },
    ],
  },
  {
    key: "systems",
    label: "Hệ thống",
    icon: <SettingOutlined />,
    children: [
      {
        key: "databases",
        label: "Bảo mật hệ thống",
      },
      {
        key: "histories",
        label: "Nhật ký hệ thống",
      },
      {
        key: "backups",
        label: "Sao lưu dữ liệu",
      },
    ],
  },
];

export { PUBLIC_ROUTER };
