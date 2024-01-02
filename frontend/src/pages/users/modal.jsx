import { useDispatch, useSelector } from "react-redux";
import { Modal, SelectInput } from "../../components";
import { Button, Divider, Typography } from "antd";
import { useEffect } from "react";
import userSlice from "../../toolkits/users/slice";
import roleSlice from "../../toolkits/roles/slice";
import TextInput from "../../components/Form/text-input";
import { ACTION_NAME } from "../../commons/constants";
export default function ModalItem() {
  const dispatch = useDispatch();

  const { modalActive, selectedUser } = useSelector((state) => state.users);
  const { roles } = useSelector((state) => state.roles);

  const handleModal = (_item) => {
    dispatch(userSlice.actions.toggleModal(_item));
  };

  const onRecordInputChange = (key, event) => {
    if (key) {
      let userClone = Object.assign({}, selectedUser);
      userClone[key] = event.target.value;
      dispatch(userSlice.actions.updateSelectedUserInput(userClone));
    }
  };

  const onRecordSelectedChange = (key, event) => {
    if (key) {
      let userClone = Object.assign({}, selectedUser);
      userClone[key] = event;
      dispatch(userSlice.actions.updateSelectedUserInput(userClone));
    }
  };

  const handleRecord = (actionName, _item) => {
    let item = Object.assign({}, _item);
    dispatch(
      userSlice.actions.handleUser({
        item: item,
        actionName: actionName,
      })
    );
  };

  useEffect(() => {
    if (modalActive) {
      dispatch(roleSlice.actions.getRoles());
    }
  }, [modalActive]);

  return (
    <Modal
      open={modalActive}
      onCancel={() => handleModal(null)}
      onOk={
        selectedUser?.user_id
          ? () => handleRecord(ACTION_NAME.UPDATE, selectedUser)
          : () => handleRecord(ACTION_NAME.CREATE, selectedUser)
      }
      title={selectedUser?.user_id ? "Cập nhật dữ liệu" : "Thêm mới dữ liệu"}
      okText="Chấp nhận"
      cancelText="Từ chối"
    >
      <TextInput
        title="Tên tài khoản"
        placeholder="Nhập vào tên tài khoản"
        onChange={onRecordInputChange}
        property={"username"}
        value={selectedUser?.username}
      />

      <TextInput
        title="Mật khẩu"
        placeholder="Nhập vào nhập khẩu"
        onChange={onRecordInputChange}
        property={"password"}
        value={selectedUser?.password}
        isPassword={true}
      />

      <SelectInput
        title="Quyền"
        // placeholder="Nhập vào tên nhóm quyền"
        onChange={onRecordSelectedChange}
        property={"role_id"}
        value={selectedUser?.role_id}
        options={roles.map((e) => ({
          value: e.role_id,
          label: e.name,
        }))}
      />
    </Modal>
  );
}
