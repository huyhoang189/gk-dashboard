import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../components";
import { Button, Divider, Typography } from "antd";
import { useEffect } from "react";
import emailSlice from "../../toolkits/emails/slice";
import TextInput from "../../components/Form/text-input";
import { ACTION_NAME } from "../../commons/constants";
export default function ModalItem() {
  const dispatch = useDispatch();

  const { modalActive, selectedEmail } = useSelector((state) => state.emails);

  const handleModal = (_item) => {
    dispatch(emailSlice.actions.toggleModal(_item));
  };

  const onRecordInputChange = (key, event) => {
    console.log(key, event);
    if (key) {
      let emailClone = Object.assign({}, selectedEmail);
      emailClone[key] = event.target.value;
      dispatch(emailSlice.actions.updateSelectedEmailInput(emailClone));
    }
  };

  const handleRecord = (actionName, _item) => {
    let item = Object.assign({}, _item);
    dispatch(
      emailSlice.actions.handleEmail({
        item: item,
        actionName: actionName,
      })
    );
  };

  return (
    <Modal
      open={modalActive}
      onCancel={() => handleModal(null)}
      onOk={() => handleRecord(ACTION_NAME.CREATE, selectedEmail)}
      title={"Thêm mới dữ liệu"}
      okText="Chấp nhận"
      cancelText="Từ chối"
    >
      <TextInput
        title="Địa chỉ Email cần đưa vào danh sách thông báo"
        placeholder="Nhập vào địa chỉ email"
        onChange={onRecordInputChange}
        property={"email"}
        value={selectedEmail?.email}
      />
    </Modal>
  );
}
