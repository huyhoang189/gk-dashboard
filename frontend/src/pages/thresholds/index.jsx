import { useDispatch, useSelector } from "react-redux";
import { Breadcrumb, CreateButton } from "../../components";
import { useEffect } from "react";
import thresholdSlice from "../../toolkits/thresholds/slice";
import { Table, Select, Input, Row, Flex } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import { ACTION_NAME } from "../../commons/constants";

const FIELDS = {
  TCP_FLOOD: "tcp_flood",
  UDP_FLOOD: "udp_flood",
  ICMP_FLOOD: "icmp_flood",
  SYN_FLOOD: "syn_flood",
  TCP_AMPLIFICATION: "tcp_amplification",
  UDP_AMPLIFICATION: "udp_amplification",
  REQUEST_RATE: "request_rate",
  CPU_USAGE: "cpu_usage",
  MEMORY_USAGE: "memory_usage",
  NETWORK_IN: "network_in",
};

const pageHeader = {
  title: "Danh sách ip",
  breadcrumb: [
    {
      title: "Trang chủ",
    },
    {
      title: "Cấu hình",
    },
    {
      title: "Cấu hình Threshold",
    },
  ],
};

const Thresholds = () => {
  const dispatch = useDispatch();
  const { selectedThreshold, isLoading } = useSelector(
    (state) => state.thresholds
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

  const thresholds = [
    {
      variable: FIELDS.TCP_FLOOD,
      name: "Ngưỡng TCP Flood (1s)",
      value: (
        <Input
          style={{
            width: "100%",
          }}
          value={selectedThreshold["TCP_FLOOD"]}
          onChange={(e) => onTextInputChange("TCP_FLOOD", e)}
        />
      ),
    },
    {
      variable: FIELDS.UDP_FLOOD,
      name: "Ngưỡng UDP Flood (1s)",
      value: (
        <Input
          style={{
            width: "100%",
          }}
          value={selectedThreshold["UDP_FLOOD"]}
          onChange={(e) => onTextInputChange("UDP_FLOOD", e)}
        />
      ),
    },
    {
      variable: FIELDS.ICMP_FLOOD,
      name: "Ngưỡng ICMP Flood (1s)",
      value: (
        <Input
          style={{
            width: "100%",
          }}
          value={selectedThreshold["ICMP_FLOOD"]}
          onChange={(e) => onTextInputChange("ICMP_FLOOD", e)}
        />
      ),
    },
    {
      variable: FIELDS.SYN_FLOOD,
      name: "Ngưỡng SYN Flood (1s)",
      value: (
        <Input
          style={{
            width: "100%",
          }}
          value={selectedThreshold["SYN_FLOOD"]}
          onChange={(e) => onTextInputChange("SYN_FLOOD", e)}
        />
      ),
    },
    {
      variable: FIELDS.TCP_AMPLIFICATION,
      name: "Ngưỡng TCP Amplification (1s)",
      value: (
        <Input
          style={{
            width: "100%",
          }}
          value={selectedThreshold["TCP_AMPLIFICATION"]}
          onChange={(e) => onTextInputChange("TCP_AMPLIFICATION", e)}
        />
      ),
    },
    {
      variable: FIELDS.UDP_AMPLIFICATION,
      name: "Ngưỡng UDP Amplification (1s)",
      value: (
        <Input
          style={{
            width: "100%",
          }}
          value={selectedThreshold["UDP_AMPLIFICATION"]}
          onChange={(e) => onTextInputChange("UDP_AMPLIFICATION", e)}
        />
      ),
    },
    {
      variable: FIELDS.REQUEST_RATE,
      name: "Ngưỡng tần suất yêu cầu (1s)",
      value: (
        <Input
          style={{
            width: "100%",
          }}
          value={selectedThreshold["REQUEST_RATE"]}
          onChange={(e) => onTextInputChange("REQUEST_RATE", e)}
        />
      ),
    },
    {
      variable: FIELDS.CPU_USAGE,
      name: "Ngưỡng hiệu suất CPU (10s)",
      value: (
        <Input
          style={{
            width: "100%",
          }}
          value={selectedThreshold["CPU_USAGE"]}
          onChange={(e) => onTextInputChange("CPU_USAGE", e)}
        />
      ),
    },
    {
      variable: FIELDS.MEMORY_USAGE,
      name: "Ngưỡng hiệu suất RAM (10s)",
      value: (
        <Input
          style={{
            width: "100%",
          }}
          value={selectedThreshold["MEMORY_USAGE"]}
          onChange={(e) => onTextInputChange("MEMORY_USAGE", e)}
        />
      ),
    },
    {
      variable: FIELDS.NETWORK_IN,
      name: "Ngưỡng băng thông vào (Mbps)",
      value: (
        <Input
          style={{
            width: "100%",
          }}
          value={selectedThreshold["NETWORK_IN"]}
          onChange={(e) => onTextInputChange("NETWORK_IN", e)}
        />
      ),
    },
  ];

  const dataSource = thresholds.map((e, i) => ({ key: i + 1, ...e }));

  //function
  const onSelectedInputChange = (key, value) => {
    if (key) {
      let thresholdClone = Object.assign({}, selectedThreshold);
      thresholdClone[key] = value;
      dispatch(
        thresholdSlice.actions.updateSelectedThresholdInput(thresholdClone)
      );
    }
  };

  const onTextInputChange = (key, event) => {
    if (key) {
      let thresholdClone = Object.assign({}, selectedThreshold);
      thresholdClone[key] = event.target.value;
      dispatch(
        thresholdSlice.actions.updateSelectedThresholdInput(thresholdClone)
      );
    }
  };

  const handleRecord = (actionName, _item) => {
    let item = Object.assign({}, _item);
    dispatch(
      thresholdSlice.actions.handleThreshold({
        item: item,
        actionName: actionName,
      })
    );
  };
  //side effect
  useEffect(() => {
    dispatch(thresholdSlice.actions.getThresholds());
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
          onClick={() => handleRecord(ACTION_NAME.UPDATE, selectedThreshold)}
        />
      </Flex>
    </div>
  );
};

export default Thresholds;
