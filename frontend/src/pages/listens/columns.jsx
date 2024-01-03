import { parseDate } from "../../utils/common";

export const listenColumns = [
  {
    title: "STT",
    dataIndex: "key",
    key: "key",
    width: 50,
    align: "center",
  },
  {
    title: "URL",
    dataIndex: "url",
    key: "url",
    // align: "center",
  },
  {
    title: "Time",
    dataIndex: "time",
    key: "time",
    align: "center",
    render: (text) => {
      return parseDate(text) || "";
    },
  },
  {
    title: "Người truy cập",
    dataIndex: "user",
    key: "user",
    align: "center",
    render: (text, record) => {
      return record?.users?.name;
    },
  },
];
