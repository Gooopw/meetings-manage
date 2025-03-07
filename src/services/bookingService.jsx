import axios from "axios";
import mockBookings from "../assets/data/mockBookings";

const useMockData = import.meta.env.APP_USE_MOCK_DATA?.toLowerCase() === "true";
const apiUrl = import.meta.env.APP_SERVER_BASE_API_URL; // API 的 URL

// 封装 GET 请求
export const fetchBookings = async () => {
  if (useMockData) {
    // 返回 Mock 数据
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockBookings), 500); // 模拟延迟
    });
  } else {
    // 返回 API 请求结果
    try {
      // const response = await axios.get(`${apiUrl}/bookings`);
      // return response.data;
      //return [];

      return new Promise((resolve) => {
        setTimeout(() => resolve(mockBookings), 500); // 模拟延迟
      });

    } catch (error) {
      console.error("Failed to fetch Bookings from API", error);
      throw error; // 抛出错误，供调用处处理
    }
  }
};

// 封装 POST 请求
export const addBooking = async (data) => {
  if (useMockData) {
    // 返回 Mock 数据
    return new Promise((resolve) => {
      setTimeout(() => resolve({ ...data, id: mockBookings.length + 1 }), 500); // 模拟延迟
    });
  } else {
    // 返回 API 请求结果
    try {
      const response = await axios.post(`${apiUrl}/Bookings`,data);
      return response.data;
    } catch (error) {
      console.error("Failed to add Booking to API", error);
      throw error; // 抛出错误，供调用处处理
    }
  }
};

// 封装 PUT 请求（编辑）
export const updateBooking = async (id, updatedData) => {
  if (useMockData) {
    // 返回 Mock 数据
    return new Promise((resolve) => {
      setTimeout(() => resolve({ ...updatedData, id: id }), 500); // 模拟延迟
    });
  } else {
    // 返回 API 请求结果
    try {
      const response = await axios.put(`${apiUrl}/Bookings/${id}`, updatedData);
      return response.data;
    } catch (error) {
      console.error("Failed to update Booking in API", error);
      throw error; // 抛出错误，供调用处处理
    }
  }
};

// 封装 DELETE 请求（删除）
export const deleteBooking = async (id) => {
  if (useMockData) {
    // 返回 Mock 数据
    return new Promise((resolve) => {
      setTimeout(() => resolve({ message: "Booking deleted successfully", id: id }), 500); // 模拟延迟
    });
  } else {
    // 返回 API 请求结果
    try {
      const response = await axios.delete(`${apiUrl}/Bookings/${id}`);
      return response.data;
    } catch (error) {
      console.error("Failed to delete Booking from API", error);
      throw error; // 抛出错误，供调用处处理
    }
  }
};
