import {
  Check,
  Code2,
  Copy,
  Eye,
  PanelRightClose,
  PanelRightOpen,
  X,
} from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { AnimatePresence, easeInOut, motion } from "motion/react";
import Editor from "@monaco-editor/react";

const Artifact = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { artifacts } = useSelector((state) => state.message);
  const [tab, setTab] = useState("code");
  const [activeFile, setActiveFile] = useState(0);
  const [copied, setCopied] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!artifacts?.length) return null;

  const file = artifacts[0]?.files[activeFile];
  const htmlFile = artifacts[0]?.files?.find((f) => f.name === "index.html");
  const cssFile = artifacts[0]?.files?.find((f) => f.name === "style.css");
  const jsFile = artifacts[0]?.files?.find((f) => f.name === "script.js");

  const canPreview = Boolean(htmlFile);

  const previewDoc = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      ${cssFile?.content || ""}
    </style>
</head>
<body>
${htmlFile?.content || ""}
    <script>
        ${jsFile?.content || ""}
    </script>
</body>
</html>`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(file?.content || "");
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const detectLanguage = (fileName = "") => {
    const name = fileName.toLowerCase();

    if (name.endsWith(".html")) return "html";

    if (name.endsWith(".css")) return "css";

    if (name.endsWith(".js")) return "javascript";

    if (name.endsWith(".jsx")) return "javascript";

    if (name.endsWith(".ts")) return "typescript";

    if (name.endsWith(".tsx")) return "typescript";

    if (name.endsWith(".json")) return "json";

    if (name.endsWith(".py")) return "python";

    return "text";
  };
  const PanelContent = ({onClose}) => (
    <>
      {!collapsed ? (
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="h-14 px-4 border-b border-white/[0.06] flex items-center gap-3 shrink-0">
            <button
              onClick={onClose ?? (() =>  setCollapsed(true))}
              className="flex items-center justify-center w-7 h-7 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent border-none cursor-pointer shrink-0"
            >
              {onClose? <X size={15}/> : <PanelRightClose size={17} /> }
            </button>

            <div className="flex items-center gap-2 flex-1 min-w-0">
              <div className="flex items-center justify-center w-6 h-6 rounded-md bg-indigo-500/10 border border-indigo-500/20 shrink-0">
                <Code2 className="text-indigo-400" size={12} />
              </div>

              <div className="text-[13px] font-medium text-slate-200 truncate">
                {artifacts?.[0]?.title || "Generated Project"}
              </div>
            </div>
            {/* Artifact Content */}
            <div className="flex items-center gap-1 shrink-0 ml-auto">
              <button
                onClick={handleCopy}
                className="flex gap-1.5 px-2.5 py-1.5 text-[11px] font-medium text-slate-400 hover:text-slate-200 hover:bg-white/[0.05] rounded-lg transition-colors duration-150 bg-transparent border-none cursor-pointer"
              >
                {copied ? <Check size={15} /> : <Copy size={15} />}
              </button>
            </div>
            {canPreview && (
              <div className="flex items-center gap-1 bg-white/[0.04] border border-white/[0.06] p-1 rounded-lg">
                <button
                  onClick={() => setTab("code")}
                  className={`flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors duration-150 ${
                    tab === "code"
                      ? "bg-indigo-500 text-white"
                      : "text-slate-500 hover:text-slate-200"
                  }`}
                >
                  <Code2 size={11} />
                  Code
                </button>

                <button
                  onClick={() => setTab("preview")}
                  className={`flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors duration-150 ${
                    tab === "preview"
                      ? "bg-indigo-500 text-white"
                      : "text-slate-500 hover:text-slate-200"
                  }`}
                >
                  <Eye size={11} />
                  Preview
                </button>
              </div>
            )}
          </div>
          {tab === "code" && (
            <div className="h-auto text-white flex border-b border-white/[0.06] overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden shrink-0">
              {artifacts[0]?.files?.map((file, index) => (
                <button
                  onClick={() => setActiveFile(index)}
                  className={`px-4 py-2.5 text-[15px] font-medium whitespace-nowrap transition-colors duration-150 border-r border-white/10 relative cursor-pointer bg-transparent ${activeFile === index ? "text-indigo-400" : "text-slate-500 hover:text-slate-300"}`}
                >
                  {file?.name}
                  {activeFile === index && (
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-indigo-500 rounded-t-full" />
                  )}
                </button>
              ))}
            </div>
          )}

          <div className="flex-1 overflow-hidden">
            {tab === "preview" && canPreview ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full"
              >
                <iframe
                  title="preview"
                  sandbox="allow-scripts"
                  srcDoc={previewDoc}
                  className="w-full h-full bg-white"
                />
              </motion.div>
            ) : (
              <motion.div
                key={file?.name}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="w-full h-full overflow-hidden"
              >
                <Editor
                  theme="vs-dark"
                  language={detectLanguage(file?.name)}
                  value={file?.content || ""}
                  options={{
                    readOnly: true,

                    // Editor Layout
                    automaticLayout: true,
                    scrollBeyondLastLine: false,
                    wordWrap: "on",

                    // Font Styling
                    fontSize: 14,
                    fontFamily: "'Fira Code', 'Consolas', monospace",
                    fontLigatures: true,
                    lineHeight: 24,

                    // Line Numbers
                    lineNumbers: "on",
                    lineNumbersMinChars: 3,

                    // Minimap
                    minimap: {
                      enabled: false,
                    },

                    // Editor Appearance
                    padding: {
                      top: 20,
                      bottom: 20,
                    },
                    renderLineHighlight: "none",
                    roundedSelection: true,
                    cursorBlinking: "smooth",
                    cursorSmoothCaretAnimation: "on",
                    smoothScrolling: true,

                    // Scrollbar
                    scrollbar: {
                      verticalScrollbarSize: 8,
                      horizontalScrollbarSize: 8,
                      useShadows: false,
                    },

                    // Other Settings
                    folding: true,
                    foldingHighlight: true,
                    bracketPairColorization: {
                      enabled: false,
                    },
                    guides: {
                      indentation: false,
                      bracketPairs: false,
                    },
                    stickyScroll: {
                      enabled: true,
                    },
                    contextmenu: false,
                    renderWhitespace: "selection",
                    selectionHighlight: false,
                    occurrencesHighlight: "off",
                  }}
                />
              </motion.div>
            )}
          </div>
        </div>
      ) : (
        <div className="relative flex h-full flex-col items-center bg-[#0d0f14]">
          {/* Expand Button */}
          <div className="h-14 w-full flex items-center justify-center shrink-0 border-b border-white/[0.06]">
            <button
              onClick={() => setCollapsed(false)}
              className="flex items-center justify-center w-7 h-7 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent border-none cursor-pointer"
            >
              <PanelRightOpen size={17} />
            </button>
          </div>

          {/* Title - Exact Vertical Center */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="text-[14px] font-medium text-slate-600 tracking-widest uppercase whitespace-nowrap"
              style={{
                writingMode: "vertical-lr",
                transform: "rotate(180deg)",
              }}
            >
              {artifacts?.[0]?.title || "Generated Project"}
            </div>
          </div>
        </div>
      )}
    </>
  );
  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed bottom-24 right-4 z-40
        flex items-center gap-2 px-3.5 py-2
        rounded-xl
        bg-indigo-600
        hover:bg-indigo-500 text-white text-[12px]
        font-medium shadow-lg
        shadow-indigo-500/20 border-none cursor-pointer
        transition-colors duration-150"
      >
        <Code2 size={13} />
        View Code
      </button>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                duration: 0.25,
                ease: "easeInOut",
              }}
              className="lg:hidden fixed inset-y-0 right-0 z-50 w-[88vw] max-w-[420px] border-l border-white/[0.06] overflow-hidden"
            >
              <PanelContent onClose={()=>setMobileOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ width: 400 }}
        animate={{ width: collapsed ? 48 : 400 }}
        transition={{
          duration: 0.25,
          ease: easeInOut,
        }}
        className="hidden lg:flex h-full border-l border-white/[0.06] flex-col overflow-hidden shrink-0 bg-[#0d0f14]"
      >
        <PanelContent />
      </motion.div>
    </>
  );
};

export default Artifact;
