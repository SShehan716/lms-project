import React from 'react';
import { Card, Button, Space } from 'antd';
import { EditOutlined, LockOutlined } from '@ant-design/icons';

const ProfileActions = () => {
    return (
        <Card title="Actions" style={{ marginBottom: 24 }}>
            <Space direction="vertical" style={{ width: '100%' }}>
                <Button type="primary" icon={<EditOutlined />} block>
                    Edit Profile
                </Button>
                <Button icon={<LockOutlined />} block>
                    Change Password
                </Button>
            </Space>
        </Card>
    );
};

export default ProfileActions;