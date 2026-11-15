import { MessageSquare, Code2 } from "lucide-react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { selectedConversation } = useSelector((state) => state.conversation);

  const { messages, isChatStarted, artifacts } = useSelector(
    (state) => state.message,
  );

  return (
    <>
      {selectedConversation?._id && isChatStarted && (
        <div className="h-14 flex items-center gap-2.5 pl-14 pr-3 md:px-5 border-b border-white/[0.06] bg-[#0d0f14] shrink-0">
          <div className="hidden md:flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 shrink-0">
            <MessageSquare size={13} className="text-indigo-400" />
          </div>

          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            <div className="text-[13px] md:text-[14px] font-semibold text-slate-100 tracking-tight truncate">
              {selectedConversation?.title || "New Chat"}
            </div>

            <div className="text-[10px] font-medium text-slate-600 bg-white/[0.04] border border-white/[0.06] px-2 py-0.5 rounded-full whitespace-nowrap shrink-0">
              {messages?.length} Messages
            </div>
          </div>

          {artifacts?.length > 0 && (
            <button
              onClick={() => window.dispatchEvent(new Event("open-artifact"))}
              className="lg:hidden flex items-center gap-1.5 px-2.5 py-2 rounded-lg bg-indigo-600 text-white text-[11px] font-medium whitespace-nowrap shrink-0 ml-auto"
            >
              <Code2 size={13} />
              View Code
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
