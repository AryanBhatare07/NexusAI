import { checkAgentLimit } from "../config/agentLimit.js";
import { SearchTool } from "../config/tavily.js";
import { deductCredits } from "../utils/deductCredits.js";

export const searchAgent = async (state) => {
  try {
    await checkAgentLimit(state.userId, "search");
    const results = await SearchTool.invoke({
      query: state.prompt
    });
    await deductCredits(state.userId,'search')


    return {
      ...state,
      searchResults: results,
      images: results.images || []
    };

  } catch (error) {
    console.log("Tavily Error:", error.message);

    return {
      ...state,
      searchResults: [],
      images: [],
      aiResponse: error?.data?.message
    };
  }
};