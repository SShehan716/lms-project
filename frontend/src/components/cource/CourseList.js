import React from "react";
import { List, Card } from "antd";

const CourseList = ({ courses, onSelectCourse }) => {
    return (
        <List
            grid={{ gutter: 16, column: 1 }}
            dataSource={courses}
            renderItem={(course) => (
                <List.Item>
                    <Card hoverable onClick={() => onSelectCourse(course)}>
                        {course.name}
                    </Card>
                </List.Item>
            )}
        />
    );
};

export default CourseList;