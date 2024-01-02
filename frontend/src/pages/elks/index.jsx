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
  return (
    <div>
      <Breadcrumb items={pageHeader.breadcrumb} />
      <iframe
        src="http://sqlq2.local:5601/"
        style={{ width: "100%", height: "1100px" }}
      />
    </div>
  );
};

export default ElasticSearch;
