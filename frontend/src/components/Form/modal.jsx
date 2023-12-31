import { Divider, Modal } from "antd";
import { ModalWrapper } from "../../assets/styles/modal-style";

const CustomeModal = (props) => {
  let { children } = props;
  return (
    <ModalWrapper {...props} maskClosable={false} style={{ top: 50 }}>
      <Divider style={{ marginTop: 10, marginBottom: 10 }} />
      {children}
      <Divider style={{ marginTop: 10, marginBottom: 10 }} />
    </ModalWrapper>
  );
};

export default CustomeModal;
