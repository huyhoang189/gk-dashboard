import { useDispatch, useSelector } from "react-redux";
import { Breadcrumb, CreateButton } from "../../components";
import { useEffect } from "react";
import backupSlice from "../../toolkits/backups/slice";
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
      title: "Bảo mật và sao lưu",
    },
    {
      title: "Sao lưu dữ liệu",
    },
  ],
};

const Backups = () => {
  const dispatch = useDispatch();
  const { selectedBackup, isLoading } = useSelector((state) => state.backups);

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
      title: "status",
      dataIndex: "status",
      key: "status",
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

  const backups = [
    {
      name: "Thiết lập chế độ tự động sao lưu",
      status: (
        <Select
          style={{
            width: "100%",
          }}
          value={selectedBackup?.status}
          onChange={(e) => onSelectedInputChange("status", e)}
          options={[
            {
              value: 1,
              label: "Bật",
            },
            {
              value: 0,
              label: "Tắt",
            },
          ]}
        />
      ),

      value: (
        <Input
          style={{
            width: "100%",
          }}
          value={selectedBackup?.time}
          onChange={(e) => onTextInputChange("time", e)}
        />
      ),
    },
  ];

  const dataSource = backups.map((e, i) => ({ key: i + 1, ...e }));

  //function
  const onSelectedInputChange = (key, value) => {
    if (key) {
      let backupClone = Object.assign({}, selectedBackup);
      backupClone[key] = value;
      dispatch(backupSlice.actions.updateSelectedBackupInput(backupClone));
    }
  };

  const onTextInputChange = (key, event) => {
    if (key) {
      let backupClone = Object.assign({}, selectedBackup);
      backupClone[key] = event.target.value;
      dispatch(backupSlice.actions.updateSelectedBackupInput(backupClone));
    }
  };

  const handleRecord = (actionName, _item) => {
    let item = Object.assign({}, _item);
    dispatch(
      backupSlice.actions.handleBackup({
        item: item,
        actionName: actionName,
      })
    );
  };
  //side effect
  useEffect(() => {
    dispatch(backupSlice.actions.getBackups());
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
          onClick={() => handleRecord(ACTION_NAME.UPDATE, selectedBackup)}
        />
      </Flex>
    </div>
  );
};

export default Backups;
