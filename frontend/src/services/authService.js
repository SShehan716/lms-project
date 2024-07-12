import api from "./api";

export const login = async (email, password) => {
    try {
        const response = await api.post('api/users/login', { email, password });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const register = async (name, email, password) => {
    try {
        const response = await api.post('api/users/register', { name, email, password });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}