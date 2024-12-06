import { useDispatch, useSelector } from "react-redux";
import { Breadcrumb, CreateButton } from "../../components";
import { useEffect } from "react";
import sessionSlice from "../../toolkits/sessions/slice";
import { Table, Select, Input, Row, Flex, InputNumber } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import { ACTION_NAME } from "../../commons/constants";
import { PageBodyWrapper } from "../../assets/styles/page-body-style";
import { useTranslation } from "react-i18next";

const FIELDS = {
  MAX_CONNECTIONS_PER_HOUR: "max_connections_per_hour",
  SESSION_TIME_EXPIRED: "session_time_expired",
};

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
        title: t("sessions"),
      },
    ],
  };
};

const Sessions = () => {
  const dispatch = useDispatch();
  const { selectedSession, isLoading } = useSelector((state) => state.sessions);
  const { t } = useTranslation();
  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
      width: 50,
      align: "center",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Variable",
      dataIndex: "variable",
      key: "variable",
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      align: "center",
      width: 500,
      render: (text, record) => {
        return record?.value;
      },
    },
  ];

  const sessions = [
    {
      variable: FIELDS.MAX_CONNECTIONS_PER_HOUR,
      name: "Giời hạn kết nối mỗi giờ",
      value: (
        <InputNumber
          style={{
            width: "100%",
          }}
          value={selectedSession["MAX_CONNECTIONS_PER_HOUR"]}
          onChange={(e) => onTextInputChange("MAX_CONNECTIONS_PER_HOUR", e)}
        />
      ),
    },
    {
      variable: FIELDS.SESSION_TIME_EXPIRED,
      name: "Thời gian Session",
      value: (
        <InputNumber
          style={{
            width: "100%",
          }}
          value={selectedSession["SESSION_TIME_EXPIRED"]}
          onChange={(e) => onTextInputChange("SESSION_TIME_EXPIRED", e)}
        />
      ),
    },
  ];

  const dataSource = sessions.map((e, i) => ({ key: i + 1, ...e }));

  //function
  const onSelectedInputChange = (key, value) => {
    if (key) {
      let sessionClone = Object.assign({}, selectedSession);
      sessionClone[key] = value;
      dispatch(sessionSlice.actions.updateSelectedSessionInput(sessionClone));
    }
  };

  const onTextInputChange = (key, event) => {
    if (key) {
      let sessionClone = Object.assign({}, selectedSession);
      sessionClone[key] = event;
      dispatch(sessionSlice.actions.updateSelectedSessionInput(sessionClone));
    }
  };

  const handleRecord = (actionName, _item) => {
    let item = Object.assign({}, _item);
    dispatch(
      sessionSlice.actions.handleSession({
        item: item,
        actionName: actionName,
      })
    );
  };
  //side effect
  useEffect(() => {
    dispatch(sessionSlice.actions.getSessions());
  }, [dispatch]);
  return (
    <div>
      <Breadcrumb items={pageHeader(t).breadcrumb} />
      <PageBodyWrapper>
        <Table
          pagination={false}
          dataSource={dataSource}
          columns={columns}
          bordered
          showHeader={false}
          loading={isLoading}
        />

        <Flex justify="center" style={{ marginTop: 10 }}>
          <CreateButton
            btnTxt={t("save")}
            icon={<SyncOutlined />}
            onClick={() => handleRecord(ACTION_NAME.UPDATE, selectedSession)}
          />
        </Flex>
      </PageBodyWrapper>
    </div>
  );
};

export default Sessions;
