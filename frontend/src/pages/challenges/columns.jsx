export const challengeColumns = [
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
    render: (text) => {
      const maxLength = 30; // Set your desired character limit here
      if (text.length > maxLength) {
        return <span>{`${text.slice(0, maxLength)}...`}</span>;
      }
      return <span>{text}</span>;
    },
  },
  {
    title: "Request",
    dataIndex: "request",
    key: "request",
    align: "center",
    render: (text) => {
      const maxLength = 50; // Set your desired character limit here
      if (text.length > maxLength) {
        return <span>{`${text.slice(0, maxLength)}...`}</span>;
      }
      return <span>{text}</span>;
    },
  },
  {
    title: "HTTP Status",
    dataIndex: "HTTPStatus",
    key: "HTTPStatus",
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
