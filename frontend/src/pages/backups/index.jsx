import { useDispatch, useSelector } from "react-redux";
import { Breadcrumb, CreateButton } from "../../components";
import { useEffect } from "react";
import backupSlice from "../../toolkits/backups/slice";
import { Table, Select, Input, Row, Flex, InputNumber } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import { ACTION_NAME } from "../../commons/constants";
import { parseDate } from "../../utils/common";
import { PageBodyWrapper } from "../../assets/styles/page-body-style";
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
        title: t("backups"),
      },
    ],
  };
};

const Backups = () => {
  const dispatch = useDispatch();
  const { selectedBackup, isLoading } = useSelector((state) => state.backups);
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
      name: "Thời gian tạo tệp tin sao lưu",
      value: parseDate(selectedBackup?.mtime) || "",
    },
    // {
    //   name: "Thời gian sửa đổi",
    //   value: parseDate(selectedBackup?.ctime) || "",
    // },
    // {
    //   name: "Thời gian tạo",
    //   value: parseDate(selectedBackup?.birthtime) || "",
    // },
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
            onClick={() => handleRecord(ACTION_NAME.UPDATE, selectedBackup)}
          />
        </Flex>
      </PageBodyWrapper>
    </div>
  );
};

export default Backups;
