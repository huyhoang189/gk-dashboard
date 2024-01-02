import { useDispatch, useSelector } from "react-redux";
import { Modal, SelectInput } from "../../components";
import { Button, Divider, Typography } from "antd";
import { useEffect } from "react";
import roleSlice from "../../toolkits/roles/slice";
import TextInput from "../../components/Form/text-input";
import { ACTION_NAME } from "../../commons/constants";
export default function ModalItem() {
  const dispatch = useDispatch();

  const { modalActive, selectedRole } = useSelector((state) => state.roles);

  const handleModal = (_item) => {
    dispatch(roleSlice.actions.toggleModal(_item));
  };

  const onRecordInputChange = (key, event) => {
    if (key) {
      let roleClone = Object.assign({}, selectedRole);
      roleClone[key] = event.target.value;
      dispatch(roleSlice.actions.updateSelectedRoleInput(roleClone));
    }
  };

  const onRecordSelectedChange = (key, event) => {
    if (key) {
      let roleClone = Object.assign({}, selectedRole);
      roleClone[key] = event;
      dispatch(roleSlice.actions.updateSelectedRoleInput(roleClone));
    }
  };

  const handleRecord = (actionName, _item) => {
    let item = Object.assign({}, _item);
    dispatch(
      roleSlice.actions.handleRole({
        item: item,
        actionName: actionName,
      })
    );
  };

  return (
    <Modal
      open={modalActive}
      onCancel={() => handleModal(null)}
      onOk={
        selectedRole?.role_id
          ? () => handleRecord(ACTION_NAME.UPDATE, selectedRole)
          : () => handleRecord(ACTION_NAME.CREATE, selectedRole)
      }
      title={selectedRole?.role_id ? "Cập nhật dữ liệu" : "Thêm mới dữ liệu"}
      okText="Chấp nhận"
      cancelText="Từ chối"
    >
      <TextInput
        title="Tên nhóm quền"
        placeholder="Nhập vào tên nhóm quyền"
        onChange={onRecordInputChange}
        property={"name"}
        value={selectedRole?.name}
      />

      <SelectInput
        title="Quyền"
        // placeholder="Nhập vào tên nhóm quyền"
        onChange={onRecordSelectedChange}
        property={"permission"}
        value={selectedRole?.permission}
        options={[
          {
            value: "ADMIN",
            label: "Quản trị hệ thống",
          },
          {
            value: "MOD",
            label: "Trực giám sát",
          },
        ]}
      />
    </Modal>
  );
}
