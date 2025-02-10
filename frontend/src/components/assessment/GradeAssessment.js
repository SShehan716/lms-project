import React, { useState } from "react";
import { Card, Button, Typography, InputNumber, message } from "antd";

const { Title, Text } = Typography;

const GradeAssessment = ({ student }) => {
    const [grade, setGrade] = useState(null);

    const handleGradeSubmit = () => {
        if (grade === null) {
            message.error("Please enter a grade before submitting!");
            return;
        }
        message.success(`Graded ${student.studentName} with ${grade}/100!`);
    };

    return (
        <Card style={{ textAlign: "center" }}>
            <Title level={3}>Grade Assessment</Title>
            <Text strong>Student: </Text> {student.studentName} <br />
            <Text strong>File: </Text>
            <a href={`#${student.fileName}`} download>
                {student.fileName}
            </a>

            <iframe
                src={`https://github.com/SShehan716/lms-project/blob/frontend/dashboards/frontend/public/dummy_assessment/req.pdf`} 
                width="100%"
                height="500px"
                style={{ marginTop: "20px", border: "1px solid #ddd" }}
            ></iframe>

            <div style={{ marginTop: "20px" }}>
                <Text strong>Assign Grade:</Text>
                <InputNumber
                    min={0}
                    max={100}
                    style={{ width: "100px", marginLeft: "10px" }}
                    onChange={(value) => setGrade(value)}
                />
            </div>

            <Button
                type="primary"
                onClick={handleGradeSubmit}
                style={{ marginTop: "20px" }}
            >
                Submit Grade
            </Button>
        </Card>
    );
};

export default GradeAssessment;