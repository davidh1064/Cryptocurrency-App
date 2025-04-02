import React, { useState, useEffect } from "react";
import { Button, Menu, Typography, Avatar, Drawer } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
  HomeOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
} from "@ant-design/icons";

import icon from "../images/bull.png";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 800) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const menuItems = [
    { icon: <HomeOutlined />, label: "Home", path: "/" },
    {
      icon: <FundOutlined />,
      label: "Cryptocurrencies",
      path: "/cryptocurrencies",
    },
    { icon: <BulbOutlined />, label: "News", path: "/news" },
  ];

  const renderMenu = (mode = "inline") => (
    <Menu
      theme="dark"
      mode={mode}
      defaultSelectedKeys={["/"]}
      selectedKeys={[location.pathname]}
    >
      {menuItems.map((item) => (
        <Menu.Item key={item.path} icon={item.icon}>
          <Link to={item.path} onClick={() => setVisible(false)}>
            {item.label}
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={icon} size="large" />
        <Typography.Title level={2} className="logo">
          <Link to="/">CryptoApp</Link>
        </Typography.Title>
        {screenSize <= 800 && (
          <Button
            className="menu-control-container"
            type="text"
            icon={<MenuOutlined />}
            onClick={showDrawer}
          />
        )}
      </div>
      {/* Desktop menu */}
      {activeMenu && (
        <div className="desktop-menu">{renderMenu("vertical")}</div>
      )}
      {/* Mobile drawer */}
      <Drawer
        title={
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Avatar src={icon} size="small" />
            <Typography.Title
              level={4}
              style={{ margin: 0, color: "var(--primary)" }}
            >
              CryptoApp Menu
            </Typography.Title>
          </div>
        }
        placement="right"
        onClose={onClose}
        visible={visible}
        width={250}
        bodyStyle={{ padding: 0 }}
      >
        {renderMenu()}
      </Drawer>
    </div>
  );
};

export default Navbar;
