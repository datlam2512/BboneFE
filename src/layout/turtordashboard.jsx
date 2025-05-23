/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Layout, Menu, notification, Dropdown } from "antd";
import {
  SettingOutlined,
  HomeOutlined,
  BookOutlined,
  CreditCardOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import meme from "../assets/images/images.jpg";
import hatlogo from "../assets/logo/187390886-black-graduate-hat-with-golden-element-on-white-background-flat-design-illustration-vector-graphics.jpg";

const { Content, Sider, Footer } = Layout;

function getItem(label, key, icon, children, path) {
  return {
    key,
    icon,
    children,
    label,
    path,
  };
}

const items = [
  getItem("Dashboard", "1", <HomeOutlined />, null, "/turtor/dashboard"),
  getItem("Training program", "sub1", <BookOutlined />, [
    getItem("My Course", "2", null, null, "/turtor/program/view"),
    getItem("Create New Course", "3", null, null, "/turtor/program/create"),
  ]),
  getItem("Message", "4", <MessageOutlined />, "", "/turtor/message"),
  getItem("Setting", "sub2", <SettingOutlined />, [
    getItem("Account", "5", null, null, "/turtor/account"),
  ]),
];

const TurtorDashboardLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const storeDefaultSelectedKeys = (keys) => {
    sessionStorage.setItem("keys", keys);
  };

  const resetDefaultSelectedKeys = () => {
    const selectedKeys = sessionStorage.getItem("keys");
    return selectedKeys ? selectedKeys : ["2"];
  };

  const defaultSelectedKeys = resetDefaultSelectedKeys();

  const renderMenuItems = (items) => {
    return items.map((item) => {
      if (item.children && item.children.length > 0) {
        return (
          <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
            {renderMenuItems(item.children)}
          </Menu.SubMenu>
        );
      } else {
        return (
          <Menu.Item
            key={item.key}
            icon={item.icon}
            onClick={() => storeDefaultSelectedKeys([item.key])}
          >
            <Link to={item.path}>{item.label}</Link>
          </Menu.Item>
        );
      }
    });
  };

  TurtorDashboardLayout.propTypes = {
    children: PropTypes.node.isRequired,
  };

  const handleLogout = () => {
    logout();
    notification.success({
      message: "Logout Successful",
      description: "You have successfully logged out.",
      duration: 2,
    });
  };

  const menu = (
    <Menu>
      <Menu.Item key="2">
        <Link to="/">Shop</Link>
      </Menu.Item>
      <Menu.Item key="1" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout className="min-h-screen">
      <Sider
        width={230}
        breakpoint="lg"
        collapsedWidth="55"
        defaultCollapsed
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className="scrollbar sider overflow-auto min-h-screen left-0 top-0 bottom-0 box-border z-50 flex-none w-56 overflow-y-auto"
        theme="light"
      >
        <div className="demo-logo-vertical" />
        <div className="flex justify-center my-4">
          <img
            className="w-5/12 object-cover select-none"
            src={hatlogo}
            alt=""
          />
        </div>
        <Menu
          theme="light"
          defaultSelectedKeys={defaultSelectedKeys}
          mode="inline"
          className="select-none"
        >
          {renderMenuItems(items)}
        </Menu>
      </Sider>
      <Layout className="right-bar overflow-y-auto transition-all duration-[280ms] ease-in">
        <div className="header-admin pr-4 flex justify-end gap-2 items-center fixed z-[1000] h-20 shadow-none bg-[#ffff] bg-opacity-80 backdrop-blur-[6px]">
          <img
            src={meme}
            alt=""
            className="w-[42px] h-[42px] rounded-full border object-cover"
          />
          <div className="flex flex-col">
            <Dropdown overlay={menu} trigger={["click"]}>
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                Admin
              </a>
            </Dropdown>
          </div>
        </div>
        <Content className="mt-24 mx-4 ">
          <div className="rounded-xl overflow-x-auto min-w-[250px] bg-[#f5f5f5]">
            {children}
          </div>
        </Content>
        <Footer className="text-center">
          Gia sư online © {new Date().getFullYear()} Công ty TNHH nhóm 5 thành
          viên
        </Footer>
      </Layout>
    </Layout>
  );
};
export default TurtorDashboardLayout;
