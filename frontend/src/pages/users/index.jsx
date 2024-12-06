import { useDispatch, useSelector } from "react-redux";
import {
  Breadcrumb,
  CreateButton,
  DeleteButton,
  UpdateButton,
} from "../../components";
import { useEffect, useState } from "react";
import { userColumns } from "./columns";
import userSlice from "../../toolkits/users/slice";
import { Flex, Input, Space, Table } from "antd";
import UserModal from "./modal";
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
        title: t("users"),
      },
    ],
  };
};

const Users = () => {
  const dispatch = useDispatch();
  const { users, isLoading } = useSelector((state) => state.users);
  const [keyword, setKeyword] = useState("");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const { t } = useTranslation();

  const columns = [
    ...userColumns,
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
          <UpdateButton onClick={() => handleModal(row)} />
          <DeleteButton
            onConfirm={() => {
              dispatch(
                userSlice.actions.handleUser({
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
  dataSource = users.map((e, i) => ({
    key: i + 1,
    ...e,
  }));

  //function
  const handleModal = (_item) => {
    dispatch(userSlice.actions.toggleModal(_item));
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

  // effect for component
  useEffect(() => {
    dispatch(userSlice.actions.getUsers());
  }, [dispatch]);
  return (
    <div>
      <Breadcrumb items={pageHeader(t).breadcrumb} />
      <PageBodyWrapper>
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
          pagination={{
            ...pagination,
            total: dataSource.length,
            onChange: handlePaginationChange,
          }}
          loading={isLoading}
        />
        <UserModal />
      </PageBodyWrapper>
    </div>
  );
};

export default Users;
