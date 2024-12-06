import { Breadcrumb, CreateButton } from "../../components";
import { Table, Select, Input, Row, Flex } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import { ACTION_NAME } from "../../commons/constants";
import { PageBodyWrapper } from "../../assets/styles/page-body-style";
import { useTranslation } from "react-i18next";

const pageHeader = (t) => {
  return {
    breadcrumb: [
      {
        title: t("home"),
      },
      {
        title: t("moniters"),
      },
      {
        title: t("ddoss"),
      },
    ],
  };
};

const DDoss = () => {
  const url = import.meta.env.VITE_BASE_ELK_LINK;
  const { t } = useTranslation();
  return (
    <div>
      <Breadcrumb items={pageHeader(t).breadcrumb} />
      <iframe
        src={`${url}/app/dashboards#/view/2992d090-ab8d-11ee-8042-0df3a663a99b?_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-15m,to:now))`}
        style={{ width: "100%", height: "800px", marginTop: 10 }}
      />
    </div>
  );
};

export default DDoss;
