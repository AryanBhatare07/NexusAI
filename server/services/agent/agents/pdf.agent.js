import { getModel } from "../config/llmModels.js";
import generatePdf from "../utils/generatePdf.js";
import cloudinary from "../config/cloudinary.js";
import { deductCredits } from "../utils/deductCredits.js";
import { checkAgentLimit } from "../config/agentlimit.js";

export const pdfAgent = async (state) => {
  try {
    await checkAgentLimit(state.userId, "pdf");
    const llm = await getModel("pdf");
    const prompt = `
You are an expert document writer.

Return ONLY valid JSON.

Do NOT return markdown.

Do NOT return explanations.

Structure:

{
"title":"",
"subtitle":"",
"sections":[
{
"heading":"",
"points":[]
}
]
}

Generate 4-8 sections.

Each section should have 3-6 concise bullet points.

Topic: 
${state.prompt}`;

    const res = await llm.invoke(prompt);
    const data = JSON.parse(res.content);
    await deductCredits(state.userId, "pdf");
    const pdfBuffer = await generatePdf(data);

    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "NexusAI/generated-pdfs",
          resource_type: "raw",
          type: "upload",
          access_mode: "public",
          public_id: `document-${Date.now()}.pdf`,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        },
      );

      stream.end(pdfBuffer);
    });

    return {
      aiResponse: "PDF generated successfully!",
      pdfUrl: uploadResult.secure_url,
      title: data.title,
    };
  } catch (error) {
    console.error("PDF Agent Error:", error);
    return {
      aiResponse: error?.data?.message || "Failed to generate pdf",
      error: error.message,
    };
  }
};
