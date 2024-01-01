import { convertDateFormatLog } from "../../utils/common";

export const historyColumns = [
  {
    title: "STT",
    dataIndex: "key",
    key: "key",
    width: 50,
    align: "center",
  },
  {
    title: "Client",
    dataIndex: "client",
    key: "client",
    align: "center",
  },
  {
    title: "Error",
    dataIndex: "error",
    key: "error",
    align: "center",
    render: (text) => {
      const maxLength = 100; // Set your desired character limit here
      if (text.length > maxLength) {
        return <span>{`${text.slice(0, maxLength)}...`}</span>;
      }
      return <span>{text}</span>;
    },
  },
  {
    title: "Server",
    dataIndex: "server",
    key: "server",
    align: "center",
  },
  {
    title: "Request",
    dataIndex: "request",
    key: "request",
    align: "center",
  },

  {
    title: "Timestamp",
    dataIndex: "timestamp",
    key: "timestamp",
    align: "center",
    // render: (text, record) => {
    //   return record?.timestamp && convertDateFormatLog(record?.timestamp);
    // },
  },
];
