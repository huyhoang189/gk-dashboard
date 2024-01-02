import { useDispatch, useSelector } from "react-redux";
import {
  Breadcrumb,
  CreateButton,
  DeleteButton,
  UpdateButton,
} from "../../components";
import { useEffect, useState } from "react";
import { roleColumns } from "./columns";
import roleSlice from "../../toolkits/roles/slice";
import { Flex, Input, Space, Table } from "antd";
import RoleModal from "./modal";
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
      title: "Danh sách nhóm quyền",
    },
  ],
};

const Roles = () => {
  const dispatch = useDispatch();
  const { roles, isLoading } = useSelector((state) => state.roles);
  const [keyword, setKeyword] = useState("");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const columns = [
    ...roleColumns,
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
                roleSlice.actions.handleRole({
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
  dataSource = roles.map((e, i) => ({
    key: i + 1,
    ...e,
  }));

  //function
  const handleModal = (_item) => {
    dispatch(roleSlice.actions.toggleModal(_item));
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
    dispatch(roleSlice.actions.getRoles());
  }, [dispatch]);
  return (
    <div>
      <Breadcrumb items={pageHeader.breadcrumb} />
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
      />
      <RoleModal />
    </div>
  );
};

export default Roles;
