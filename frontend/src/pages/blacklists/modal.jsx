import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../components";
import { Button, Divider, Typography } from "antd";
import { useEffect } from "react";
import blacklistSlice from "../../toolkits/blacklists/slice";
import TextInput from "../../components/Form/text-input";
import { ACTION_NAME } from "../../commons/constants";
export default function ModalItem() {
  const dispatch = useDispatch();

  const { modalActive, selectedBlacklist } = useSelector(
    (state) => state.blacklists
  );

  const handleModal = (_item) => {
    dispatch(blacklistSlice.actions.toggleModal(_item));
  };

  const onRecordInputChange = (key, event) => {
    console.log(key, event);
    if (key) {
      let blacklistClone = Object.assign({}, selectedBlacklist);
      blacklistClone[key] = event.target.value;
      dispatch(
        blacklistSlice.actions.updateSelectedBlacklistInput(blacklistClone)
      );
    }
  };

  const handleRecord = (actionName, _item) => {
    let item = Object.assign({}, _item);
    dispatch(
      blacklistSlice.actions.handleBlacklist({
        item: item,
        actionName: actionName,
      })
    );
  };

  return (
    <Modal
      open={modalActive}
      onCancel={() => handleModal(null)}
      onOk={() => handleRecord(ACTION_NAME.CREATE, selectedBlacklist)}
      title={"Thêm mới dữ liệu"}
      okText="Chấp nhận"
      cancelText="Từ chối"
    >
      <TextInput
        title="Địa chỉ IP cần đưa vào danh sách"
        placeholder="Nhập vào địa chỉ IP"
        onChange={onRecordInputChange}
        property={"ip"}
        value={selectedBlacklist?.ip}
      />
    </Modal>
  );
}
