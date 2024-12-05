import { useDispatch, useSelector } from "react-redux";
import { Breadcrumb, CreateButton, DeleteButton } from "../../components";
import { useEffect, useState } from "react";
import { listenColumns } from "./columns";
import listenSlice from "../../toolkits/listens/slice";
import { Flex, Input, Space, Table } from "antd";
import { PageBodyWrapper } from "../../assets/styles/page-body-style";

const pageHeader = {
  title: "Danh sách ip",
  breadcrumb: [
    {
      title: "Trang chủ",
    },
    {
      title: "Quản trị hệ thống",
    },
    {
      title: "Theo dõi hành vi",
    },
  ],
};

const Listens = () => {
  const dispatch = useDispatch();
  const { listens, isLoading, totalItem, currentPage, pageSize, listen } =
    useSelector((state) => state.listens);
  const [keyword, setKeyword] = useState("");

  const columns = [
    ...listenColumns,
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
                listenSlice.actions.handleListen({
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
  dataSource = listens.map((e, i) => ({
    key: 1 + i + pageSize * (currentPage - 1),
    ...e,
  }));

  const handlePaginationChange = (current, pageSize) => {
    dispatch(
      listenSlice.actions.getListens({
        keyword,
        pageSize: pageSize,
        pageNumber: current,
      })
    );
  };

  const onFilterInputChange = (event) => {
    setKeyword(event.target.value);
  };

  // effect for component
  useEffect(() => {
    dispatch(
      listenSlice.actions.getListens({
        keyword,
        pageSize: pageSize,
        pageNumber: 1,
      })
    );
  }, [dispatch, keyword]);
  return (
    <div>
      <Breadcrumb items={pageHeader.breadcrumb} />
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

          <Space></Space>
        </Flex>
        <Table
          columns={columns}
          dataSource={dataSource}
          bordered
          loading={isLoading}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: totalItem,
            onChange: handlePaginationChange,
          }}
          // expandable={{
          //   expandedRowRender: (record) => (
          //     <p style={{ margin: 0 }}>{record.raw}</p>
          //   ),
          //   rowExpandable: (record) => record.name !== "Not Expandable",
          // }}
        />
      </PageBodyWrapper>
    </div>
  );
};

export default Listens;
