import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../components";
import { Button, Divider, Typography } from "antd";
import { useEffect } from "react";
import whitelistSlice from "../../toolkits/whitelists/slice";
import TextInput from "../../components/Form/text-input";
import { ACTION_NAME } from "../../commons/constants";
export default function ModalItem() {
  const dispatch = useDispatch();

  const { modalActive, selectedWhitelist } = useSelector(
    (state) => state.whitelists
  );

  const handleModal = (_item) => {
    dispatch(whitelistSlice.actions.toggleModal(_item));
  };

  const onRecordInputChange = (key, event) => {
    console.log(key, event);
    if (key) {
      let whitelistClone = Object.assign({}, selectedWhitelist);
      whitelistClone[key] = event.target.value;
      dispatch(
        whitelistSlice.actions.updateSelectedWhitelistInput(whitelistClone)
      );
    }
  };

  const handleRecord = (actionName, _item) => {
    let item = Object.assign({}, _item);
    dispatch(
      whitelistSlice.actions.handleWhitelist({
        item: item,
        actionName: actionName,
      })
    );
  };

  return (
    <Modal
      open={modalActive}
      onCancel={() => handleModal(null)}
      onOk={() => handleRecord(ACTION_NAME.CREATE, selectedWhitelist)}
      title={"Thêm mới dữ liệu"}
      okText="Chấp nhận"
      cancelText="Từ chối"
    >
      <TextInput
        title="Địa chỉ IP cần đưa vào danh sách"
        placeholder="Nhập vào địa chỉ IP"
        onChange={onRecordInputChange}
        property={"ip"}
        value={selectedWhitelist?.ip}
      />
    </Modal>
  );
}
