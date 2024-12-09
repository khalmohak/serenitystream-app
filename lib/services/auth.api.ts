import { api } from "../api/axios";

const ROOT_URL = "/auth";

export const logIn = async (email: string, password: string) => {
  try {
    const response = await api.post(ROOT_URL + "/login", {
      email,
      password,
    });

    return response.data;
  } catch (error: any) {
    console.log(JSON.stringify(error))
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export const register = async (userData: UserRegister) => {
  try {
    const response = await api.post(ROOT_URL + "/register", userData);

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

export const logout = async () => {
  try {
    await api.post(ROOT_URL + "/logout");
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
    const response = await api.get(ROOT_URL + "/me");
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Get Me failed");
  }
};
