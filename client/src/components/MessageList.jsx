import { useSelector } from "react-redux";
import MessageBubble from "./MessageBubble";
import LoadingAnimation from "./LoadingAnimation";
import { useRef } from "react";
import { useEffect } from "react";

const MessageList = () => {
  const { selectedConversation } = useSelector((state) => state.conversation);
  const { messages, isLoading } = useSelector((state) => state.message);
  const bottemRef = useRef(null);

  useEffect(() => {
    requestAnimationFrame(() => {
      bottemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    });
  }, [messages.length, isLoading]);

  return (
    <div className="flex-1 min-h-0 overflow-y-auto px-4 py-5 md:px-6 md:py-6 space-y-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {messages.length === 0 || !selectedConversation ? (
        <div className="min-h-full flex flex-col items-center justify-center gap-5 text-center">
          <div className="flex flex-col items-center gap-2 px-4">
            <h1 className="text-2xl font-semibold tracking-tight text-white">
              NexusAI
            </h1>

            <p className="text-sm md:text-base font-medium text-slate-400">
              How can I help you?
            </p>

            <p className="text-xs md:text-sm text-slate-500 max-w-[280px] leading-relaxed">
              Ask me anything — code, ideas, explanations, or just a quick
              question.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 max-w-[340px] px-2">
            {[
              "Write a Netflix clone",
              "Explain Redis",
              "Build a dashboard",
            ].map((s, i) => (
              <button
                key={i}
                className="text-xs text-slate-400
            bg-white/[0.035] border border-white/[0.08]
            px-3.5 py-2 rounded-xl
            hover:bg-white/[0.07] hover:text-slate-200
            hover:border-white/[0.14]
            active:scale-95
            transition-all duration-200 cursor-pointer"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-5 max-w-5xl mx-auto w-full">
          {messages?.map((msg, i) => (
            <div key={i}>
              <MessageBubble
                role={msg?.role}
                content={msg?.content}
                images={msg?.images || []}
                pdfUrl={msg?.pdfUrl}
                pdfTitle={msg?.pdfTitle}
                pptUrl={msg?.pptUrl}
                pptTitle={msg?.pptTitle}
              />
            </div>
          ))}

          {isLoading && <LoadingAnimation />}
        </div>
      )}

      <div ref={bottemRef} />
    </div>
  );
};

export default MessageList;
