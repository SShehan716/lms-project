import React from "react";
import { Card, Typography } from "antd";
import { FilePdfOutlined } from "@ant-design/icons";

const { Text } = Typography;

const AssessmentItem = ({ submission }) => {
  return (
    <Card hoverable>
      <Text strong>{submission.studentName}</Text> - 
      <Text> {submission.title} </Text> - 
      <a href={`#${submission.fileName}`} download>
        <FilePdfOutlined style={{ marginLeft: 5, color: "red" }} /> {submission.fileName}
      </a>
    </Card>
  );
};

export default AssessmentItem;