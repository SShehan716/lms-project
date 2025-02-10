import React from "react";
import { List, Card } from "antd";

const StudentSubmissionList = ({ submissions, onSelectStudent }) => {
    return (
        <List
            grid={{ gutter: 16, column: 1 }}
            dataSource={submissions}
            renderItem={(submission) => (
                <List.Item>
                    <Card hoverable onClick={() => onSelectStudent(submission)}>
                        <p><strong>{submission.studentName}</strong></p>
                        <p>📄 {submission.fileName}</p>
                    </Card>
                </List.Item>
            )}
        />
    );
};

export default StudentSubmissionList;