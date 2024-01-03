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
      return parseDate(text);
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

const parseDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = date.getUTCFullYear();
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  const seconds = date.getUTCSeconds().toString().padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};
