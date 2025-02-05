// Invite.js
import React, { useEffect } from "react";
import { Modal, Form, Input, Button, Select, message } from "antd";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import { register } from "../../services/authService";

const { Option } = Select;

const Invite = ({ visible, onCancel, onInviteSuccess }) => {
  const [form] = Form.useForm();

  // Helper function to generate a random password.
  const generateRandomPassword = (length = 8) => {
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    let password = "";
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  // When the modal becomes visible, auto-generate a password and set it in the form.
  useEffect(() => {
    if (visible) {
      const newPassword = generateRandomPassword();
      form.setFieldsValue({
        password: newPassword,
        confirmPassword: newPassword, // if your API requires a confirm field
      });
    } else {
      form.resetFields();
    }
  }, [visible, form]);

  const handleSubmit = async (values) => {
    // The form already contains the auto‑generated password.
    try {
      const response = await register(values);

      if (response.error) {
        // If error is related to the email (e.g., already exists), mark that field.
        if (response.error.toLowerCase().includes("already exists")) {
          form.setFields([
            {
              name: "email",
              errors: [response.error],
            },
          ]);
        } else {
          message.error(response.error || "User invite failed. Please try again.");
        }
      } else if (response.message) {
        message.success(response.message);
        form.resetFields();
        onInviteSuccess(); // Notify parent component to refresh the user list.
        onCancel(); // Close the modal.
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      message.error("Something went wrong. Please try again.");
    }
  };

  return (
    <Modal
      title="Invite a New User"
      visible={visible}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input the user's name!" }]}
        >
          <Input placeholder="Enter user's name" prefix={<UserOutlined />} />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, type: "email", message: "Please input a valid email!" },
          ]}
        >
          <Input placeholder="Enter user's email" prefix={<MailOutlined />} />
        </Form.Item>
        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: "Please select a role!" }]}
        >
          <Select placeholder="Select a role">
            <Option value="student">Student</Option>
            <Option value="teacher">Teacher</Option>
            <Option value="admin">Admin</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Password is required!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Send Invite
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Invite;