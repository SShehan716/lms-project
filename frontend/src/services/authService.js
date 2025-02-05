import api from "./api";

export const login = async (email, password) => {
    try {
        const response = await api.post('api/auth/login', { email, password });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const register = async ({ name, email, password, role }) => {
    try {
        const response = await api.post('api/auth/register', { name, email, password, role });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const verifyUserToken = async (token) => {
    try {
        const response = await api.get(`api/auth/verify/${token}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}