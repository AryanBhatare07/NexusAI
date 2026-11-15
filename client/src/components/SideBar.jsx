import { useEffect, useState, useRef } from "react";
import {
  Coins,
  LogOut,
  Menu,
  MessageSquare,
  PanelLeftIcon,
  PanelRight,
  PenSquare,
  Plus,
  User,
  X,
} from "lucide-react";
import { MoreHorizontal, Trash2 } from "lucide-react";
import { getConversationS } from "../features/getConversations";
import { useDispatch, useSelector } from "react-redux";
import {
  addConversation,
  setConversations,
  setConversationTitle,
  setSelectedConversation,
  removeConversation,
} from "../redux/conversationSlice";
import { createConversation } from "../features/createConversation";
import { deleteConversation } from "../features/deleteConversation";
import logout from "../features/logout";
import { setUserData } from "../redux/userSlice";
import { setChatStarted, setMessages } from "../redux/messageSlice";
import BillingDrawer from "./BillingDrawer";
import api from "../../utils/axios";

function SideBar() {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const [imageError, setImageError] = useState(false);
  const [showBilling, setShowBilling] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const menuRef = useRef(null);
  const { conversations, selectedConversation } = useSelector(
    (state) => state.conversation,
  );
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    const getConv = async () => {
      const data = await getConversationS();
      dispatch(setConversations(data));
    };
    getConv();
  }, [userData?._id]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCreateConversation = async () => {
    dispatch(setMessages([]));
    dispatch(setChatStarted(false));
    const data = await createConversation();

    if (data?._id) {
      dispatch(addConversation(data));
      dispatch(setSelectedConversation(data));
    }
  };

  const handleDeleteConversation = async (id) => {
    try {
      await api.delete(`/api/chat/delete-conversation/${id}`);

      dispatch(removeConversation(id));

      if (selectedConversation?._id === id) {
        dispatch(setMessages([]));
        dispatch(setChatStarted(false));
      }

      setOpenMenu(null);
    } catch (error) {
      console.log("Delete error:", error.response?.data || error);
    }
  };

  if (collapsed) {
    return (
      <div className="hidden lg:flex flex-col items-center w-[56px] h-screen bg-[#0d0f14] border-r border-white/[0.06] py-4 gap-1 shrink-0">
        <button
          className="flex items-center justify-center w-9 h-9 rounded-xl
            text-slate-500 hover:text-slate-200
            hover:bg-white/[0.05]
            transition-colors duration-150
            bg-transparent border-none cursor-pointer mb-1"
          onClick={() => setCollapsed(false)}
        >
          <PanelRight size={18} />
        </button>
        <button
          className="flex items-center justify-center w-9 h-9 rounded-xl
            text-slate-500 hover:text-slate-200
            hover:bg-white/[0.05]
            transition-colors duration-150
            bg-transparent border-none cursor-pointer"
          onClick={() => dispatch(setSelectedConversation(null))}
        >
          <Plus size={17} />
        </button>
        <div className="flex-1 overflow-y-auto px-2.5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pt-5">
          {conversations.map((conv, idx) => {
            const isActive = selectedConversation?._id === conv?._id;

            return (
              <div
                onClick={() => dispatch(setSelectedConversation(conv))}
                key={conv?._id || idx}
                className={`flex items-center gap-2.5 cursor-pointer mb-0.5 px-3 py-2.5
                rounded-[10px] border transition-colors duration-150
                ${isActive ? "bg-indigo-500/10 border-indigo-500/[0.18]" : "bg-transparent border-transparent"}`}
              >
                <div
                  className={`flex items-center justify-center shrink-0 w-[20px] h-[20px] rounded-lg transition-colors duration-150 ${isActive ? "bg-indigo-500/15 text-indigo-400" : "bg-white/[0.05] text-slate-500"}`}
                >
                  <MessageSquare size={13} />
                </div>
              </div>
            );
          })}
        </div>

        <div className="relative shrink-0">
          {userData?.avatar && !imageError ? (
            <img
              className="w-9 h-9 rounded-[10px] object-cover border-2 border-indigo-500/25"
              src={userData.avatar}
              alt="User Avatar"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-9 h-9 rounded-[10px] flex items-center justify-center bg-white/[0.06]">
              <User size={15} className="text-slate-400" />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-3.5 left-4 z-50 flex items-center justify-center w-8 h-8 rounded-lg bg-[#0d0f14] border border-white/[0.06] text-slate-400 hover:text-slate-200 transition-colors duration-150 cursor-pointer"
      >
        <Menu size={14} />
      </button>

      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        />
      )}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-50
        w-[270px] h-screen shrink-0
        bg-[#0d0f14] border-r border-white/[0.06]
        transition-transform duration-300
        ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-2.5 px-4 py-4 border-b border-white/[0.06]">
            <div
              onClick={() => setCollapsed(true)}
              className="hidden lg:flex items-center justify-center w-7 h-7 rounded-lg text-slate-500
            hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent
            border-none cursor-pointer"
            >
              <PanelLeftIcon />
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="lg:hidden flex items-center justify-center w-7 h-7 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent border-none cursor-pointer"
            >
              <X />
            </button>
            <button
              onClick={() => window.location.reload()}
              className="text-[16px] font-semibold text-slate-100 tracking-tight flex-1 text-left cursor-pointer hover:text-indigo-400 transition-colors"
            >
              NexusAI
            </button>
            <span className="text-[10px] font-medium text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full tracking-wide">
              {userData?.plan.toUpperCase()}
            </span>
            <button
              className="flex items-center justify-center w-7 h-7 rounded-lg text-slate-500
            hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent
            border-none cursor-pointer"
              onClick={() => dispatch(setSelectedConversation(null))}
            >
              <PenSquare size={14} />
            </button>
          </div>

          <div className="px-4 pt-4 pb-1">
            <button
              className="w-full flex items-center justify-center gap-2 text-sm font-medium text-white
            bg-linear-to-br from-indigo-500 to-violet-700 rounded-xl py-[10px] border-none cursor-pointer
            hover:opacity-90 transition-opacity duration-150"
              onClick={handleCreateConversation}
            >
              <Plus size={15} />
              New Chat
            </button>
          </div>

          {conversations.length === 0 ? (
            <div className="px-5 pt-4 pb-1.5 text-[10.5px] font-semibold uppercase tracking-widest text-slate-600">
              No Recent Conversation
            </div>
          ) : (
            <div className="px-5 pt-4 pb-1.5 text-[10.5px] font-semibold uppercase tracking-widest text-slate-600">
              Recents
            </div>
          )}

          <div
            ref={menuRef}
            className="flex-1 overflow-y-auto px-2.5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {conversations.map((conv, idx) => {
              const isActive = selectedConversation?._id === conv?._id;

              return (
                <div
                  onClick={() => {
                    dispatch(setSelectedConversation(conv));
                    setMobileOpen(false);
                    setOpenMenu(null);
                  }}
                  key={conv?._id || idx}
                  className={`group flex items-center gap-2.5 cursor-pointer mb-0.5 px-3 py-2.5
                  rounded-[10px] border transition-colors duration-150
                  ${isActive ? "bg-indigo-500/10 border-indigo-500/[0.18]" : "bg-transparent border-transparent"}`}
                >
                  <div
                    className={`flex items-center justify-center shrink-0 w-[28px] h-[28px] rounded-lg transition-colors duration-150 ${isActive ? "bg-indigo-500/15 text-indigo-400" : "bg-white/[0.05] text-slate-500"}`}
                  >
                    <MessageSquare size={13} />
                  </div>
                  <span
                    className={`text-[13px] font-medium truncate ${isActive ? "text-slate-100" : "text-slate-300"}`}
                  >
                    {conv?.title || "New Chat"}
                  </span>
                  <div className="relative ml-auto">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenu(openMenu === conv._id ? null : conv._id);
                      }}
                      className={`flex items-center justify-center w-7 h-7 rounded-lg
    text-slate-400 hover:bg-white/10 transition-all
    opacity-0 group-hover:opacity-100
    ${isActive ? "max-lg:opacity-100" : "max-lg:opacity-100"}`}
                    >
                      <MoreHorizontal size={17} />
                    </button>

                    {openMenu === conv._id && (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="absolute right-0 top-8 z-50 w-36 p-1
      rounded-xl bg-[#1b1d26] border border-white/10 shadow-xl"
                      >
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();

                            console.log("Delete clicked:", conv._id);

                            setOpenMenu(null);
                            handleDeleteConversation(conv._id);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2
  rounded-lg text-sm text-red-400 hover:bg-red-500/10
  cursor-pointer"
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mx-2.5 border-t border-white/[0.06]">
            <div className="px-3.5 py-3.5">
              {userData ? (
                <div className="flex items-center gap-2.5 cursor-pointer rounded-xl px-3 py-2.5 hover:bg-white/[0.05] transition-colors duration-150">
                  <div className="relative shrink-0">
                    {userData?.avatar && !imageError ? (
                      <img
                        className="w-9 h-9 rounded-[10px] object-cover border-2 border-indigo-500/25"
                        src={userData.avatar}
                        alt="User Avatar"
                        onError={() => setImageError(true)}
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-[10px] flex items-center justify-center bg-white/[0.06]">
                        <User size={15} className="text-slate-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13.5px] font-semibold text-slate-100 truncate">
                      {userData?.name || "User"}
                    </p>
                    <p className="text-[11px] text-slate-600 mt-px">
                      {`${userData?.plan}` || "free"}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <button
                      className="flex items-center justify-center w-7 h-7 rounded-[7px]
                    text-yellow-600 cursor-pointer
                    border-none bg-transparent
                    hover:text-slate-400
                    hover:bg-white/[0.08]
                    transition-all duration-150"
                      onClick={() => setShowBilling(true)}
                    >
                      <Coins size={16} />
                    </button>
                    <button
                      className="flex items-center justify-center w-7 h-7 rounded-[7px]
                    border border-red-500/20 bg-red-500/10
                    text-red-400 cursor-pointer
                    hover:bg-red-500/20 hover:text-red-300
                    hover:border-red-500/30
                    transition-all duration-200"
                      onClick={() => {
                        logout();
                        dispatch(setUserData(null));
                      }}
                    >
                      <LogOut size={16} />
                    </button>
                  </div>
                </div>
              ) : (
                <button></button>
              )}
            </div>
          </div>
        </div>
      </div>
      <BillingDrawer open={showBilling} onClose={() => setShowBilling(false)} />
    </>
  );
}

export default SideBar;
