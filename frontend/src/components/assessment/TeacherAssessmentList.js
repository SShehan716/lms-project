import React from "react";
import { List, Card } from "antd";

const TeacherAssessmentList = ({ assessments, onSelectAssessment }) => {
    return (
        <List
            grid={{ gutter: 16, column: 1 }}
            dataSource={assessments}
            renderItem={(assessment) => (
                <List.Item>
                    <Card hoverable onClick={() => onSelectAssessment(assessment)}>
                        {assessment.title}
                    </Card>
                </List.Item>
            )}
        />
    );
};

export default TeacherAssessmentList;