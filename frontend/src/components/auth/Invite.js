// Invite.js
import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Select, message, DatePicker } from "antd";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import { register } from "../../services/authService";
import moment from "moment";


const { Option } = Select;

const Invite = ({ visible, onCancel, onInviteSuccess }) => {
  const [form] = Form.useForm();
  const [selectedRole, setSelectedRole] = useState(null);

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
          <Select placeholder="Select a role" onChange={(value) => setSelectedRole(value)}>
            <Option value="student">Student</Option>
            <Option value="teacher">Teacher</Option>
            <Option value="admin">Admin</Option>
          </Select>
        </Form.Item>

        {selectedRole === "student" && (
          <>
            <Form.Item
              label="Code Module"
              name="code_module"
              rules={[{ required: true, message: "Please select a code module!" }]}
            >
              <Select placeholder="Select a code module">
                <Select.Option value="AAA">AAA</Select.Option>
                <Select.Option value="BBB">BBB</Select.Option>
                <Select.Option value="CCC">CCC</Select.Option>
                <Select.Option value="DDD">DDD</Select.Option>
                <Select.Option value="EEE">EEE</Select.Option>
                <Select.Option value="FFF">FFF</Select.Option>
                <Select.Option value="GGG">GGG</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Code Presentation"
              name="code_presentation"
              rules={[{ required: true, message: "Please select a code presentation!" }]}
            >
              <Select placeholder="Select a code presentation">
                <Select.Option value="2013B">2013B</Select.Option>
                <Select.Option value="2013J">2013J</Select.Option>
                <Select.Option value="2014B">2014B</Select.Option>
                <Select.Option value="2014J">2014J</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Gender"
              name="gender"
              rules={[{ required: true, message: "Please select a gender!" }]}
            >
              <Select placeholder="Select a gender">
                <Select.Option value="Male">Male</Select.Option>
                <Select.Option value="Female">Female</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="IMD Band"
              name="imd_band"
              rules={[{ required: true, message: "Please select an IMD band!" }]}
            >
              <Select placeholder="Select an IMD band">
                <Select.Option value="0-10%">0-10%</Select.Option>
                <Select.Option value="10-20%">10-20%</Select.Option>
                <Select.Option value="20-30%">20-30%</Select.Option>
                <Select.Option value="30-40%">30-40%</Select.Option>
                <Select.Option value="40-50%">40-50%</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Highest Education"
              name="highest_education"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Age Band"
              name="age_band"
              rules={[{ required: true, message: "Please select an age band!" }]}
            >
              <Select placeholder="Select an age band">
                <Select.Option value="0-35">0-35</Select.Option>
                <Select.Option value="35-55">35-55</Select.Option>
                <Select.Option value="55<=">55 or above</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Region"
              name="region"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Disability"
              name="disability"
              rules={[{ required: true, message: "Please select a disability status!" }]}
            >
              <Select placeholder="Select Disability">
                <Select.Option value="Y">Yes</Select.Option>
                <Select.Option value="N">No</Select.Option>
              </Select>
            </Form.Item>
          </>
        )}
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