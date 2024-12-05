import { useDispatch, useSelector } from "react-redux";
import { Breadcrumb, CreateButton, DeleteButton } from "../../components";
import { useEffect, useState } from "react";
import { whitelistColumns } from "./columns";
import whitelistSlice from "../../toolkits/whitelists/slice";
import { Flex, Input, Space, Table } from "antd";
import WhitelistModal from "./modal";
import { PageBodyWrapper } from "../../assets/styles/page-body-style";
const pageHeader = {
  title: "Danh sách ip",
  breadcrumb: [
    {
      title: "Trang chủ",
    },
    {
      title: "Cấu hình",
    },
    {
      title: "Danh sách đen (Whitelist IP)",
    },
  ],
};

const Whitelists = () => {
  const dispatch = useDispatch();
  const { whitelists, isLoading } = useSelector((state) => state.whitelists);
  const [keyword, setKeyword] = useState("");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const columns = [
    ...whitelistColumns,
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
                whitelistSlice.actions.handleWhitelist({
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
  dataSource = whitelists.map((e, i) => ({
    key: i + 1,
    ...e,
  }));

  //function
  const handleModal = (_item) => {
    dispatch(whitelistSlice.actions.toggleModal(_item));
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
    dispatch(whitelistSlice.actions.getWhitelists());
  }, [dispatch]);
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
        <WhitelistModal />
      </PageBodyWrapper>
    </div>
  );
};

export default Whitelists;
