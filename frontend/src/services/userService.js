import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from "./api";

export const useUserService = () => {
  const { user } = useContext(AuthContext);

  const getAllUsers = async () => {
    const token = user.token;
    const response = await api.get('api/users/all-users', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }

  const getUserByEmail = async (email) => {
    const token = user.token;
    const response = await api.get(`api/users/user/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }

  return { getAllUsers, getUserByEmail };
};