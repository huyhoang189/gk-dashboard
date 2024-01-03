import { useDispatch, useSelector } from "react-redux";
import { Breadcrumb, CreateButton } from "../../components";
import { useEffect } from "react";
import backupSlice from "../../toolkits/backups/slice";
import { Table, Select, Input, Row, Flex, InputNumber } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import { ACTION_NAME } from "../../commons/constants";
import { parseDate } from "../../utils/common";

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
      // width: 500,
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      align: "center",
      width: 800,
    },
  ];

  const backups = [
    {
      name: "Trạng thái sao lưu",
      value: (
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
    },
    {
      name: "Thời gian sao lưu (Giờ)",

      value: (
        <InputNumber
          min={0}
          max={24}
          style={{
            width: "100%",
          }}
          value={selectedBackup?.time}
          onChange={(e) => onInputNumberChange("time", e)}
        />
      ),
    },
    {
      name: "Đường dẫn lưu trữ",
      value: selectedBackup?.cfg_path,
    },
    {
      name: "Thời gian cập nhật",
      value: parseDate(selectedBackup?.mtime) || "",
    },
    {
      name: "Thời gian sửa đổi",
      value: parseDate(selectedBackup?.ctime) || "",
    },
    {
      name: "Thời gian tạo",
      value: parseDate(selectedBackup?.birthtime) || "",
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

  const onInputNumberChange = (key, value) => {
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
