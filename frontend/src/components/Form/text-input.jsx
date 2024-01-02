import { Input, Space, Typography } from "antd";
import { convertDateToString } from "../../utils/common";
import { DATE_FORMAT } from "../../commons/constants";

const TextInput = ({
  title,
  property,
  value,
  onChange,
  isNull = true,
  placeholder = "Enter the text!",
  disable = false,
  type = "text",
  status = "",
  isPassword = false,
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
      {isPassword ? (
        <Input.Password
          placeholder={placeholder}
          value={
            type === "date"
              ? convertDateToString(value, DATE_FORMAT.YYYYMMDD)
              : value
          }
          onChange={(e) => onChange(property, e)}
          disabled={disable}
          type={type}
          status={status}
        />
      ) : (
        <Input
          placeholder={placeholder}
          value={
            type === "date"
              ? convertDateToString(value, DATE_FORMAT.YYYYMMDD)
              : value
          }
          onChange={(e) => onChange(property, e)}
          disabled={disable}
          type={type}
          status={status}
        />
      )}
    </Space>
  );
};

export default TextInput;
