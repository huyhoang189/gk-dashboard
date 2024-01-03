import { useDispatch, useSelector } from "react-redux";
import { Modal, SelectInput } from "../../components";
import { Button, Divider, Typography, Select } from "antd";
import { useEffect } from "react";
import dnsSlice from "../../toolkits/dnss/slice";
import TextInput from "../../components/Form/text-input";
import { ACTION_NAME } from "../../commons/constants";
export default function ModalItem() {
  const dispatch = useDispatch();

  const { modalActive, selectedDns } = useSelector((state) => state.dnss);

  const handleModal = (_item) => {
    dispatch(dnsSlice.actions.toggleModal(_item));
  };

  const onRecordInputChange = (key, event) => {
    // console.log(key, event);
    if (key) {
      let dnsClone = Object.assign({}, selectedDns);
      dnsClone[key] = event.target.value;
      dispatch(dnsSlice.actions.updateSelectedDnsInput(dnsClone));
    }
  };

  const onSelectedInputChange = (key, event) => {
    // console.log(key, event);
    if (key) {
      let dnsClone = Object.assign({}, selectedDns);
      dnsClone[key] = event;
      dispatch(dnsSlice.actions.updateSelectedDnsInput(dnsClone));
    }
  };

  const handleRecord = (actionName, _item) => {
    let item = Object.assign({}, _item);
    dispatch(
      dnsSlice.actions.handleDns({
        item: item,
        actionName: actionName,
      })
    );
  };

  return (
    <Modal
      open={modalActive}
      onCancel={() => handleModal(null)}
      onOk={() => handleRecord(ACTION_NAME.CREATE, selectedDns)}
      title={"Thêm mới dữ liệu"}
      okText="Chấp nhận"
      cancelText="Từ chối"
    >
      <TextInput
        title="Địa chỉ IP cần đưa vào danh sách"
        placeholder="Nhập vào địa chỉ IP"
        onChange={onRecordInputChange}
        property={"ip"}
        value={selectedDns?.ip}
      />
      <SelectInput
        title="Trạng thái sử dụng"
        onChange={onSelectedInputChange}
        property={"active"}
        value={selectedDns?.active}
        options={[
          {
            value: 1,
            label: "Đang sử dụng",
          },
          {
            value: 0,
            label: "Không sử dụng",
          },
        ]}
      />

      <SelectInput
        title="Trạng thái sẵn sàng"
        onChange={onSelectedInputChange}
        property={"status"}
        value={selectedDns?.status}
        options={[
          {
            value: 1,
            label: "Sẵn sàng",
          },
          {
            value: 0,
            label: "Không sẵn sàng",
          },
        ]}
      />

      {/* <Select
        style={{
          width: "100%",
        }}
        value={selectedDns?.status}
        onChange={(e) => onSelectedInputChange("status", e)}
        options={[
          {
            value: 1,
            label: "Bật",
          },
          {
            value: 0,
            label: "Tắt",
          },
        ]}
      /> */}
    </Modal>
  );
}
