import axios from "axios";
import mockMeetingRooms from "../assets/data/mockMeetingRooms";

const useMockData = import.meta.env.APP_USE_MOCK_DATA?.toLowerCase() === "true";
const apiUrl = import.meta.env.APP_SERVER_BASE_API_URL; // API 的 URL

// 封装 GET 请求
export const fetchRooms = async () => {
  console.log("useMockData:"+useMockData);
  if (useMockData) {
    // 返回 Mock 数据
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockMeetingRooms), 500); // 模拟延迟
    });
  } else {
    // 返回 API 请求结果
    try {
      // const response = await axios.get(`${apiUrl}/meeting-rooms`);
      // return response.data;
      //return [];

      return new Promise((resolve) => {
        setTimeout(() => resolve(mockMeetingRooms), 500); // 模拟延迟
      });

    } catch (error) {
      console.error("Failed to fetch rooms from API", error);
      throw error; // 抛出错误，供调用处处理
    }
  }
};

// 封装 POST 请求
export const addRoom = async (roomData) => {
  if (useMockData) {
    // 返回 Mock 数据
    return new Promise((resolve) => {
      setTimeout(() => resolve({ ...roomData, id: mockMeetingRooms.length + 1 }), 500); // 模拟延迟
    });
  } else {
    // 返回 API 请求结果
    try {
      const response = await axios.post(`${apiUrl}/meeting-rooms`, roomData);
      return response.data;
    } catch (error) {
      console.error("Failed to add room to API", error);
      throw error; // 抛出错误，供调用处处理
    }
  }
};

// 封装 PUT 请求（编辑会议室）
export const updateRoom = async (roomId, updatedData) => {
  if (useMockData) {
    // 返回 Mock 数据
    return new Promise((resolve) => {
      setTimeout(() => resolve({ ...updatedData, id: roomId }), 500); // 模拟延迟
    });
  } else {
    // 返回 API 请求结果
    try {
      const response = await axios.put(`${apiUrl}/meeting-rooms/${roomId}`, updatedData);
      return response.data;
    } catch (error) {
      console.error("Failed to update room in API", error);
      throw error; // 抛出错误，供调用处处理
    }
  }
};

// 封装 DELETE 请求（删除会议室）
export const deleteRoom = async (roomId) => {
  if (useMockData) {
    // 返回 Mock 数据
    return new Promise((resolve) => {
      setTimeout(() => resolve({ message: "Room deleted successfully", id: roomId }), 500); // 模拟延迟
    });
  } else {
    // 返回 API 请求结果
    try {
      const response = await axios.delete(`${apiUrl}/meeting-rooms/${roomId}`);
      return response.data;
    } catch (error) {
      console.error("Failed to delete room from API", error);
      throw error; // 抛出错误，供调用处处理
    }
  }
};
