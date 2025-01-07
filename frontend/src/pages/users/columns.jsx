export const userColumns = [
  {
    title: "STT",
    dataIndex: "key",
    key: "key",
    width: 50,
    align: "center",
  },
  {
    title: "Tên người dùng",
    dataIndex: "name",
    key: "name",
    align: "center",
  },
  {
    title: "Tên tài khoản",
    dataIndex: "username",
    key: "username",
    align: "center",
  },
  {
    title: "Mô tả",
    dataIndex: "description",
    key: "description",
    align: "center",
  },
  {
    title: "Phòng ban",
    dataIndex: "department",
    key: "department",
    align: "center",
    render: (text, record) => {
      return record?.departments?.name;
    },
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
