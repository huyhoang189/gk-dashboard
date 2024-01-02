import { useDispatch, useSelector } from "react-redux";
import { Modal, SelectInput } from "../../components";
import { Button, Divider, Typography } from "antd";
import { useEffect } from "react";
import departmentSlice from "../../toolkits/departments/slice";
import TextInput from "../../components/Form/text-input";
import { ACTION_NAME } from "../../commons/constants";
export default function ModalItem() {
  const dispatch = useDispatch();

  const { modalActive, selectedDepartment, departments } = useSelector(
    (state) => state.departments
  );

  const handleModal = (_item) => {
    dispatch(departmentSlice.actions.toggleModal(_item));
  };

  const onRecordInputChange = (key, event) => {
    if (key) {
      let departmentClone = Object.assign({}, selectedDepartment);
      departmentClone[key] = event.target.value;
      dispatch(
        departmentSlice.actions.updateSelectedDepartmentInput(departmentClone)
      );
    }
  };

  const onRecordSelectedChange = (key, event) => {
    if (key) {
      let departmentClone = Object.assign({}, selectedDepartment);
      departmentClone[key] = event;
      dispatch(
        departmentSlice.actions.updateSelectedDepartmentInput(departmentClone)
      );
    }
  };

  const handleRecord = (actionName, _item) => {
    let item = Object.assign({}, _item);
    dispatch(
      departmentSlice.actions.handleDepartment({
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
        selectedDepartment?.id
          ? () => handleRecord(ACTION_NAME.UPDATE, selectedDepartment)
          : () => handleRecord(ACTION_NAME.CREATE, selectedDepartment)
      }
      title={selectedDepartment?.id ? "Cập nhật dữ liệu" : "Thêm mới dữ liệu"}
      okText="Chấp nhận"
      cancelText="Từ chối"
    >
      <TextInput
        title="Tên đơn vị"
        placeholder="Nhập vào tên đơn vị"
        onChange={onRecordInputChange}
        property={"name"}
        value={selectedDepartment?.name}
      />

      <TextInput
        title="Mã đơn vị"
        placeholder="Nhập vào mã đơn vị"
        onChange={onRecordInputChange}
        property={"identification"}
        value={selectedDepartment?.identification}
      />

      <TextInput
        title="Mô tả"
        placeholder="Nhập vào mô tả"
        onChange={onRecordInputChange}
        property={"description"}
        value={selectedDepartment?.description}
      />

      <SelectInput
        title="Đơn vị cha"
        // placeholder="Nhập vào tên nhóm quyền"
        onChange={onRecordSelectedChange}
        property={"parent_id"}
        value={selectedDepartment?.parent_id}
        options={departments.map((e) => ({ value: e?.id, label: e?.name }))}
      />
    </Modal>
  );
}
