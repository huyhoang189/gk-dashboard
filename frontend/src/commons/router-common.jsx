import {
  AimOutlined,
  BlockOutlined,
  ControlOutlined,
  HomeOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const PUBLIC_ROUTER = [
  // {
  //   key: "home",
  //   label: "Trang chủ",
  //   icon: <HomeOutlined />,
  // },
  {
    key: "elks",
    label: "Giám sát lưu lượng",
    icon: <BlockOutlined />,
  },
  {
    key: "moniters",
    label: "Giám sát truy vấn",
    icon: <AimOutlined />,
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
        key: "ddoss",
        label: "Cảnh báo DDos",
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
      // {
      //   key: "whitelists",
      //   label: "Whitelist",
      // },
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
        key: "sessions",
        label: "Bảo mật hệ thống",
      },
      {
        key: "databases",
        label: "Bảo mật CSDL",
      },

      {
        key: "histories",
        label: "Nhật ký hệ thống",
      },
      {
        key: "backups",
        label: "Sao lưu dữ liệu",
      },
      {
        key: "users",
        label: "Người dùng",
      },
      {
        key: "roles",
        label: "Nhóm quyền",
      },
      {
        key: "departments",
        label: "Đơn vị",
      },
      {
        key: "listens",
        label: "Theo dõi hành vi",
      },
      {
        key: "reports",
        label: "Tổng hợp, báo cáo",
      },
    ],
  },
];

export { PUBLIC_ROUTER };
