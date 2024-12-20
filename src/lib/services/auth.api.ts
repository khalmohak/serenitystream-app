import * as SecureStore from 'expo-secure-store';
import api from '../api/axios';

const ROOT_URL = "/auth";

export const logIn = async (email: string, password: string) => {
  try {
    const response = await api.post(`${ROOT_URL}/login`, {
      email,
      password,
    });
    await SecureStore.setItemAsync('accessToken', response.data.accessToken);
    api.defaults.headers.common.Authorization = `Bearer ${response.data.accessToken}`;

    return response.data;
  } catch (error: any) {
    console.log(JSON.stringify(error))
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export const register = async (userData: UserRegister) => {
  try {
    const response = await api.post(ROOT_URL + "/register", userData);
    await SecureStore.setItemAsync('accessToken', response.data.accessToken);
    api.defaults.headers.common.Authorization = `Bearer ${response.data.accessToken}`;
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

export const logout = async () => {
  try {
    await api.post(ROOT_URL + "/logout");
    await SecureStore.deleteItemAsync('accessToken');
    delete api.defaults.headers.common.Authorization;
  } catch (error) {
    console.log(error);
  }
};

export const logoutAllDevices = async () => {
  try {
    await api.post(ROOT_URL + "/logout-all");
  } catch (error) {
    console.log(error);
  }
};

export const getMe = async () => {
  try {
    const token = await SecureStore.getItemAsync('accessToken');
    if (!token) {
      throw new Error('No token found');
    }
    const response = await api.get(ROOT_URL + "/me");
    return response.data;
  } catch (error: any) {
    console.log(error)
    throw new Error(error.response?.data?.message || "Get Me failed");
  }
};
