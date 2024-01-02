import { Layout } from "antd";
import styled from "styled-components";
export const LayoutWrapper = styled(Layout)`
  .ant-typography {
    margin-top: 0;
    margin-bottom: 0;
  }

  .ant-typography {
    margin-top: 0;
    margin-bottom: 0;
  }

  .ant-table-cell {
    padding: 6px 16px !important;
  }

  .ant-table-thead > tr > th {
    background: #f9f9f9;
    color: "#0069cc";
  }

  .ant-menu-sub {
    background-color: #00284d !important;
  }

  .ant-menu-title-content {
    text-transform: uppercase;
    font-weight: bold;
  }

  .green-button {
    border-color: #52c41a;
    color: #52c41a;
  }

  .violet-button {
    border-color: #bf8bff;
    color: #bf8bff;
  }

  .yellow-button {
    border-color: #ffc905;
    color: #ffc905;
  }

  .red-button {
    border-color: #ff5252;
    color: #ff5252;
  }
  .ant-list-item {
    padding: 6px 0;
  }

  .editable-cell {
    position: relative;
  }

  .editable-cell-value-wrap {
    padding: 5px 12px;
    cursor: pointer;
  }

  .editable-row:hover .editable-cell-value-wrap {
    padding: 4px 11px;
    border: 1px solid #d9d9d9;
  }

  .ant-menu-title-content {
    text-transform: capitalize;
    font-weight: bold;
    font-size: 11px;
  }
`;
