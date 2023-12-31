import { Breadcrumb } from "../../components";

const pageHeader = {
  title: "Thông tin cá nhân",
  breadcrumb: [
    {
      title: "Trang chủ",
    },
  ],
};

const Home = () => {
  return (
    <div>
      <Breadcrumb items={pageHeader.breadcrumb} />
      Trang chủ
    </div>
  );
};

export default Home;
