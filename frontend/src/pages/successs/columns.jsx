export const successColumns = [
  {
    title: "STT",
    dataIndex: "key",
    key: "key",
    width: 50,
    align: "center",
  },
  {
    title: "IP source",
    dataIndex: "ip_source",
    key: "ip_source",
    align: "center",
  },
  {
    title: "Url",
    dataIndex: "url",
    key: "url",
    align: "center",
  },
  {
    title: "Request",
    dataIndex: "request",
    key: "request",
    align: "center",
  },
  {
    title: "HTTP Status",
    dataIndex: "HTTPStatus",
    key: "HTTPStatus",
    align: "center",
  },
  {
    title: "Reponse Size",
    dataIndex: "responseSize",
    key: "responseSize",
    align: "center",
  },
  {
    title: "Timestamp",
    dataIndex: "timestamp",
    key: "timestamp",
    align: "center",
    render: (text, record) => {
      return record?.timestamp;
    },
  },
];
