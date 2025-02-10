import React from "react";
import { List, Progress, Card } from "antd";

const PastMarksList = ({ marks }) => {
    return (
        <Card title="Past Assessment Marks">
            <List
                dataSource={marks}
                renderItem={(mark) => (
                    <List.Item>
                        <strong>{mark.subject}:</strong> {mark.score} / 100
                        <Progress percent={mark.score} status={mark.score >= 50 ? "success" : "exception"} />
                    </List.Item>
                )}
            />
        </Card>
    );
};

export default PastMarksList;