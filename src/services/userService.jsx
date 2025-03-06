import axios from "axios";
import mockUsers from "../assets/data/mockUsers";

const useMockData = import.meta.env.APP_USE_MOCK_DATA?.toLowerCase() === "true";
const apiUrl = import.meta.env.APP_SERVER_BASE_API_URL; // API 的 URL

// 封装 GET 请求
export const fetchUsers = async () => {
  if (useMockData) {
    // 返回 Mock 数据
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockUsers), 500); // 模拟延迟
    });
  } else {
    // 返回 API 请求结果
    try {
      // const response = await axios.get(`${apiUrl}/users`);
      // return response.data;
      //return [];

      return new Promise((resolve) => {
        setTimeout(() => resolve(mockUsers), 500); // 模拟延迟
      });

    } catch (error) {
      console.error("Failed to fetch users from API", error);
      throw error; // 抛出错误，供调用处处理
    }
  }
};

// 封装 POST 请求
export const addUser = async (data) => {
  if (useMockData) {
    // 返回 Mock 数据
    return new Promise((resolve) => {
      setTimeout(() => resolve({ ...data, id: mockUsers.length + 1 }), 500); // 模拟延迟
    });
  } else {
    // 返回 API 请求结果
    try {
      const response = await axios.post(`${apiUrl}/users`,data);
      return response.data;
    } catch (error) {
      console.error("Failed to add user to API", error);
      throw error; // 抛出错误，供调用处处理
    }
  }
};

// 封装 PUT 请求（编辑）
export const updateUser = async (id, updatedData) => {
  if (useMockData) {
    // 返回 Mock 数据
    return new Promise((resolve) => {
      setTimeout(() => resolve({ ...updatedData, id: id }), 500); // 模拟延迟
    });
  } else {
    // 返回 API 请求结果
    try {
      const response = await axios.put(`${apiUrl}/users/${id}`, updatedData);
      return response.data;
    } catch (error) {
      console.error("Failed to update user in API", error);
      throw error; // 抛出错误，供调用处处理
    }
  }
};

// 封装 DELETE 请求（删除）
export const deleteUser = async (id) => {
  if (useMockData) {
    // 返回 Mock 数据
    return new Promise((resolve) => {
      setTimeout(() => resolve({ message: "User deleted successfully", id: id }), 500); // 模拟延迟
    });
  } else {
    // 返回 API 请求结果
    try {
      const response = await axios.delete(`${apiUrl}/users/${id}`);
      return response.data;
    } catch (error) {
      console.error("Failed to delete user from API", error);
      throw error; // 抛出错误，供调用处处理
    }
  }
};
