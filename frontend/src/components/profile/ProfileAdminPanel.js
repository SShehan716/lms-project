import React from 'react';
import { Card, Button, Space } from 'antd';
import { UserAddOutlined, BookOutlined } from '@ant-design/icons';

const ProfileAdminPanel = () => {
    return (
        <Card title="Admin Panel" style={{ marginBottom: 24 }}>
            <Space direction="vertical" style={{ width: '100%' }}>
                <Button type="primary" icon={<UserAddOutlined />} block>
                    Manage Users
                </Button>
                <Button icon={<BookOutlined />} block>
                    Manage Courses
                </Button>
            </Space>
        </Card>
    );
};

export default ProfileAdminPanel;