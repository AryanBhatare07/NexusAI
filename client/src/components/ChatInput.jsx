import { useState } from "react";
import {
  ArrowUp,
  Code2,
  FileText,
  Globe,
  ImageIcon,
  MessageSquare,
  Mic,
  Paperclip,
  Presentation,
  X,
  Zap,
} from "lucide-react";
import sendMessage from "../features/sendMessage";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";
import {
  addMessage,
  setArtifacts,
  setChatStarted,
  setIsLoading,
} from "../redux/messageSlice";
import { createConversation } from "../features/createConversation";
import {
  addConversation,
  setConversationTitle,
  setSelectedConversation,
} from "../redux/conversationSlice";
import { updateConversation } from "../features/updateConversation";
import getCurrentUser from "../features/getCurrentUser";
import { useRef } from "react";

const ChatInput = () => {
  const [value, setValue] = useState("");
  const [selectedAgent, setSelectedAgent] = useState("Auto");
  const { selectedConversation } = useSelector((state) => state.conversation);
  const { userData } = useSelector((state) => state.user);
  const { messages, isLoading } = useSelector((state) => state.message);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const handleSendMessage = async () => {
    dispatch(setIsLoading(true))
    setSelectedFile(null);
    if (!value.trim()) return;
    let conversation = selectedConversation;
    if (!conversation) {
      const conv = await createConversation();
      if (!conv?._id) return;
      dispatch(addConversation(conv));
      dispatch(setSelectedConversation(conv));
      conversation = conv;
    }

    dispatch(setChatStarted(true));
    if (conversation.title === "New Chat") {
      await updateConversation({ id: conversation?._id, title: value.trim() });
      dispatch(
        setConversationTitle({
          conversationId: conversation?._id,
          title: value.slice(0, 40),
        }),
      );
    }
    const formData = new FormData();
    formData.append("prompt", value.trim());
    formData.append("conversationId", conversation?._id);
    formData.append("agent", selectedAgent.toLowerCase());
    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    dispatch(addMessage({ role: "user", content: value.trim() }));
    setValue("");

    try {
      const data = await sendMessage(formData);
      dispatch(setIsLoading(false))
      if (!data) {
        console.error("No response received from server");
        return;
      }

      const updatedUser = await getCurrentUser();

      if (updatedUser) {
        dispatch(setUserData(updatedUser));
      }

      if (data.credits !== undefined) {
        dispatch(
          setUserData({
            ...userData,
            credits: data.credits,
          }),
        );
      }

      dispatch(setArtifacts(data.artifacts || []));

      dispatch(
        addMessage({
          role: "assistant",
          content: data.answer,
          images: data.images,
          pdfUrl: data.pdfUrl,
          pdfTitle: data.pdfTitle,
          pptUrl: data.pptUrl,
          pptTitle: data.pptTitle,
        }),
      );
      console.log(data);
    } catch (error) {
      console.error("Message sending failed:", error);
    }
  };

  const agents = [
    {
      id: "auto",
      icon: Zap,
      label: "Auto",
    },
    {
      id: "chat",
      icon: MessageSquare,
      label: "Chat",
    },
    {
      id: "coding",
      icon: Code2,
      label: "Coding",
    },
    {
      id: "pdf",
      icon: FileText,
      label: "PDF",
    },
    {
      id: "ppt",
      icon: Presentation,
      label: "PPT",
    },
    {
      id: "image",
      icon: ImageIcon,
      label: "Vision",
    },
    {
      id: "search",
      icon: Globe,
      label: "Search",
    },
  ];
  return (
    <div className="w-full overflow-hidden px-3 md:px-5 py-4 border-t border-white/[0.06] bg-[#0d0f14]">
      <div className="flex flex-col gap-2 bg-white/[0.03] border border-white/[0.07] rounded-2xl px-4 pt-3.5 pb-3">
        <div className="flex w-[80%] gap-2 pr-2 flex-wrap">
          {agents.map((agent, i) => {
            const isActive = selectedAgent === agent.label;
            const Icon = agent.icon;
            return (
              <div
                key={i}
                onClick={() => setSelectedAgent(agent.label)}
                className={`cursor-pointer shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-500 to-violet-600 text-white border-transparent shadow-[0_1px_8px_rgba(99,102,241,.35)]"
                    : "bg-white/[0.03] text-slate-400 border-white/[0.06] hover:bg-white/[0.07]"
                }`}
              >
                <Icon
                  size={14}
                  className={isActive ? "text-white" : "text-slate-500"}
                />
                {agent.label}
              </div>
            );
          })}
        </div>

        {selectedFile && (
          <div className="my-3">
            <div className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-[#171c29] p-3 shadow-lg">
              {selectedFile.type === "application/pdf" ? (
                <>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 border border-red-500/20">
                    <FileText size={25} className="text-red-400" />
                  </div>

                  <div className="min-w-0">
                    <p className="max-w-[200px] truncate text-sm font-medium text-white">
                      {selectedFile.name}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      PDF Document · {(selectedFile.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </>
              ) : selectedFile.type.startsWith("image/") ? (
                <>
                  <img
                    src={URL.createObjectURL(selectedFile)}
                    alt="Selected image"
                    className="h-14 w-14 rounded-xl object-cover border border-white/10"
                  />

                  <div className="min-w-0">
                    <p className="max-w-[200px] truncate text-sm font-medium text-white">
                      {selectedFile.name}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      Image · {(selectedFile.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </>
              ) : null}

              <button
                type="button"
                onClick={() => setSelectedFile(null)}
                className="ml-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-400 hover:bg-white/10 hover:text-white transition"
              >
                <X size={17} />
              </button>
            </div>
          </div>
        )}

        <textarea
          placeholder="Ask Anything..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
          className="w-full bg-transparent outline-none border-none resize-none text-[14px] text-slate-200 placeholder:text-slate-600  leading-relaxed [scrollbar-width:none] [&::-webkit-scrollbar]:hidden  disabled:opacity-50"
          rows={3}
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <input
              type="file"
              accept=".pdf,image/*"
              hidden
              ref={fileRef}
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setSelectedFile(file);
                }
              }}
            />
            <button
              onClick={() => fileRef.current.click()}
              className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-600 hover:text-slate-300 hover:bg-white/[0.05] border border-transparent hover:border-white/[0.06] transition-all duration-150 bg-transparent cursor-pointer"
            >
              <Paperclip size={16} />
            </button>
            <button className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-600 hover:text-slate-300 hover:bg-white/[0.05] border border-transparent hover:border-white/[0.06] transition-all duration-150 bg-transparent cursor-pointer">
              <Mic size={16} />
            </button>
          </div>
          <button
          disabled={!value && isLoading}
            onClick={handleSendMessage}
            disabled={!value.trim()}
            className={`flex items-center justify-center w-9 h-9 rounded-xl text-white border-none transition-all duration-150 ${value.trim() ? "bg-linear-to-br from-indigo-500 to-violet-700 cursor-pointer hover:opacity-90 shadow-md shadow-indigo-500/20" : "bg-white/[0.06] text-slate-600 cursor-default"}`}
          >
            <ArrowUp size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
