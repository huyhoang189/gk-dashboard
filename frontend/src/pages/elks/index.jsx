import { Breadcrumb, CreateButton } from "../../components";
import { Table, Select, Input, Row, Flex } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import { ACTION_NAME } from "../../commons/constants";

const pageHeader = {
  title: "Danh sách ip",
  breadcrumb: [
    {
      title: "Trang chủ",
    },
    {
      title: "Gíam sát",
    },
    {
      title: "Giám sát lưu lượng",
    },
  ],
};

const ElasticSearch = () => {
  const url = import.meta.env.VITE_BASE_ELK_LINK;

  return (
    <div>
      <Breadcrumb items={pageHeader.breadcrumb} />
      <iframe
        src={`${url}/app/dashboards#/view/9e568890-a65b-11ee-9ede-ddd46c7abab1?_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-15m,to:now))`}
        style={{ width: "100%", height: "1100px" }}
      />
    </div>
  );
};

export default ElasticSearch;
