// UserListPage.js
import React, { useState, useEffect } from "react";
import { Button, Typography } from "antd";
import Invite from "../../components/auth/Invite";
import UserList from "../../components/users/UserList";
import { useUserService } from "../../services/userService";

const { Title } = Typography;

const UserListPage = () => {
  const [isInviteModalVisible, setIsInviteModalVisible] = useState(false);
  const [users, setUsers] = useState([]);

  const { getAllUsers } = useUserService();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  const openInviteModal = () => {
    setIsInviteModalVisible(true);
  };

  const closeInviteModal = () => {
    setIsInviteModalVisible(false);
  };

  // This function is called after a successful invite.
  // Here, you might re-fetch the users list from your API.
  // For this demo, we simply add a new dummy user.
  const handleInviteSuccess = () => {
    const newUser = {
      id: users.length + 1,
      name: "New User",
      email: `newuser${users.length + 1}@example.com`,
      role: "student",
    };
    if (newUser.role === "student") {
      newUser = {
        ...newUser,
        code_module: "",
        code_presentation: "",
        date_registration: "",
        date_unregistration: "",
        gender: "",
        imd_band: "",
        highest_education: "",
        age_band: "",
        num_of_prev_attempts: 0,
        studied_credits: 0,
        region: "",
        disability: "",
        final_result: "",
      };
    }
    setUsers([...users, newUser]);
  };

  return (
    <div style={{ padding: 20 }}>
      <div
        style={{
          marginBottom: 20,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Title level={3} style={{ margin: 0 }}>
          All Users
        </Title>
        <Button type="primary" onClick={openInviteModal}>
          Add New User
        </Button>
      </div>

      <UserList users={users} />

      <Invite
        visible={isInviteModalVisible}
        onCancel={closeInviteModal}
        onInviteSuccess={handleInviteSuccess}
      />
    </div>
  );
};

export default UserListPage;