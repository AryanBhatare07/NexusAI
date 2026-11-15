import { useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { Check, Copy, ExternalLink, X, FileText, Download } from "lucide-react";

const MessageBubble = ({
  role,
  content,
  images,
  pdfUrl,
  pdfTitle,
  pptUrl,
  pptTitle,
}) => {
  const isUser = role === "user";
  const [lightBox, setLightBox] = useState(null);
  const [copiedCode, setCopiedCode] = useState("");

  const copyCode = async (code) => {
    await navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => {
      setCopiedCode("");
    }, 2000);
  };
  return (
    <div
      className={`flex w-full mb-6 ${
        isUser ? "justify-end pr-4 md:pr-8" : "justify-start"
      }`}
    >
      <div
        className={`w-fit max-w-[90%] md:max-w-[75%]
    px-4 py-3 rounded-2xl
    text-[14px] md:text-[15px]
    leading-7 break-words overflow-hidden
    ${
      isUser
        ? "bg-gradient-to-br from-indigo-600 to-violet-700 text-white rounded-tr-sm shadow-lg shadow-indigo-500/10"
        : "bg-[#151b2b] border border-white/[0.06] text-slate-200 rounded-tl-sm"
    }`}
      >
        <div
          className="prose prose-invert prose-sm max-w-none
      prose-p:my-2
      prose-headings:text-white
      prose-headings:font-semibold
      prose-a:text-indigo-400
      prose-a:no-underline hover:prose-a:underline
      prose-strong:text-white
      prose-code:text-violet-300
      prose-pre:bg-[#0b1020]
      prose-pre:border prose-pre:border-white/10
      prose-pre:rounded-xl
      prose-ul:my-2
      prose-ol:my-2
      prose-li:my-1
      prose-blockquote:border-indigo-500
      prose-blockquote:text-slate-400
      prose-table:border-collapse
      prose-th:border prose-th:border-white/10
      prose-td:border prose-td:border-white/10"
        >
          {images.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-4">
              {images.map((img, i) => (
                <div key={i} className="relative group">
                  <img
                    onClick={() => setLightBox(img)}
                    src={img}
                    loading="lazy"
                    onError={(e) => e.currentTarget.remove()}
                    className="w-full max-w-[550px] h-[380px] rounded-xl object-cover border border-white/10 cursor-zoom-in hover:opacity-90 transition"
                  />

                  <a
                    href={img}
                    download={`nexusai-image-${i + 1}.png`}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="absolute bottom-2 right-2 p-2 rounded-lg bg-black/70 text-white opacity-0 group-hover:opacity-100 transition"
                    title="Download Image"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                  </a>
                </div>
              ))}
            </div>
          )}

          {pdfUrl && (
            <div className="mt-4 flex items-center gap-4 p-4 rounded-xl bg-[#1c2435] border border-white/10 max-w-[450px]">
              <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center">
                <FileText size={26} className="text-red-400" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">
                  {pdfTitle || "Generated PDF"}
                </p>
                <p className="text-xs text-slate-400">PDF Document</p>
              </div>

              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700"
              >
                Download
              </a>
            </div>
          )}

          {pptUrl && (
            <div className="mt-4 flex items-center justify-between gap-4 rounded-xl border border-gray-700 bg-[#171923] p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-500/10">
                  <div className="relative flex h-8 w-8 items-center justify-center rounded-md bg-[#D24726] shadow-md">
                    <span className="text-lg font-bold text-white">P</span>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-white">
                    {pptTitle || "Presentation"}
                  </p>
                  <p className="text-xs text-gray-400">
                    PowerPoint Presentation
                  </p>
                </div>
              </div>

              <a
                href={pptUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700"
              >
                Download
              </a>
            </div>
          )}

          <Markdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h1 className="text-2xl font-bold mt-5 mb-3">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-xl font-semibold mt-4 mb-2">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-lg font-semibold mt-3 mb-2">{children}</h3>
              ),
              p: ({ children }) => (
                <p className="mt-3 whitespace-pre-wrap wrap-break-word">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc pl-5 space-y-1 my-2">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal pl-5 space-y-1 my-2">{children}</ol>
              ),
              table: ({ children }) => (
                <div className="overflow-x-auto my-4">
                  <table className="min-w-full border border-white/10">
                    {children}
                  </table>
                </div>
              ),
              th: ({ children }) => (
                <th className="border border-white/10 bg-white/5 px-3 py-2 text-left">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="border border-white/10 px-3 py-2">{children}</td>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-400 underline inline-flex items-center gap-1"
                >
                  {children}
                  <ExternalLink size={14} />
                </a>
              ),
              code: ({ className, children }) => {
                const value = String(children).trim();
                const language = className?.replace("language-", "");
                if (!className) {
                  return (
                    <code className="px-1.5 py-0.5 rounded bg-violet-500/10 text-violet-300 border border-violet-500/20">
                      {value}
                    </code>
                  );
                }
                return (
                  <div className="my-4 overflow-hidden rounded-xl border-white/10 bg-[#111318]">
                    <div className="flex items-center justify-between bg-[#1b1d24] border-b border-white/10 px-4 py-2">
                      <span className="uppercase text-xs text-slate-400">
                        {language}
                      </span>
                      <button
                        className="flex items-center gap-1 text-xs"
                        onClick={() => copyCode(value)}
                      >
                        {copiedCode === value ? (
                          <>
                            <Check size={14} />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy size={14} />
                            Copy
                          </>
                        )}
                      </button>
                    </div>

                    <SyntaxHighlighter
                      language={language}
                      style={oneDark}
                      showLineNumbers
                      wrapLongLines={false}
                      customStyle={{
                        margin: 0,
                        padding: "18px 16px",
                        background: "#0d1117",
                        fontSize: "13px",
                        lineHeight: "1.8",
                        overflowX: "auto",
                        cursor: "text",
                      }}
                      codeTagProps={{
                        style: {
                          fontFamily: "'Fira Code', 'Consolas', monospace",
                        },
                      }}
                      lineNumberStyle={{
                        minWidth: "2.5em",
                        paddingRight: "16px",
                        color: "#64748b",
                        opacity: 0.7,
                        userSelect: "none",
                      }}
                    >
                      {value}
                    </SyntaxHighlighter>
                  </div>
                );
              },
              img: ({ src }) => {
                if (!src) return null;
                return (
                  <img
                    onClick={() => setLightBox(src)}
                    src={src}
                    loading="lazy"
                    onError={(e) => e.currentTarget.remove()}
                    className="w-full max-w-[550px] h-[380px] rounded-xl object-cover border border-white/10 cursor-zoom-in hover:opacity-90 transition"
                  />
                );
              },
            }}
          >
            {content}
          </Markdown>
        </div>
      </div>
      {lightBox && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop:backdrop-blur-sm flex items-center justify-center p-6">
          <button
            className="absolute top-5 right-5 text-white/80 hover:text-white bg-white/10 rounded-full p-2"
            onClick={() => setLightBox(null)}
          >
            <X />
          </button>
          <img
            src={lightBox}
            className="max-w[90vw] max-h-[85vh] rounded-2xl border border-white/10 shadow-2xl object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
