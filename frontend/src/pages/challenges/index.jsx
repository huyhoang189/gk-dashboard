import { useDispatch, useSelector } from "react-redux";
import { Breadcrumb, CreateButton, DeleteButton } from "../../components";
import { useEffect, useState } from "react";
import { challengeColumns } from "./columns";
import challengeSlice from "../../toolkits/challenges/slice";
import { Flex, Input, Space, Table } from "antd";
import { PageBodyWrapper } from "../../assets/styles/page-body-style";
import { useTranslation } from "react-i18next";

const pageHeader = (t) => {
  return {
    breadcrumb: [
      {
        title: t("home"),
      },
      {
        title: t("moniters"),
      },
      {
        title: t("challenge_logs"),
      },
    ],
  };
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
  const { t } = useTranslation();

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

export default Challenges;
