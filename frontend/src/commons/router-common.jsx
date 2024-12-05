import {
  AimOutlined,
  BlockOutlined,
  ControlOutlined,
  HomeOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const PUBLIC_ROUTER = [
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

const getPublicRouter = (t) => {
  return [
    {
      key: "elks",
      label: t("elks"), // Sử dụng t() để dịch
      icon: <BlockOutlined />,
    },
    {
      key: "moniters",
      label: t("moniters"),
      icon: <AimOutlined />,
      children: [
        {
          key: "challenges",
          label: t("challenges"),
        },
        {
          key: "success",
          label: t("success"),
        },
        {
          key: "ddoss",
          label: t("ddoss"),
        },
      ],
    },
    {
      key: "configs",
      label: t("configs"),
      icon: <ControlOutlined />,
      children: [
        {
          key: "blacklists",
          label: t("blacklists"),
        },
        {
          key: "nginx",
          label: t("nginx"),
        },
        {
          key: "threshold",
          label: t("threshold"),
        },
        {
          key: "dnss",
          label: t("dnss"),
        },
        {
          key: "emails",
          label: t("emails"),
        },
      ],
    },
    {
      key: "systems",
      label: t("systems"),
      icon: <SettingOutlined />,
      children: [
        {
          key: "sessions",
          label: t("sessions"),
        },
        {
          key: "databases",
          label: t("databases"),
        },
        {
          key: "histories",
          label: t("histories"),
        },
        {
          key: "backups",
          label: t("backups"),
        },
        {
          key: "users",
          label: t("users"),
        },
        {
          key: "roles",
          label: t("roles"),
        },
        {
          key: "departments",
          label: t("departments"),
        },
        {
          key: "listens",
          label: t("listens"),
        },
        {
          key: "reports",
          label: t("reports"),
        },
      ],
    },
  ];
};

export { PUBLIC_ROUTER, getPublicRouter };
