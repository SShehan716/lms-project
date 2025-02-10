import React, { useState } from "react";
import { Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const AssessmentForm = ({ onSubmit }) => {
  const [form] = Form.useForm();
  const [file, setFile] = useState(null);

  const handleFileChange = (info) => {
    if (info.file.status === "done" || info.file.status === "uploading") {
      setFile(info.file.originFileObj);
    }
  };

  const handleSubmit = (values) => {
    if (!file) {
      message.error("Please upload a PDF file.");
      return;
    }

    const newSubmission = {
      id: Date.now(),
      studentName: values.studentName,
      title: values.title,
      fileName: file.name,
    };

    onSubmit(newSubmission);
    form.resetFields();
    setFile(null);
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item
        label="Student Name"
        name="studentName"
        rules={[{ required: true, message: "Please enter your name" }]}
      >
        <Input placeholder="Enter student name" />
      </Form.Item>

      <Form.Item
        label="Assessment Title"
        name="title"
        rules={[{ required: true, message: "Please enter assessment title" }]}
      >
        <Input placeholder="Enter assessment title" />
      </Form.Item>

      <Form.Item
        label="Upload Assessment (PDF)"
        rules={[{ required: true, message: "Please upload a file" }]}
      >
        <Upload beforeUpload={() => false} onChange={handleFileChange} accept=".pdf">
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AssessmentForm;