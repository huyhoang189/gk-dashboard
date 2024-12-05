import { useDispatch, useSelector } from "react-redux";
import {
  Breadcrumb,
  CreateButton,
  DeleteButton,
  TextAreaInput,
  UpdateButton,
} from "../../components";
import { useEffect, useState } from "react";
import { emailColumns } from "./columns";
import emailSlice from "../../toolkits/emails/slice";
import emailHeaderSlice from "../../toolkits/email-headers/slice";
import { Col, Flex, Input, Row, Space, Table } from "antd";
import EmailModal from "./modal";
import { SyncOutlined } from "@ant-design/icons";
import { ACTION_NAME } from "../../commons/constants";
import { PageBodyWrapper } from "../../assets/styles/page-body-style";
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
      title: "Danh sách Email",
    },
  ],
};

const Emails = () => {
  const dispatch = useDispatch();
  const { emails, isLoading } = useSelector((state) => state.emails);
  const { selectedEmailHeader } = useSelector((state) => state.emailHeaders);
  const [keyword, setKeyword] = useState("");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const columns = [
    ...emailColumns,
    {
      title: "Công cụ",
      key: "tool",
      align: "center",
      width: 140,
      render: (text, row) => (
        <Space
          direction="horizontal"
          style={{ width: "100%", justifyContent: "center" }}
        >
          <DeleteButton
            onConfirm={() => {
              dispatch(
                emailSlice.actions.handleEmail({
                  item: row,
                  actionName: "DELETE",
                })
              );
            }}
          />
        </Space>
      ),
    },
  ];
  let dataSource = [];
  dataSource = emails.map((e, i) => ({
    key: i + 1,
    ...e,
  }));

  //function
  const handleModal = (_item) => {
    dispatch(emailSlice.actions.toggleModal(_item));
  };

  const handlePaginationChange = (current, pageSize) => {
    setPagination({
      current,
      pageSize,
    });
  };

  const onFilterInputChange = (key, event) => {
    setKeyword(event.target.value);
  };

  const onRecordInputChange = (key, event) => {
    if (key) {
      let emailHeader = Object.assign({}, selectedEmailHeader);
      emailHeader[key] = event.target.value;
      dispatch(
        emailHeaderSlice.actions.updateSelectedEmailHeaderInput(emailHeader)
      );
    }
  };

  const handleRecord = (actionName, _item) => {
    // let item = Object.assign({}, _item);
    dispatch(
      emailHeaderSlice.actions.handleEmailHeader({
        item: _item,
        actionName: actionName,
      })
    );
  };

  // effect for component
  useEffect(() => {
    dispatch(emailSlice.actions.getEmails());
    dispatch(emailHeaderSlice.actions.getEmailHeaders());
  }, [dispatch]);
  return (
    <div>
      <Breadcrumb items={pageHeader.breadcrumb} />
      <PageBodyWrapper>
        <Row gutter={16}>
          <Col span={12}>
            <Flex
              style={{ width: "100%", marginBottom: 10 }}
              justify={"space-between"}
              align="center"
            >
              <Input
                style={{ width: 300 }}
                placeholder="Tìm kiếm"
                onChange={onFilterInputChange}
              />

              <Space>
                <CreateButton onClick={() => handleModal(null)} />
              </Space>
            </Flex>
            <Table
              columns={columns}
              dataSource={dataSource}
              bordered
              loading={isLoading}
              pagination={{
                ...pagination,
                total: dataSource.length,
                onChange: handlePaginationChange,
              }}
            />
            <EmailModal />
          </Col>
          <Col span={12}>
            <Flex
              style={{ width: "100%", marginBottom: 10 }}
              justify="flex-end"
              align="center"
            >
              <Space>
                <CreateButton
                  onClick={() =>
                    handleRecord(ACTION_NAME.UPDATE, selectedEmailHeader)
                  }
                  btnTxt="Cập nhật Header"
                  icon={<SyncOutlined />}
                />
              </Space>
            </Flex>
            <TextAreaInput
              title="Header Email"
              placeholder="Header email"
              onChange={onRecordInputChange}
              property={"message"}
              value={selectedEmailHeader?.message}
              rows={4}
            />
          </Col>
        </Row>
      </PageBodyWrapper>
    </div>
  );
};

export default Emails;
