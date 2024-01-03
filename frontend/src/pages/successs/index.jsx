import { useDispatch, useSelector } from "react-redux";
import { Breadcrumb, CreateButton, DeleteButton } from "../../components";
import { useEffect, useState } from "react";
import { successColumns } from "./columns";
import successSlice from "../../toolkits/successs/slice";
import { Flex, Input, Space, Table } from "antd";

const pageHeader = {
  title: "Danh sách ip",
  breadcrumb: [
    {
      title: "Trang chủ",
    },
    {
      title: "Giám sát truy vấn",
    },
    {
      title: "Danh sách Success Logs",
    },
  ],
};

const Successs = () => {
  const dispatch = useDispatch();
  const {
    successs,
    isLoading,
    totalItem,
    currentPage,
    pageSize,
    totalPage,
    success,
  } = useSelector((state) => state.successs);
  const [keyword, setKeyword] = useState("");
  const [properties, setProperties] = useState(Object.keys(success));

  const columns = [...successColumns];
  let dataSource = [];
  dataSource = successs.map((e, i) => ({
    key: 1 + i + pageSize * (currentPage - 1),
    ...e,
  }));

  const handlePaginationChange = (current, pageSize) => {
    dispatch(
      successSlice.actions.getSuccesss({
        keyword,
        pageSize: pageSize,
        pageNumber: current,
        properties,
      })
    );
  };

  const onFilterInputChange = (event) => {
    setKeyword(event.target.value);
  };

  // effect for component
  useEffect(() => {
    dispatch(
      successSlice.actions.getSuccesss({
        keyword,
        pageSize: pageSize,
        pageNumber: 1,
        properties,
      })
    );
  }, [dispatch, keyword]);
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

        <Space></Space>
      </Flex>
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={isLoading}
        bordered
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: totalItem,
          onChange: handlePaginationChange,
        }}
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>{record.raw}</p>
          ),
          rowExpandable: (record) => record.name !== "Not Expandable",
        }}
      />
    </div>
  );
};

export default Successs;
