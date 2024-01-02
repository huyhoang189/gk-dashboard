import { Space, Typography, Select } from "antd";

const SelectInput = ({
  title,
  property,
  value,
  onChange,
  disable = false,
  options = [],
}) => {
  return (
    <Space direction="vertical" style={{ width: "100%", marginTop: 5 }}>
      <Typography.Text style={{ fontWeight: "bold" }}>{title}</Typography.Text>
      <Select
        value={value}
        onChange={(e) => onChange(property, e)}
        style={{ width: "100%" }}
        disabled={disable}
        options={options}
        filterOption={(input, option) =>
          (option?.label.toUpperCase() ?? "").includes(input.toUpperCase())
        }
        showSearch
      />
    </Space>
  );
};

export default SelectInput;
