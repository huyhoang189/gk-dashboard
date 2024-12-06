import { Breadcrumb, CreateButton } from "../../components";
import { Table, Select, Input, Row, Flex } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import { ACTION_NAME } from "../../commons/constants";
import { useTranslation } from "react-i18next";

const pageHeader = (t) => {
  return {
    breadcrumb: [
      {
        title: t("home"),
      },
      {
        title: t("elks"),
      },
    ],
  };
};

const ElasticSearch = () => {
  const { t } = useTranslation();
  const url = import.meta.env.VITE_BASE_ELK_LINK;

  return (
    <div>
      <Breadcrumb items={pageHeader(t).breadcrumb} />
      <iframe
        src={`${url}/app/dashboards#/view/9e568890-a65b-11ee-9ede-ddd46c7abab1?_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-15m,to:now))`}
        style={{ width: "100%", height: "800px", marginTop: 10 }}
      />
    </div>
  );
};

export default ElasticSearch;
