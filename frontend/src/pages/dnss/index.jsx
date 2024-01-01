import { useDispatch, useSelector } from "react-redux";
import { Breadcrumb, CreateButton, DeleteButton } from "../../components";
import { useEffect, useState } from "react";
import { dnsColumns } from "./columns";
import dnsSlice from "../../toolkits/dnss/slice";
import { Flex, Input, Space, Table } from "antd";
import DnsModal from "./modal";
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
      title: "Danh sách DNS",
    },
  ],
};

const Dnss = () => {
  const dispatch = useDispatch();
  const { dnss, isLoading } = useSelector((state) => state.dnss);
  const [keyword, setKeyword] = useState("");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const columns = [
    ...dnsColumns,
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
                dnsSlice.actions.handleDns({
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
  dataSource = dnss.map((e, i) => ({
    key: i + 1,
    ...e,
  }));

  //function
  const handleModal = (_item) => {
    dispatch(dnsSlice.actions.toggleModal(_item));
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
    dispatch(dnsSlice.actions.getDnss());
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
      <DnsModal />
    </div>
  );
};

export default Dnss;
