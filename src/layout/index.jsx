import React, { Children } from "react";
import {
  Flex,
  Layout,
  Input,
  theme,
  Row,
  Col,
  Button,
  Divider,
  Avatar,
  Dropdown,
  Menu,
  notification,
  FloatButton,
} from "antd";
import { Select, Space, Badge } from "antd";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import meme from "../assets/images/logo2.png";
import facebooklogo from "../assets/logo/icons8-facebook-48.png";
import hatlogo from "../assets/images/gia-su-online-logo-png-v2-60.png";
import animateLogo from "../assets/logo/icons8-youtube.gif";
import {
  ShoppingCartOutlined,
  SearchOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import {
  UserOutlined,
  FacebookOutlined,
  InstagramOutlined,
} from "@ant-design/icons";
import vietnamese from "../assets/images/vietnam.png";
import English from "../assets/images/uk.png";
import Bbone from "../assets/images/logo-04.png";
import { useCartStore } from "../hooks/useCart";
import { AudioOutlined, PhoneOutlined } from "@ant-design/icons";
import "./indexheader.css";

import useAuth from "../hooks/useAuth";
const { Header, Content, Footer } = Layout;
const facebookLink = "https://www.facebook.com/tanthanh.bui.94617/";
const youtubeLink = "https://www.youtube.com/watch?v=xvFZjo5PgG0";
const App = ({ children }) => {
  // const {
  //   token: {borderRadiusLG : 1, },
  // } = theme.useToken();

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const { Search } = Input;
  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: "#1677ff",
      }}
    />
  );

  const { logout, isAuthenticated } = useAuth();
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  const { totalQuantity } = useCartStore();
  const handleLogout = () => {
    logout();
    notification.success({
      message: "Dăng xuất thành công",
      description: "Bạn đã đăng xuất thành công.",
      duration: 2,
    });
  };

  const menu = (
    <Menu>
      <Menu.Item key="2">
        <Link to="/thongtin">Thông tin</Link>
      </Menu.Item>
      <Menu.Item key="1" onClick={handleLogout}>
        <Link to="/">Đăng xuất</Link>
      </Menu.Item>
    </Menu>
  );
  App.propTypes = {
    children: PropTypes.node.isRequired,
  };
  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#1079B1",
          height: "46px",
        }}
      >
        <div className="text-white flex ml-[135px] ">
          <p>Bbonevn@gmail.com</p>
          <p className="ml-6">0767770200</p>
        </div>
        <Space wrap>
          <Select
            defaultValue="Vietnamese"
            style={{
              width: 90,
              marginTop: "25px",
              marginRight: "0",
            }}
            onChange={handleChange}
            options={[
              {
                value: "Vietnamese",
                label: <img src={vietnamese} className="w-9" />,
              },
              {
                value: "English",
                label: <img src={English} className="w-9" />,
              },
            ]}
          />
          <div className="">
            {isAuthenticated ? (
              // If logged in, show user avatar and dropdown menu
              <>
                <div className="flex flex-col">
                  <Dropdown overlay={menu} trigger={["click"]}>
                    <img
                      src={meme}
                      alt="User Avatar"
                      className="w-[42px] h-[42px] rounded-full border object-cover"
                    />
                  </Dropdown>
                </div>
              </>
            ) : (
              // If not logged in, show login link
              <Link to="/login" className="text-[#ffff] text-[16px]">
                Đăng nhập
              </Link>
            )}
          </div>
        </Space>
      </Header>
      <Header
        className="bg-[#eee]"
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          backgroundColor: "#ffff",
          height: "117px",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          borderBottom: "1px solid #1079B1", // Reduced the thickness to 2px
        }}
      >
        <div className="flex justify-center items-center h-full space-x-2">
          <div className="flex align-middle justify-center w-full mt-1">
            <img src={Bbone} className="w-[170px] h-[100px]" />
            <div
              style={{
                height: "71px",
                width: "2px",
                backgroundColor: "#0082ca",
                marginTop: "10px",
                marginLeft: "10px",
              }}
            ></div>
          </div>
        </div>
        <div>
          <ul className="flex justify-between mr-28 ml-11">
            <li className="ml-28 mr-12 text-[#1079B1] text-[16px]">
              <Link to="/">Trang chủ</Link>
            </li>
            <li className="mr-12 text-[#1079B1] text-[16px]">
              <Link to="/BodyPart">Test miễn phí</Link>
            </li>
            <li className="mr-12 text-[#1079B1] text-[16px]">
              <Link to="/San-pham">Sản phẩm</Link>
            </li>
            <li className="text-[#1079B1] text-[16px]">
              {" "}
              <Link to="/Hospital">Đặt lịch với phòng khám</Link>
            </li>
          </ul>
        </div>
        <div className="flex">
          <Space direction="vertical">
            <Search
              placeholder="Tìm kiếm"
              onSearch={onSearch}
              style={{
                width: 153,
                marginTop: "16px",
                marginRight: "15px",
              }}
            />
          </Space>
          {totalQuantity > 0 ? (
            <Badge count={totalQuantity} className="mt-4">
              <Link to="/gio-hang">
                <ShoppingCartOutlined className="text-3xl text-[#1079B1]" />
              </Link>
            </Badge>
          ) : (
            <Link to="/gio-hang">
              <ShoppingCartOutlined className="text-3xl text-[#1079B1]" />
            </Link>
          )}
        </div>
      </Header>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          background: "#ffff",
        }}
      >
        <div style={{ flex: "1 0 auto" }}>
          <Content
            style={{
              padding: "0 0",
              borderRadius: "0px",
            }}
          >
            <div
              style={{
                minHeight: 380,
                borderRadius: 1,
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              {children}
            </div>
          </Content>
        </div>
        <Footer className="bottom-20 bg-[#D2E6F0] w-full">
          <div className="ml-3 md:ml-24 mr-2 md:mr-auto font-serif">
            <Row gutter={[48, 16]}>
              <Col span={7}>
                <div className="flex flex-col w-full ml-11">
                  <img src={Bbone} className="w-[220px] h-[120px]" />
                  <span className="font-normal text-[14px] text-[#1079B1] mt-4 w-64">
                    Địa chỉ: 68 đường Sương Nguyệt Ánh, Phường Phạm Ngũ Lão,
                    Quận 1, Hồ Chí Minh
                  </span>
                  <span className="font-normal text-[16px] text-[#1079B1] mt-10 mr-2">
                    Mã số doanh nghiệp: 0912345
                  </span>
                </div>
              </Col>
              <Col span={6}>
                <div className="flex flex-col space-y-1 md:space-y- lg:space-y-1 xl:space-y-3 2xl:space-y-2 font-mono mt-4">
                  <span className="font-bold text-[20px] text-[#1079B1]">
                    BBONE
                  </span>
                  <div className="flex flex-row divide-x-2 h-5 divide-gray-300 space-x-2">
                    <Link
                      className="font-normal text-[16px] text-[#1079B1]"
                      to="/gioi-thieu "
                    >
                      Về chúng tôi
                    </Link>
                  </div>
                  <div className="flex flex-row divide-x-2 h-5 divide-solid divide-gray-300 space-x-2">
                    <Link
                      className="font-normal text-[16px] text-[#1079B1]"
                      to="/tai-lieu"
                    >
                      Liên hệ
                    </Link>
                  </div>
                  <div>
                    <Link
                      className=" text-[16px] text-[#1079B1]"
                      to="/tai-khoan"
                    >
                      Điều khoản
                    </Link>
                  </div>
                  <div>
                    <Link
                      className=" text-[16px] text-[#1079B1]"
                      to="/tai-khoan"
                    >
                      Thông tin
                    </Link>
                  </div>
                  <div>
                    <Link
                      className="text-[16px] text-[#1079B1]"
                      to="/tai-khoan"
                    >
                      Chính sách quyền riêng tư
                    </Link>
                  </div>
                </div>
              </Col>
              <Col span={6}>
                <div className="flex flex-col space-y-2 md:space-y-4 font-mono mt-[17px]">
                  <span className="font-bold text-[20px] text-[#1079B1]">
                    Dịch vụ
                  </span>
                  <Link
                    className="text-[#1079B1] text-[16px]"
                    to="/chinh-sach-nguoi-dung"
                  >
                    Sản phẩm
                  </Link>
                  <Link
                    className="text-[#1079B1] text-[16px]"
                    to="/dieu-khoan-su-dung"
                  >
                    Đặt lịch phòng khám
                  </Link>
                  <Link
                    className="text-[#1079B1] text-[16px]"
                    to="/chinh-sach-thanh-toan"
                  >
                    Câu hỏi thường gặp
                  </Link>
                  <Link
                    className="text-[#1079B1] text-[16px]"
                    to="/chinh-sach-thanh-toan"
                  >
                    Điều khoản sử dụng
                  </Link>
                </div>
              </Col>
              <Col span={4}>
                <div className="flex flex-col font-mono bg-[#1079B1] rounded-xl p-4 mt-3 w-[140%] min-h-[100px] h-auto justify-between">
                  <span className="font-bold text-[24px] text-white">
                    Liên hệ
                  </span>

                  <Flex wrap gap="small" className="mt-2">
                    <p className="text-white text-[16px]">
                      Nếu bạn cần hỗ trợ, hãy liên hệ chúng tôi qua số
                    </p>
                  </Flex>

                  <Flex wrap gap="small" className="mt-2">
                    <PhoneOutlined className="text-xl text-white" />
                    <p className="text-xl ml-2 text-white font-bold">
                      0767770200
                    </p>
                  </Flex>

                  {/* Social Media Icons */}
                  <div className="flex mt-4 ">
                    <a
                      href="https://www.facebook.com/bbonevn"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon
                        icon={faFacebook}
                        className="text-white text-2xl"
                      />
                    </a>
                    <a
                      href="https://www.instagram.com/bbone.vn?igsh=MXgyNXB1bHY3NjN0Ng=="
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-5"
                    >
                      <FontAwesomeIcon
                        icon={faInstagram}
                        className="text-white text-2xl"
                      />
                    </a>
                    <a
                      href="https://www.tiktok.com/@bbone.vn?_r=1&_d=secCgYIASAHKAESPgo8tvaNYlDTdikJqDdRCUZkzRGeNpnVfNu9iy%2BMTebNAFdWySbDDRdtL8hIZSX0yyS0OFjIqxb7RbDsdc5HGgA%3D&checksum=3e66605201dbe712699b270c6581a8a29bc2b2682109e1b57ff425ee90ed7a54&sec_uid=MS4wLjABAAAAm0enB1JifSkXwNqkvyb5PHyvVIM_F2IeFWmQBI4TfEzDwGJmrAX4DO8anqAkU9-t&sec_user_id=MS4wLjABAAAAKC68RBv1KO2hvhpY9flqJZZF_eMDJb1Jt5FZ0Slz-Zzad12Ra-xazBHUHYp7VtRE&share_app_id=1180&share_author_id=7418028572738388999&share_link_id=1D6F4ABC-9EE1-48FB-9714-88BE09DBFDA3&sharer_language=vi&social_share_type=5&source=h5_t&timestamp=1729274095&tt_from=copy&u_code=d07deh6a8j3iee&ug_btm=b6880%2Cb5836&user_id=6559707487515426818&utm_campaign=client_share&utm_medium=ios&utm_source=copy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-5"
                    >
                      <FontAwesomeIcon
                        icon={faTiktok}
                        className="text-white text-2xl"
                      />
                    </a>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Footer>
      </div>
    </Layout>
  );
};
export default App;
