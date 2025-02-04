import React from 'react';
import { Card, Descriptions, Typography } from 'antd';

const { Title } = Typography;

const ProfileInfo = ({ user }) => {
    return (
        <Card title="Profile Information" style={{ marginBottom: 24 }}>
            <Descriptions bordered column={1}>
                <Descriptions.Item label="Name">{user.name}</Descriptions.Item>
                <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
                <Descriptions.Item label="Role">{user.role}</Descriptions.Item>
            </Descriptions>
        </Card>
    );
};

export default ProfileInfo;