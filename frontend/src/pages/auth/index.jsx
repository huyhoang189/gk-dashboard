import { useEffect, useState } from "react";
import {
  Layout,
  Form,
  Input,
  Row,
  Col,
  Button,
  Image,
  Space,
  Checkbox,
  Typography,
  Card,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import bgLogin from "../../assets/img/3043140.jpg";
import Logo from "../../assets/img/logo.png";
import authSlice from "../../toolkits/auth/slice";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const { errorMessage } = useSelector((state) => state.auths);

  const onSubmit = () => {
    dispatch(
      authSlice.actions.login({
        username: username,
        password: password,
      })
    );
  };

  const handleKeyPress = (e) => {
    // Check if the "Enter" key was pressed
    if (e.key === "Enter") {
      onSubmit(); // Trigger form submission
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#0DB8DE",
        height: "100vh",
        backgroundImage: `url(${bgLogin})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Card
        style={{
          width: 400,
          height: 500,
          textAlign: "center",
          background: "rgba(31, 45, 105,0.7)",
          border: 0,
          borderRadius: "15px",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) ",
        }}
      >
        <Row style={{ width: "100%", justifyContent: "center" }}>
          <Image src={Logo} preview={false} width={120} />
        </Row>
        <Typography.Title
          level={3}
          style={{ fontWeight: "bold", color: "#fff" }}
        >
          ĐĂNG NHẬP
        </Typography.Title>
        <Space direction="vertical" style={{ width: "100%" }} size={(10, 10)}>
          <Input
            placeholder="Tên đăng nhập ?"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            value={username}
            onKeyPress={handleKeyPress}
          />
          <Input.Password
            placeholder="Mật khẩu"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            onKeyPress={handleKeyPress}
          />
          {errorMessage !== false && (
            <Typography.Text type="danger">{errorMessage}</Typography.Text>
          )}
          <Button block type="primary" onClick={onSubmit}>
            Đăng nhập
          </Button>
        </Space>
      </Card>
    </div>
  );
}
