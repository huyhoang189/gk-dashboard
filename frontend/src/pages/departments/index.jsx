import { useDispatch, useSelector } from "react-redux";
import {
  Breadcrumb,
  CreateButton,
  DeleteButton,
  UpdateButton,
} from "../../components";
import { useEffect, useState } from "react";
import { departmentColumns } from "./columns";
import departmentSlice from "../../toolkits/departments/slice";
import { Flex, Input, Space, Table } from "antd";
import DepartmentModal from "./modal";
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
        title: t("departments"),
      },
    ],
  };
};

const Departments = () => {
  const dispatch = useDispatch();
  const { departments, isLoading } = useSelector((state) => state.departments);
  const [keyword, setKeyword] = useState("");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const { t } = useTranslation();

  const columns = [
    ...departmentColumns,
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
                departmentSlice.actions.handleDepartment({
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
  dataSource = departments.map((e, i) => ({
    key: i + 1,
    ...e,
  }));

  //function
  const handleModal = (_item) => {
    dispatch(departmentSlice.actions.toggleModal(_item));
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
    dispatch(departmentSlice.actions.getDepartments());
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
          loading={isLoading}
          pagination={{
            ...pagination,
            total: dataSource.length,
            onChange: handlePaginationChange,
          }}
        />
        <DepartmentModal />
      </PageBodyWrapper>
    </div>
  );
};

export default Departments;
