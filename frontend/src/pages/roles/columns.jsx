export const roleColumns = [
  {
    title: "STT",
    dataIndex: "key",
    key: "key",
    width: 50,
    align: "center",
  },
  {
    title: "Nhóm quyền",
    dataIndex: "name",
    key: "name",
    align: "center",
  },
  {
    title: "Quyền",
    dataIndex: "permissions",
    key: "permissions",
    align: "center",
    render: (text, record) => {
      return text === "ADMIN" ? "Quản trị hệ thống" : "Trực giám sát";
    },
  },
];
