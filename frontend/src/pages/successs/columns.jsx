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
    // align: "center",
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
    // align: "center",
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

const randomIP = () => {
  // Define the range
  const start = [192, 168, 10, 10];
  const end = [192, 168, 200, 122];

  // Convert IP to a single number for the range
  const ipToNumber = (ip) => {
    return ip.reduce((acc, octet) => (acc << 8) | octet, 0);
  };

  // Convert number back to IP
  const numberToIP = (num) => {
    return [
      (num >>> 24) & 0xff,
      (num >>> 16) & 0xff,
      (num >>> 8) & 0xff,
      num & 0xff,
    ].join(".");
  };

  // Generate a random number in the range
  const startNum = ipToNumber(start);
  const endNum = ipToNumber(end);
  const randomNum =
    Math.floor(Math.random() * (endNum - startNum + 1)) + startNum;

  // Convert the number back to IP
  return numberToIP(randomNum);
};
