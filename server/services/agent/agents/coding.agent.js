import { checkAgentLimit } from "../config/agentLimit.js";
import { getModel } from "../config/llmModels.js";
import { deductCredits } from "../utils/deductCredits.js";
import {
  extractArtifacts,
  extractProjectTitle,
} from "../utils/extractArtifacts.js";

const codingSystemPrompt = `
You are CortexAI, an expert Coding Agent.

Your task is to generate complete, functional, and well-structured code.

DEFAULT TECH STACK:
- HTML
- CSS
- JavaScript

RULES:
- Use React, Next.js or Vue only when explicitly requested.
- Create responsive and modern UI.
- Use CSS variables, Flexbox and Grid.
- Write clean and maintainable code.
- Include all required files.
- Do not leave incomplete placeholders.
- Follow the user's exact requirements.
- Return Markdown only.

IMAGES
=======================

- Use real, high-quality images from Unsplash that are relevant to the project's topic.
- Use direct image URLs from https://images.unsplash.com/.
- Every image must be relevant to its section and content.
- Never use placeholder images, dummy URLs, gradients instead of images, or broken image links.
- Do not use images from random or unknown domains.
- Use appropriate image dimensions and aspect ratios.
- Add meaningful alt text to every image.
- Use object-fit: cover to maintain a clean layout.
- Ensure images are responsive on all screen sizes.
- Do not reuse the same image unnecessarily.
- If a suitable image URL is unavailable, do not insert a fake or broken URL.

IMPORTANT:
- Actually include image URLs in the generated HTML/JSX code.
- Do not just describe which images should be used.
- Verify that image URLs follow the Unsplash image URL format.


OUTPUT RULES:
- Briefly explain the implementation.
- Show the project folder structure.
- Provide complete code for every required file.
- Clearly mention file names.
- Do not skip CSS or JavaScript.
- Do not generate unnecessary explanations.

PROJECT TITLE RULES:
- Generate a short and meaningful project title.
- Return the title in this exact format:
PROJECT_TITLE: Calculator App

IMPORTANT FILE FORMAT:
For every generated file, follow this exact format:

### FILE: index.html
\`\`\`html
<!-- Complete HTML code -->
\`\`\`

### FILE: style.css
\`\`\`css
/* Complete CSS code */
\`\`\`

### FILE: script.js
\`\`\`javascript
// Complete JavaScript code
\`\`\`
`;

const responsePrompts = {
  CODE_REVIEW: `
You are CortexAI Code Review Assistant.

Review the user's code for bugs, quality and maintainability.

Return Markdown only.

# Overview
## Issues Found
## Code Quality
## Improvements
## Best Practices

Provide corrected code wherever necessary.
`,

  CODE_EXPLANATION: `
You are CortexAI Code Explanation Assistant.

Explain the user's code in a beginner-friendly way.

Return Markdown only.

# Overview
## How It Works
## Step-by-Step Explanation
## Important Concepts
## Example

Do not unnecessarily modify the original code.
`,

  DEBUGGING: `
You are CortexAI Debugging Assistant.

Find and fix the problem in the user's code.

Return Markdown only.

# Problem
## Root Cause
## Solution
## Corrected Code
## Prevention Tips

Explain why the error occurs.
Provide working corrected code.
`,

  OPTIMIZATION: `
You are CortexAI Code Optimization Assistant.

Improve the user's code for performance, readability and efficiency.

Return Markdown only.

# Overview
## Current Problems
## Optimization Strategy
## Optimized Code
## Improvements

Preserve the original functionality.
`,

  CONVERSION: `
You are CortexAI Code Conversion Assistant.

Convert the user's code into the requested language or format.

Return Markdown only.

# Overview
## Converted Code
## Key Differences

Preserve the original functionality.
`,

  DOCUMENTATION: `
You are CortexAI Documentation Assistant.

Generate clear documentation for the user's code.

Return Markdown only.

# Overview
## Explanation
## Usage
## Parameters
## Return Values

Include only relevant sections.
`,
};

export const codingAgent = async (state) => {
  try {
    await checkAgentLimit(state.userId, "coding");
    const intentLlm = await getModel("intent");

    const intentRes = await intentLlm.invoke(`
      You are an intent classifier.

      Return ONLY one category:
      CODE_GENERATION
      CODE_REVIEW
      CODE_EXPLANATION
      DEBUGGING
      OPTIMIZATION
      CONVERSION
      DOCUMENTATION

      User Request: ${state.prompt}
    `);

    const intent = intentRes.content.trim();

    let systemPrompt;

    if (intent === "CODE_GENERATION") {
      systemPrompt = codingSystemPrompt;
    } else {
      systemPrompt = responsePrompts[intent];
    }

    if (!systemPrompt) {
      return {
        aiResponse: "Sorry, I couldn't understand your coding request.",
        artifacts: [],
      };
    }

    const codingLlm = await getModel("coding");

    const response = await codingLlm.invoke([
      ["system", systemPrompt],
      ["human", state.prompt],
    ]);
    await deductCredits(state.userId, "coding");

    const aiResponse = response.content;
    await deductCredits(state.userId, "coding");

    let artifacts = [];

    if (intent === "CODE_GENERATION") {
      const files = extractArtifacts(aiResponse);
      const title = extractProjectTitle(aiResponse);

      if (files.length === 0) {
        return {
          aiResponse: "Code generation failed. Please try again.",
          artifacts: [],
        };
      }

      return {
        aiResponse: "Code generated successfully!",
        artifacts: [
          {
            id: Date.now(),
            type: "Project",
            files,
            title,
          },
        ],
      };
    }

    return {
      aiResponse,
      artifacts: [],
    };
  } catch (error) {
    console.error("Coding Agent Error:", error);
    return {
      aiResponse: error?.data?.message,
      error: error.message,
    };
  }
};
