import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout, Menu, Typography, Button, Space, Avatar, Dropdown } from 'antd';
import { UserOutlined, LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import useAuth from '../../hooks/useAuth'; // Assuming you have a useAuth hook for authentication

const { Header } = Layout;
const { Title } = Typography;

const AppHeader = () => {
    const { user, logout } = useAuth(); // Get user and logout function from useAuth
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // Call logout function
        navigate('/login'); // Redirect to login page
    };

    const menu = (
        <Menu>
            <Menu.Item key="profile" icon={<UserOutlined />}>
                <Link to="/profile">Profile</Link>
            </Menu.Item>
            <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
                Logout
            </Menu.Item>
        </Menu>
    );

    return (
        <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* Left Side: Logo and Navigation Links */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Title level={3} style={{ color: 'white', margin: 0, marginRight: '24px' }}>
                    GradeGenius
                </Title>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style={{ flex: 1, minWidth: 0 }}>
                    <Menu.Item key="1">
                        <Link to="/">Home</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="/student-dashboard">Dashboard</Link>
                    </Menu.Item>
                </Menu>
            </div>

            {/* Right Side: Login/Logout and User Avatar */}
            <Space>
                {user ? (
                    <Dropdown overlay={menu} trigger={['click']}>
                        <Space style={{ cursor: 'pointer' }}>
                            <Avatar icon={<UserOutlined />} />
                            <Typography.Text style={{ color: 'white' }}>{user.name}</Typography.Text>
                        </Space>
                    </Dropdown>
                ) : (
                    <Button type="primary" icon={<LoginOutlined />} onClick={() => navigate('/login')}>
                        Login
                    </Button>
                )}
            </Space>
        </Header>
    );
};

export default AppHeader;