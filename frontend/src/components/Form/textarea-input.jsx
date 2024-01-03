import { Input, Space, Typography } from "antd";
import { convertDateToString } from "../../utils/common";

const TextAreaInput = ({
  title,
  property,
  value,
  onChange,
  isNull = true,
  placeholder = "Enter the text!",
  disable = false,
  rows = 2,
}) => {
  return (
    <Space
      direction="vertical"
      style={{ width: "100%", marginTop: 5, marginBottom: 5 }}
    >
      <Typography.Text style={{ fontWeight: "bold" }}>
        {title}
        {isNull === false ? <span style={{ color: "red" }}>(*)</span> : ""}
      </Typography.Text>
      <Input.TextArea
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(property, e)}
        disabled={disable}
        rows={rows}
      />
    </Space>
  );
};

export default TextAreaInput;
