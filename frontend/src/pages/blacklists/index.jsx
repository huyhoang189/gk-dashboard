import { useDispatch, useSelector } from "react-redux";
import { Breadcrumb, CreateButton, DeleteButton } from "../../components";
import { useEffect, useState } from "react";
import { blacklistColumns } from "./columns";
import blacklistSlice from "../../toolkits/blacklists/slice";
import { Flex, Input, Space, Table } from "antd";
import BlacklistModal from "./modal";
import { PageBodyWrapper } from "../../assets/styles/page-body-style";
import { useTranslation } from "react-i18next";

const pageHeader = (t) => {
  return {
    breadcrumb: [
      {
        title: t("home"),
      },
      {
        title: t("configs"),
      },
      {
        title: t("blacklists"),
      },
    ],
  };
};

const Backlists = () => {
  const dispatch = useDispatch();
  const { blacklists, isLoading } = useSelector((state) => state.blacklists);
  const [keyword, setKeyword] = useState("");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const { t } = useTranslation();

  const columns = [
    ...blacklistColumns,
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
                blacklistSlice.actions.handleBlacklist({
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
  dataSource = blacklists.map((e, i) => ({
    key: i + 1,
    ...e,
  }));

  //function
  const handleModal = (_item) => {
    dispatch(blacklistSlice.actions.toggleModal(_item));
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
    dispatch(blacklistSlice.actions.getBlacklists());
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
        <BlacklistModal />
      </PageBodyWrapper>
    </div>
  );
};

export default Backlists;
