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
        title: t("systems"),
      },
      {
        title: t("reports"),
      },
    ],
  };
};

const Reports = () => {
  const { t } = useTranslation();
  const url = import.meta.env.VITE_BASE_ELK_LINK;
  return (
    <div>
      <Breadcrumb items={pageHeader(t).breadcrumb} />
      <iframe
        src={`${url}/app/discover#/view/20631570-aa89-11ee-b5a0-b3a335940e46?_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-7d%2Fd,to:now))&_a=(columns:!(rule.name,source.ip,source.port,destination.ip,destination.port),filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'filebeat-*',key:event.kind,negate:!f,params:(query:alert),type:phrase),query:(match_phrase:(event.kind:alert))),('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'filebeat-*',key:event.module,negate:!f,params:(query:suricata),type:phrase),query:(match_phrase:(event.module:(query:suricata)))),('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'filebeat-*',key:message,negate:!f,params:(query:'Attempted%20Denial%20of%20Service'),type:phrase),query:(match_phrase:(message:'Attempted%20Denial%20of%20Service')))),grid:(),hideChart:!f,index:'filebeat-*',interval:auto,query:(language:kuery,query:''),sort:!(!('@timestamp',desc)))`}
        style={{ width: "100%", height: "800px", marginTop: 10 }}
      />
    </div>
  );
};

export default Reports;
