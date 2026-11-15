import axios from "axios";
import { getModel } from "../config/llmModels.js";
import cloudinary from "../config/cloudinary.js";
import { deductCredits } from "../utils/deductCredits.js";
import { checkAgentLimit } from "../config/agentLimit.js";

export const visionAgent = async (state) => {
  try {
    await checkAgentLimit(state.userId, "image");
    const llm = await getModel("image");

    const res = await llm.invoke(`You are an elite AI image prompt engineer.

Convert the user request into a highly detailed image generation prompt.

Requirements:
- Cinematic lighting
- Professional composition
- Ultra realistic
- High detail
- Beautiful color palette
- Sharp focus
- 8K quality
- Photorealistic
- Depth of field
- Professional photography
- Stunning visuals

Return only the image prompt.

User Request:
${state.prompt}
`);

    const prompt = res.content.trim();

    const imageRes = await axios.get(
      `https://gen.pollinations.ai/image/${encodeURIComponent(prompt)}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.POLLINATIONS_API_KEY}`,
        },
        params: {
          model: "black-forest-labs/flux.1-schnell",
        },
        responseType: "arraybuffer",
        timeout: 120000,
      },
    );

    await deductCredits(state.userId, "vision");

    const imageBuffer = Buffer.from(imageRes.data);

    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "NexusAI/generated-images",
          resource_type: "image",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        },
      );

      uploadStream.end(imageBuffer);
    });

    return {
      aiResponse: "🖼️ Image generated successfully!",
      images: [uploadResult.secure_url],
    };
  } catch (error) {
    console.error("Vision Agent Error:", error.message);
    return {
      aiResponse: error?.data?.message,
      error: error.message,
    };
  }
};
