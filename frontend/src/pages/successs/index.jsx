import { useDispatch, useSelector } from "react-redux";
import { Breadcrumb, CreateButton, DeleteButton } from "../../components";
import { useEffect, useState } from "react";
import { successColumns } from "./columns";
import successSlice from "../../toolkits/successs/slice";
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
        title: t("success_logs"),
      },
    ],
  };
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
  const { t } = useTranslation();

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
      </PageBodyWrapper>
    </div>
  );
};

export default Successs;
