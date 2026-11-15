import cloudinary from "../config/cloudinary.js";
import { getModel } from "../config/llmModels.js";
import { generatePpt } from "../utils/generatePpt.js";
import { deductCredits } from "../utils/deductCredits.js";
import { checkAgentLimit } from "../config/agentLimit.js";

export const pptAgent = async (state) => {
  try {
    await checkAgentLimit(state.userId, "ppt");
    const llm = await getModel("ppt");
    const prompt = `
You are a professional presentation designer.

Create a well-structured, informative and visually balanced presentation.

Return ONLY valid JSON.
Do NOT return markdown.
Do NOT include explanations outside JSON.

Format:
{
  "title": "",
  "subtitle": "",
  "slides": [
    {
      "title": "",
      "points": []
    }
  ]
}

Rules:
1. Generate 6-10 slides.
2. First slide should introduce the topic.
3. Each slide should have 3-5 concise bullet points.
4. Keep points short, clear and informative.
5. Maintain a logical flow between slides.
6. Avoid repeating information.
7. Use simple and professional language.
8. Include practical examples wherever useful.
9. Last slide should contain a conclusion or key takeaways.
10. Do not add unnecessary content.

Topic:
${state.prompt}
`;

    const res = await llm.invoke(prompt);
    const data = JSON.parse(res.content);
    await deductCredits(state.userId,'ppt')

    const ppt = await generatePpt(data);
    const buffer = await ppt.write({
      outputType: "nodebuffer",
    });

    // Upload PPT to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "NexusAI/generated-ppts",
          resource_type: "raw",
          public_id: `presentation-${Date.now()}.pptx`,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        },
      );

      stream.end(buffer);
    });

    return {
      aiResponse: "PowerPoint generated successfully!",
      pptUrl: uploadResult.secure_url,
      title: data.title,
    };
  } catch (error) {
    console.error("PPT Agent Error:", error);

    return {
      aiResponse: error?.data?.message || "Failed to generate ppt",
      error: error.message,
    };
  }
};
