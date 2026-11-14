import api from "../../utils/axios";

const sendMessage = async (payload) => {
  try {
    const { data } = await api.post("/api/agent/chat", payload);
    return data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
  }
};

export default sendMessage;
