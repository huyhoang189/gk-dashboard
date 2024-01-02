export const departmentColumns = [
  {
    title: "STT",
    dataIndex: "key",
    key: "key",
    width: 50,
    align: "center",
  },
  {
    title: "Tên đơn vị",
    dataIndex: "name",
    key: "name",
    align: "center",
  },
  {
    title: "Mã đơn vị",
    dataIndex: "identification",
    key: "identification",
    align: "center",
  },
  {
    title: "Mô tả",
    dataIndex: "description",
    key: "description",
    align: "center",
  },
  {
    title: "Đơn vị cha",
    dataIndex: "parent",
    key: "parent",
    align: "center",
    render: (text, record) => {
      return record?.departments?.name;
    },
  },
];
