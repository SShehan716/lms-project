import React from 'react';
import { Table, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const UserList = ({ users }) => {
  const navigate = useNavigate();

  // Define handler functions for view and edit actions.
  const handleView = (id) => {
    // Navigate to a user view page. Adjust the path as needed.
    navigate(`/user/view/${id}`);
  };

  const handleEdit = (id) => {
    // Navigate to a user edit page. Adjust the path as needed.
    navigate(`/user/edit/${id}`);
  };

  // Define the table columns.
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role'
    },
    {
      title: 'Verified',
      key: 'verified',
      render: (text, record) => (
        <span>{record.emailVerifiedAt ? 'Verified' : 'Not Verified'}</span>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <>
          <Button type="link" onClick={() => handleView(record._id)}>
            View
          </Button>
          <Button type="link" onClick={() => handleEdit(record._id)}>
            Edit
          </Button>
        </>
      )
    }
  ];

  return (
    <Table 
      dataSource={users} 
      columns={columns} 
      rowKey="_id" 
    />
  );
};

export default UserList;