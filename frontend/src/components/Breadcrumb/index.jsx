import React from "react";
import { Breadcrumb, Divider, Row } from "antd";
import { Link } from "react-router-dom";

const CustomBreadcrumb = ({ items = [] }) => (
  <Row>
    <Breadcrumb style={{ margin: "auto", marginLeft: 0 }}>
      {items.map((e, i) => (
        <Breadcrumb.Item key={i + 1}>
          {i + 1 === items.length ? (
            <span style={{ fontWeight: "bold" }}>{e?.title}</span>
          ) : !e?.href ? (
            <span style={{ fontWeight: "bold", color: "gray" }}>
              {e?.title}
            </span>
          ) : (
            <Link to={e?.href || "#"}>{e?.title}</Link>
          )}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  </Row>
);

export default CustomBreadcrumb;
