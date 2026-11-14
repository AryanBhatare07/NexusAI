import dotenv from "dotenv";
dotenv.config();
import { ChatGroq } from "@langchain/groq";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatOpenRouter } from "@langchain/openrouter";

const groq = new ChatGroq({
  model: "openai/gpt-oss-120b",
  apiKey: process.env.GROQ_API_KEY,
});

const gemini = new ChatGoogleGenerativeAI({
  model: "gemini-3.5-flash-lite",
});

const openrouter = new ChatOpenRouter({
  model: "nvidia/nemotron-3-ultra-550b-a55b:free",
  temperature: 0,
  maxTokens: 2500,
});

export const getModel = async (agent) => {
  switch (agent) {
    case "chat":
      return groq;

    case "search":
      return groq;

    case "coding":
      return openrouter;

    case "imageAnalyzer":
      return gemini;

    case "intent":
      return openrouter;

    default:
      return groq;
  }
};
