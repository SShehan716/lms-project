import React from 'react';
import { Layout, Typography } from 'antd';
import ProfileInfo from '../../components/profile/ProfileInfo';
import ProfileActions from '../../components/profile/ProfileActions';
import ProfileCourses from '../../components/profile/ProfileCourses';
import ProfileAdminPanel from '../../components/profile/ProfileAdminPanel';

const { Content } = Layout;
const { Title } = Typography;

const Profile = () => {
    // Mock user data (replace with actual data from your backend or context)
    const user = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'student', // Can be 'student', 'lecturer', or 'admin'
        courses: ['Mathematics 101', 'Physics 102'], // Example courses
    };

    return (
        <Layout style={{ padding: '24px' }}>
            <Content>
                <Title level={2}>Profile</Title>
                <ProfileInfo user={user} />
                <ProfileActions />
                {user.role === 'admin' ? (
                    <ProfileAdminPanel />
                ) : (
                    <ProfileCourses courses={user.courses} role={user.role} />
                )}
            </Content>
        </Layout>
    );
};

export default Profile;