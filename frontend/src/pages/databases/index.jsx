import { useDispatch, useSelector } from "react-redux";
import { Breadcrumb, CreateButton } from "../../components";
import { useEffect } from "react";
import databaseSlice from "../../toolkits/databases/slice";
import { Table, Select, Input, Row, Flex } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import { ACTION_NAME } from "../../commons/constants";

const FIELDS = {
  MAX_QUERIES_PER_HOUR: "max_queries_per_hour",
  MAX_UPDATE_PER_HOUR: "max_update_per_hour",
  MAX_CONNECTIONS_PER_HOUR: "max_connections_per_hour",
  LIMIT_RECORDS_PER_QUERY: "limit_records_per_query",
};

const pageHeader = {
  title: "Danh sách ip",
  breadcrumb: [
    {
      title: "Trang chủ",
    },
    {
      title: "Bảo mật và sao lưu",
    },
    {
      title: "Bảo mật hệ thống",
    },
  ],
};

const Databases = () => {
  const dispatch = useDispatch();
  const { selectedDatabase, isLoading } = useSelector(
    (state) => state.databases
  );

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

  const databases = [
    {
      variable: FIELDS.MAX_QUERIES_PER_HOUR,
      name: "Giới hạn số truy vấn mỗi giờ",
      value: (
        <Input
          style={{
            width: "100%",
          }}
          value={selectedDatabase["MAX_QUERIES_PER_HOUR"]}
          onChange={(e) => onTextInputChange("MAX_QUERIES_PER_HOUR", e)}
        />
      ),
    },
    {
      variable: FIELDS.MAX_UPDATE_PER_HOUR,
      name: "Giới hạn cập nhật mỗi giờ",
      value: (
        <Input
          style={{
            width: "100%",
          }}
          value={selectedDatabase["MAX_UPDATE_PER_HOUR"]}
          onChange={(e) => onTextInputChange("MAX_UPDATE_PER_HOUR", e)}
        />
      ),
    },
    {
      variable: FIELDS.MAX_CONNECTIONS_PER_HOUR,
      name: "Giới hạn kết nối mỗi giờ",
      value: (
        <Input
          style={{
            width: "100%",
          }}
          value={selectedDatabase["MAX_CONNECTIONS_PER_HOUR"]}
          onChange={(e) => onTextInputChange("MAX_CONNECTIONS_PER_HOUR", e)}
        />
      ),
    },
    {
      variable: FIELDS.LIMIT_RECORDS_PER_QUERY,
      name: "Giới hạn số lượng bản ghi cho mỗi truy vấn ",
      value: (
        <Input
          style={{
            width: "100%",
          }}
          value={selectedDatabase["LIMIT_RECORDS_PER_QUERY"]}
          onChange={(e) => onTextInputChange("LIMIT_RECORDS_PER_QUERY", e)}
        />
      ),
    },
  ];

  const dataSource = databases.map((e, i) => ({ key: i + 1, ...e }));

  //function
  const onSelectedInputChange = (key, value) => {
    if (key) {
      let databaseClone = Object.assign({}, selectedDatabase);
      databaseClone[key] = value;
      dispatch(
        databaseSlice.actions.updateSelectedDatabaseInput(databaseClone)
      );
    }
  };

  const onTextInputChange = (key, event) => {
    if (key) {
      let databaseClone = Object.assign({}, selectedDatabase);
      databaseClone[key] = event.target.value;
      dispatch(
        databaseSlice.actions.updateSelectedDatabaseInput(databaseClone)
      );
    }
  };

  const handleRecord = (actionName, _item) => {
    let item = Object.assign({}, _item);
    dispatch(
      databaseSlice.actions.handleDatabase({
        item: item,
        actionName: actionName,
      })
    );
  };
  //side effect
  useEffect(() => {
    dispatch(databaseSlice.actions.getDatabases());
  }, [dispatch]);
  return (
    <div>
      <Breadcrumb items={pageHeader.breadcrumb} />
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
          btnTxt="Lưu và đồng bộ dữ liệu"
          icon={<SyncOutlined />}
          onClick={() => handleRecord(ACTION_NAME.UPDATE, selectedDatabase)}
        />
      </Flex>
    </div>
  );
};

export default Databases;
