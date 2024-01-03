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
  return (
    <div>
      <Breadcrumb items={pageHeader.breadcrumb} />
      <iframe
        src="http://sqlq2.local:5601/app/discover#/view/6347d050-a92c-11ee-9e7f-79b61966b521?_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-24h%2Fh,to:now))&_a=(columns:!(),filters:!(),grid:(),hideChart:!f,index:'filebeat-*',interval:auto,query:(language:kuery,query:''),sort:!(!('@timestamp',desc)))"
        style={{ width: "100%", height: "1100px" }}
      />
    </div>
  );
};

export default DDoss;
