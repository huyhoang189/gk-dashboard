export const userColumns = [
  {
    title: "STT",
    dataIndex: "key",
    key: "key",
    width: 50,
    align: "center",
  },
  {
    title: "Tên tài khoản",
    dataIndex: "username",
    key: "username",
    align: "center",
  },
  {
    title: "Nhóm quyền",
    dataIndex: "permission",
    key: "permission",
    align: "center",
    render: (text, record) => {
      return record?.roles?.name;
    },
  },
];
