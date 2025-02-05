import React, { useEffect, useState } from 'react';
import { Spin, Card, Typography, Button } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import {verifyUserToken} from '../../services/authService';

const { Title, Paragraph } = Typography;

const VerifyUserPage = () => {
  // Extract the token from URL parameters.
  const { token } = useParams();
  const navigate = useNavigate();

  // Local state to handle loading, success message, and errors.
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // useEffect to call the API as soon as the component mounts.
  useEffect(() => {
    const verifyUser = async () => {
      try {
        // Replace `/api/verify/${token}` with your actual API endpoint.
        const response = await verifyUserToken(token);
        setMessage(response.data.message || 'User Verified Successfully!');
      } catch (err) {
        // If your API returns an error message in the response, display it.
        setError(err.response?.data?.message || 'Verification failed.');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      verifyUser();
    } else {
      setError('Invalid verification link.');
      setLoading(false);
    }
  }, [token]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f2f5',
      }}
    >
      <Card style={{ width: 400, padding: 20, textAlign: 'center' }}>
        {loading ? (
          <Spin />
        ) : (
          <>
            <Title level={3}>
              {error ? 'Verification Failed' : 'Verification Successful'}
            </Title>
            <Paragraph>{error || message}</Paragraph>
            <Button type="primary" onClick={() => navigate('/login')} block>
              Go to Login
            </Button>
          </>
        )}
      </Card>
    </div>
  );
};

export default VerifyUserPage;