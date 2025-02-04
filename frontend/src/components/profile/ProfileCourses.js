import React from 'react';
import { Card, List, Typography } from 'antd';

const { Title } = Typography;

const ProfileCourses = ({ courses, role }) => {
    return (
        <Card title={role === 'student' ? 'Enrolled Courses' : 'Taught Courses'} style={{ marginBottom: 24 }}>
            <List
                dataSource={courses}
                renderItem={(course) => (
                    <List.Item>
                        <Typography.Text>{course}</Typography.Text>
                    </List.Item>
                )}
            />
        </Card>
    );
};

export default ProfileCourses;