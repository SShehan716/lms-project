import React, { useState } from "react";
import { Layout, Typography } from "antd";
import PastMarksList from "../../components/studentInsights/PastMarksList";
import PassFailPrediction from "../../components/studentInsights/PassFailPrediction";

const { Content } = Layout;
const { Title } = Typography;

// Dummy Data (Past Marks)
const pastMarks = [
    { id: 1, subject: "Mathematics", score: 20 },
    { id: 2, subject: "Science", score: 78 },
    { id: 3, subject: "English", score: 50 },
];

const StudentDashboardPage = () => {
    const [marks, setMarks] = useState(pastMarks);

    return (
        <Layout style={{ padding: "24px" }}>
            <Content>
                <Title level={2}>Student Performance</Title>
                <PastMarksList marks={marks} />
                <PassFailPrediction marks={marks} />
            </Content>
        </Layout>
    );
};

export default StudentDashboardPage;