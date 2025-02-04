import React, { useState } from "react";
import { Form, Input, Button, Typography, Card } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom"; // For redirection
import useAuth from "../../hooks/useAuth";
import { login as loginUser } from "../../services/authService";

const { Title } = Typography;

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [form] = Form.useForm(); // To control the form programmatically
    const { login } = useAuth();
    const navigate = useNavigate(); // For navigation

    const handleSubmit = async () => {
        try {
            const response = await loginUser(email, password);
            console.log("Response: ", response);

            if (response.error) {
                // Display specific errors under fields
                if (response.message.includes("email")) {
                    form.setFields([
                        {
                            name: "email",
                            errors: [response.message],
                        },
                    ]);
                } else if (response.message.includes("password")) {
                    form.setFields([
                        {
                            name: "password",
                            errors: [response.message],
                        },
                    ]);
                }
            } else {
                // Successful login, navigate to dashboard
                login(response); // Save login context
                navigate("/dashboard"); // Redirect to dashboard
            }
        } catch (error) {
            console.error("Unexpected error: ", error);
            form.setFields([
                {
                    name: "email",
                    errors: ["Something went wrong. Please try again."],
                },
            ]);
        }
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                backgroundColor: "#f0f2f5",
            }}
        >
            <Card
                style={{
                    width: 400,
                    padding: 20,
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    borderRadius: 8,
                }}
            >
                <Title level={3} style={{ textAlign: "center", marginBottom: 20 }}>
                    LMS Login
                </Title>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit} // Submit handler
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Please input your email!",
                            },
                        ]}
                    >
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            prefix={<MailOutlined />}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your password!",
                            },
                        ]}
                    >
                        <Input.Password
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            prefix={<LockOutlined />}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Login;