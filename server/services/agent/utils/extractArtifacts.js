export const extractArtifacts = (content) => {
  const fileRegex =
    /###\s*FILE:\s*(.+?)\s*\r?\n\s*```[^\r\n]*\r?\n([\s\S]*?)```/g;

  const files = [];
  const seen = new Set();

  let match;

  while ((match = fileRegex.exec(content)) !== null) {
    const name = match[1].trim();
    const code = match[2].trim();

    if (!seen.has(name)) {
      files.push({
        name,
        content: code,
      });

      seen.add(name);
    }
  }

  return files;
};

export const extractProjectTitle = (content) => {
  const match = content.match(/^PROJECT_TITLE:\s*(.+)$/m);

  return match ? match[1].trim() : "Generated Project";
};
