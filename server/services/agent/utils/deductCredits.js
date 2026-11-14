import axios from "axios";

export const deductCredits = async (userId, agent) => {
  try {
    console.log("DEDUCT REQUEST:", { userId, agent });

    const { data } = await axios.post(
      `${process.env.AUTH_SERVICE}/deduct-credits`,
      {
        userId,
        agent,
      },
    );

    console.log("DEDUCT RESPONSE:", data);

    return data;
  } catch (error) {
    console.log("DEDUCT ERROR:", error.response?.data || error.message);
    console.log("STATUS:", error.response?.status);
    console.log("AUTH SERVICE URL:", process.env.AUTH_SERVICE);
    return null;
  }
};
