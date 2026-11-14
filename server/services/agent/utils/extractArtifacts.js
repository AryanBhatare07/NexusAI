export const extractArtifacts = (content) => {
  const fileRegex =
    /^### FILE:\s*(.+?)\s*\r?\n```[a-zA-Z0-9+#.-]*\s*\r?\n([\s\S]*?)\r?\n```/gm;

  const files = [];

  let match;

  while ((match = fileRegex.exec(content)) !== null) {
    files.push({
      name: match[1].trim(),
      content: match[2].trim(),
    });
  }

  return files;
};

export const extractProjectTitle = (content) => {
  const match = content.match(/^PROJECT_TITLE:\s*(.+)$/m);

  return match ? match[1].trim() : "Generated Project";
};