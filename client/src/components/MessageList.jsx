import { useSelector } from "react-redux";
import MessageBubble from "./MessageBubble";
import LoadingAnimation from "./LoadingAnimation";
import { useRef } from "react";
import { useEffect } from "react";
import { BrainCircuit, Sparkles } from "lucide-react";

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
        <div className="min-h-full flex flex-col items-center justify-center gap-7 text-center px-4">
          <div className="flex flex-col items-center gap-4">
            <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-indigo-400/20 shadow-[0_0_35px_rgba(99,102,241,0.15)]">
              <BrainCircuit size={30} className="text-indigo-300" />
              <div className="absolute inset-0 rounded-2xl bg-indigo-400/10 blur-xl -z-10" />
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-semibold tracking-tight text-white">
                Meet{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-violet-300">
                  NexusAI
                </span>
              </h1>

              <p className="text-sm md:text-base font-medium text-slate-300">
                What would you like to create today?
              </p>

              <p className="text-xs md:text-sm text-slate-500 max-w-[300px] leading-relaxed">
                Your ideas, questions, and projects start here. Let's build
                something amazing.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2.5 max-w-[420px]">
            {[
              "Write a Netflix clone",
              "Explain Redis",
              "Build a dashboard",
            ].map((s, i) => (
              <button
                key={i}
                className="text-xs md:text-sm text-slate-400
        bg-white/[0.035] border border-white/[0.08]
        px-4 py-2.5 rounded-xl
        hover:bg-indigo-500/10 hover:text-indigo-200
        hover:border-indigo-400/25
        hover:-translate-y-0.5
        active:scale-95
        transition-all duration-200 cursor-pointer"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-5 w-full">
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
