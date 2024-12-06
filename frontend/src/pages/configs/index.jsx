import { useDispatch, useSelector } from "react-redux";
import { Breadcrumb, CreateButton } from "../../components";
import { useEffect } from "react";
import configSlice from "../../toolkits/configs/slice";
import { Table, Select, Input, Row, Flex } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import { ACTION_NAME } from "../../commons/constants";
import { PageBodyWrapper } from "../../assets/styles/page-body-style";
import { useTranslation } from "react-i18next";

const FIELDS = {
  ROBOO_CHALLENGE_MODES: "$Roboo_challenge_modes",
  ROBOO_COOKIE_NAME: "$Roboo_cookie_name",
  ROBOO_CHARSET: "$Roboo_charset",
  HTTP302_URL_VARIABLE_NAME: "$http302_url_variable_name",
  HTTP302_SECRET_KEY: "$http302_secret_key",
  HTTP302_PASS_KEY: "$http302_pass_key",
  HTTP302_TRUNC_VALID_COOKIE_AMOUNT: "$http302_trunc_valid_cookie_amount",
  ROBOO_VALIDITY_WINDOW: "$Roboo_validity_window",
  CAP_SECRET_KEY: "$cap_secret_key",
  CAP_PASS_KEY: "$cap_pass_key",
  CAP_TRUNC_VALID_COOKIE_AMOUNT: "$cap_trunc_valid_cookie_amount",
};

const pageHeader = (t) => {
  return {
    breadcrumb: [
      {
        title: t("home"),
      },
      {
        title: t("configs"),
      },
      {
        title: t("nginx"),
      },
    ],
  };
};

const Configs = () => {
  const dispatch = useDispatch();
  const { selectedConfig, isLoading } = useSelector((state) => state.configs);
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

  const configs = [
    {
      variable: FIELDS.ROBOO_CHALLENGE_MODES,
      name: "Chế độ Challenge",
      value: (
        <Select
          style={{
            width: "100%",
          }}
          value={selectedConfig["ROBOO_CHALLENGE_MODES"]}
          onChange={(e) => onSelectedInputChange("ROBOO_CHALLENGE_MODES", e)}
          options={[
            {
              value: "CAP",
              label: "Captcha",
            },
            {
              value: "JS",
              label: "Javascript",
            },
            {
              value: "HTTP302",
              label: "HTTP 302",
            },
          ]}
        />
      ),
    },
    {
      variable: FIELDS.ROBOO_COOKIE_NAME,
      name: "Tên Cookie",
      value: (
        <Input
          style={{
            width: "100%",
          }}
          value={selectedConfig["ROBOO_COOKIE_NAME"]}
          onChange={(e) => onTextInputChange("ROBOO_COOKIE_NAME", e)}
        />
      ),
    },
    {
      variable: FIELDS.ROBOO_CHARSET,
      name: "Bộ ký tự",
      value: (
        <Input
          style={{
            width: "100%",
          }}
          value={selectedConfig["ROBOO_CHARSET"]}
          onChange={(e) => onTextInputChange("ROBOO_CHARSET", e)}
        />
      ),
    },
    {
      variable: FIELDS.HTTP302_URL_VARIABLE_NAME,
      name: "Tên biến URL",
      value: (
        <Input
          style={{
            width: "100%",
          }}
          value={selectedConfig["HTTP302_URL_VARIABLE_NAME"]}
          onChange={(e) => onTextInputChange("HTTP302_URL_VARIABLE_NAME", e)}
        />
      ),
    },
    {
      variable: FIELDS.HTTP302_SECRET_KEY,
      name: "Secret Key",
      value: (
        <Input
          style={{
            width: "100%",
          }}
          value={selectedConfig["HTTP302_SECRET_KEY"]}
          onChange={(e) => onTextInputChange("HTTP302_SECRET_KEY", e)}
        />
      ),
    },
    {
      variable: FIELDS.HTTP302_PASS_KEY,
      name: "Pass Key",
      value: (
        <Input
          style={{
            width: "100%",
          }}
          value={selectedConfig["HTTP302_PASS_KEY"]}
          onChange={(e) => onTextInputChange("HTTP302_PASS_KEY", e)}
        />
      ),
    },
    {
      variable: FIELDS.HTTP302_TRUNC_VALID_COOKIE_AMOUNT,
      name: "Thời gian cookie",
      value: (
        <Input
          style={{
            width: "100%",
          }}
          value={selectedConfig["HTTP302_TRUNC_VALID_COOKIE_AMOUNT"]}
          onChange={(e) =>
            onTextInputChange("HTTP302_TRUNC_VALID_COOKIE_AMOUNT", e)
          }
        />
      ),
    },
    {
      variable: FIELDS.ROBOO_VALIDITY_WINDOW,
      name: "Thời gian xác thực Script",
      value: (
        <Input
          style={{
            width: "100%",
          }}
          value={selectedConfig["ROBOO_VALIDITY_WINDOW"]}
          onChange={(e) => onTextInputChange("ROBOO_VALIDITY_WINDOW", e)}
        />
      ),
    },
    {
      variable: FIELDS.CAP_SECRET_KEY,
      name: "Captcha Secret Key ",
      value: (
        <Input
          style={{
            width: "100%",
          }}
          value={selectedConfig["CAP_SECRET_KEY"]}
          onChange={(e) => onTextInputChange("CAP_SECRET_KEY", e)}
        />
      ),
    },
    {
      variable: FIELDS.CAP_PASS_KEY,
      name: "Captcha Pass Key",
      value: (
        <Input
          style={{
            width: "100%",
          }}
          value={selectedConfig["CAP_PASS_KEY"]}
          onChange={(e) => onTextInputChange("CAP_PASS_KEY", e)}
        />
      ),
    },
    {
      variable: FIELDS.CAP_TRUNC_VALID_COOKIE_AMOUNT,
      name: "Captcha Thời gian cookie ",
      value: (
        <Input
          style={{
            width: "100%",
          }}
          value={selectedConfig["CAP_TRUNC_VALID_COOKIE_AMOUNT"]}
          onChange={(e) =>
            onTextInputChange("CAP_TRUNC_VALID_COOKIE_AMOUNT", e)
          }
        />
      ),
    },
  ];

  const dataSource = configs.map((e, i) => ({ key: i + 1, ...e }));

  //function
  const onSelectedInputChange = (key, value) => {
    if (key) {
      let configClone = Object.assign({}, selectedConfig);
      configClone[key] = value;
      dispatch(configSlice.actions.updateSelectedConfigInput(configClone));
    }
  };

  const onTextInputChange = (key, event) => {
    if (key) {
      let configClone = Object.assign({}, selectedConfig);
      configClone[key] = event.target.value;
      dispatch(configSlice.actions.updateSelectedConfigInput(configClone));
    }
  };

  const handleRecord = (actionName, _item) => {
    let item = Object.assign({}, _item);
    dispatch(
      configSlice.actions.handleConfig({
        item: item,
        actionName: actionName,
      })
    );
  };
  //side effect
  useEffect(() => {
    dispatch(configSlice.actions.getConfigs());
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
            onClick={() => handleRecord(ACTION_NAME.UPDATE, selectedConfig)}
          />
        </Flex>
      </PageBodyWrapper>
    </div>
  );
};

export default Configs;
