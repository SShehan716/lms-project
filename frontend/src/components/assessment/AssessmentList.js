import React from "react";
import { List, Typography, Card, Empty } from "antd";
import AssessmentItem from "./AssessmentItem";

const { Title } = Typography;

const AssessmentList = ({ submissions }) => {
  return (
    <div className="list-container">
      <Title level={3}>Submitted Assessments</Title>
      {submissions.length === 0 ? (
        <Empty description="No submissions yet" />
      ) : (
        <List
          grid={{ gutter: 16, column: 1 }}
          dataSource={submissions}
          renderItem={(submission) => (
            <List.Item>
              <Card>
                <AssessmentItem submission={submission} />
              </Card>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default AssessmentList;