import {
  AIMessage,
  HumanMessage,
  SystemMessage,
} from "@langchain/core/messages";
import { getModel } from "../config/llmModels.js";
import { getMemory } from "../config/memory.js";
import { deductCredits } from "../utils/deductCredits.js";
import { checkAgentLimit } from "../config/agentlimit.js";

export const chatAgent = async (state) => {
  try {
    await checkAgentLimit(state.userId, "chat");
    const llm = await getModel("chat");

    const history = await getMemory(state.conversationId);

    const searchContext = state.searchResults
      ? `
  Web Search Results:

  ${JSON.stringify(
    state.searchResults.results?.map((item) => ({
      title: item.title,
      url: item.url,
      content: item.content,
    })) || [],
    null,
    2,
  )}

  Instructions:
  - Use the above search results to answer the user's question.
  - Treat search results as your source of information.
  - If the results do not contain enough information, clearly say so.
  - Never claim that you cannot access live information when search results are provided.
  - Do not invent facts.
  - Always format Markdown tables correctly.
  - Do not put multiple table rows on the same line.
  - Include article dates and source names when available.
  - Never describe older articles as today's news.
  `
      : "";

    const systemPrompt = `
  You are NexusAI, an intelligent AI assistant.

  ${searchContext}

  If searchContext exists:

  - Use search results to answer.
  - Do not mention internal tools.

  Rules: 

  - For simple questions, greetings, and short queries, respond naturally in plain text.
  - For technical, educational, coding, or detailed topics, use clean Markdown.
  - When web search results are provided, prioritize them over general knowledge.
  - For current or latest information, use the retrieved search results.

  Formatting Instructions:

  - Use # for main titles and ## for sections.
  - Leave a blank line after headings.
  - Use bullet points for lists.
  - Use numbered lists for steps.
  - Use fenced code blocks with language tags for code.
  - Keep paragraphs short and readable.
  - Never write headings and content on the same line.
  - Never generate large walls of text.
  `;
    const messages = [new SystemMessage(systemPrompt)];

    history.forEach((msg) => {
      if (msg.role === "user") {
        messages.push(new HumanMessage(msg.content));
      }
      if (msg.role === "assistant") {
        messages.push(new AIMessage(msg.content));
      }
    });

    messages.push(new HumanMessage(state.prompt));

    const response = await llm.invoke(messages);

    const creditData = await deductCredits(state.userId, "chat");

    return {
      ...state,
      aiResponse: response.content,
      credits: creditData?.credits,
    };
  } catch (error) {
    console.error("Chat Agent Error:", error);
    return {
      aiResponse: error?.data?.message,
      error: error.message,
    };
  }
};
