import { useDispatch, useSelector } from "react-redux";
import { Breadcrumb, CreateButton, DeleteButton } from "../../components";
import { useEffect, useState } from "react";
import { challengeColumns } from "./columns";
import challengeSlice from "../../toolkits/challenges/slice";
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
      title: "Danh sách Challenge Logs",
    },
  ],
};

const Challenges = () => {
  const dispatch = useDispatch();
  const {
    challenges,
    isLoading,
    totalItem,
    currentPage,
    pageSize,
    totalPage,
    challenge,
  } = useSelector((state) => state.challenges);
  const [keyword, setKeyword] = useState("");
  const [properties, setProperties] = useState(Object.keys(challenge));

  const columns = [...challengeColumns];
  let dataSource = [];
  dataSource = challenges.map((e, i) => ({
    key: 1 + i + pageSize * (currentPage - 1),
    ...e,
  }));

  const handlePaginationChange = (current, pageSize) => {
    dispatch(
      challengeSlice.actions.getChallenges({
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
      challengeSlice.actions.getChallenges({
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

export default Challenges;
