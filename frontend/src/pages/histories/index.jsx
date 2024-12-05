import { useDispatch, useSelector } from "react-redux";
import { Breadcrumb, CreateButton, DeleteButton } from "../../components";
import { useEffect, useState } from "react";
import { historyColumns } from "./columns";
import historySlice from "../../toolkits/histories/slice";
import { Flex, Input, Space, Table } from "antd";
import { PageBodyWrapper } from "../../assets/styles/page-body-style";

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
      title: "Danh sách Error Logs",
    },
  ],
};

const Histories = () => {
  const dispatch = useDispatch();
  const {
    histories,
    isLoading,
    totalItem,
    currentPage,
    pageSize,
    totalPage,
    history,
  } = useSelector((state) => state.histories);
  // console.log(histories);
  const [keyword, setKeyword] = useState("");
  const [properties, setProperties] = useState(Object.keys(history));

  const columns = [...historyColumns];
  let dataSource = [];
  dataSource = histories.map((e, i) => ({
    key: 1 + i + pageSize * (currentPage - 1),
    ...e,
  }));

  const handlePaginationChange = (current, pageSize) => {
    dispatch(
      historySlice.actions.getHistories({
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
      historySlice.actions.getHistories({
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
          expandable={{
            expandedRowRender: (record) => (
              <p style={{ margin: 0 }}>{record.raw}</p>
            ),
            rowExpandable: (record) => record.name !== "Not Expandable",
          }}
        />
      </PageBodyWrapper>
    </div>
  );
};

export default Histories;
