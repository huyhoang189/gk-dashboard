import {
  DeleteOutlined,
  EditOutlined,
  InfoCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Popconfirm, Tooltip } from "antd";

export const CreateButton = ({
  style = { boxShadow: "0 0px 0 rgba(2, 46, 64, 0.32)" },
  onClick,
  btnTxt = "Thêm mới",
  icon = <PlusOutlined />,
  disabled = false,
}) => {
  return (
    <Button
      type="primary"
      style={style}
      onClick={onClick}
      icon={icon}
      disabled={disabled}
    >
      {btnTxt}
    </Button>
  );
};

export const DetailButton = ({
  onClick,
  icon = <InfoCircleOutlined />,
  title = "Chi tiết dữ liệu",
  name = "",
  disabled = false,
}) => {
  return (
    <Tooltip title={title}>
      <Button icon={icon} onClick={onClick} disabled={disabled}>
        {name}
      </Button>
    </Tooltip>
  );
};

export const UpdateButton = ({
  onClick,
  icon = <EditOutlined />,
  title = "Cập nhật dữ liệu",
  name = "",
  className = "",
  disabled = false,
}) => {
  return (
    <Tooltip title={title}>
      <Button
        icon={icon}
        onClick={onClick}
        className={className}
        disabled={disabled}
      >
        {name}
      </Button>
    </Tooltip>
  );
};

export const DeleteButton = ({
  onConfirm,
  icon = <DeleteOutlined />,
  type = "default",
  tooltip = "Xoá dữ liệu",
  disabled = false,
}) => {
  return (
    <Popconfirm
      title="Bạn có muốn xoá bản ghi không ?"
      onConfirm={onConfirm}
      okText="Đồng ý"
      cancelText="Không đồng ý"
      placement="leftTop"
    >
      <Tooltip title={tooltip}>
        <Button danger icon={icon} type={type} disabled={disabled} />
      </Tooltip>
    </Popconfirm>
  );
};
