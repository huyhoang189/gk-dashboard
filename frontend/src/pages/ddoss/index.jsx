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
      title: "Giám sát truy vấn",
    },
    {
      title: "Cảnh báo DDos",
    },
  ],
};

const DDoss = () => {
  const url = import.meta.env.VITE_BASE_ELK_LINK;
  return (
    <div>
      <Breadcrumb items={pageHeader.breadcrumb} />
      <iframe
        src={`${url}/app/dashboards#/view/2992d090-ab8d-11ee-8042-0df3a663a99b?_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-15m,to:now))`}
        style={{ width: "100%", height: "1100px" }}
      />
    </div>
  );
};

export default DDoss;
