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

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  //   const { errorMessage } = useSelector((state) => state.auths);

  const onSubmit = () => {
    // dispatch(
    //   authSlice.actions.login({
    //     loginAccount: username,
    //     loginPassword: password,
    //   })
    // );
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
          />
          <Input.Password
            placeholder="Mật khẩu"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
          {/* <Typography.Text style={{ color: 'red' }}>
              Tài khoản không chính xác
            </Typography.Text> */}
          <Button block type="primary">
            Đăng nhập
          </Button>
        </Space>
      </Card>
    </div>
  );
}
