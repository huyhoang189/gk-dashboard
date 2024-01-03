import { Tag } from "antd";

export const dnsColumns = [
  {
    title: "STT",
    dataIndex: "key",
    key: "key",
    width: 50,
    align: "center",
  },
  {
    title: "IP",
    dataIndex: "ip",
    key: "ip",
    align: "center",
  },
  {
    title: "Trạng thái sử dụng",
    dataIndex: "active",
    key: "active",
    align: "center",
    render: (text) => {
      return text == 1 ? (
        <Tag color="green">Đang sử dụng</Tag>
      ) : (
        <Tag color="red">Không sử dụng</Tag>
      );
    },
  },
  {
    title: "Trạng thái sẵn sàng",
    dataIndex: "status",
    key: "status",
    align: "center",
    render: (text) => {
      return text == 1 ? (
        <Tag color="green">Sãn sàng</Tag>
      ) : (
        <Tag color="red">Không sẵn sàng</Tag>
      );
    },
  },
];
