import React, { useState } from "react";
import AssessmentForm from "../../components/assessment/AssessmentForm";
import AssessmentList from "../../components/assessment/AssessmentList";
import { Layout, Typography } from 'antd';

const { Content } = Layout;
const { Title } = Typography;

const AssessmentSubmission = () => {
    // Dummy initial data
    const [submissions, setSubmissions] = useState([
        { id: 1, studentName: "Alice", title: "Math Assignment", fileName: "math.pdf" },
        { id: 2, studentName: "Bob", title: "Science Report", fileName: "science.pdf" },
    ]);

    const addSubmission = (newSubmission) => {
        setSubmissions([...submissions, newSubmission]);
    };

    return (
        <Layout style={{ padding: '24px' }}>
            <Content>
                <Title level={2}>Assessment Submission</Title>
                <div className="container">
                    <AssessmentForm onSubmit={addSubmission} />
                    <AssessmentList submissions={submissions} />
                </div>
            </Content>
        </Layout>

    );
};

export default AssessmentSubmission;