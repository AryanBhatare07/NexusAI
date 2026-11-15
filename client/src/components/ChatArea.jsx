import { useEffect } from "react";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import getMessages from "../features/getMessages";
import {
  setArtifacts,
  setChatStarted,
  setMessages,
} from "../redux/messageSlice";

function ChatArea() {
  const { selectedConversation } = useSelector((state) => state.conversation);
  const dispatch = useDispatch();
  useEffect(() => {
    let ignore = false;

    const getMesg = async () => {
      if (!selectedConversation?._id) {
        dispatch(setMessages([]));
        dispatch(setArtifacts([]));
        dispatch(setChatStarted(false));
        return;
      }

      if (selectedConversation.title === "New Chat") {
        dispatch(setMessages([]));
        dispatch(setArtifacts([]));
        return;
      }

      const data = await getMessages(selectedConversation._id);

      const messages = data || [];

      const latestArtifactMessage = [...messages]
        .reverse()
        .find((msg) => msg.artifacts?.length > 0);

      dispatch(setArtifacts(latestArtifactMessage?.artifacts || []));
      dispatch(setMessages(messages));

      if (!ignore) {
        dispatch(setChatStarted(true));
      }
    };

    getMesg();

    return () => {
      ignore = true;
    };
  }, [selectedConversation?._id, dispatch]);

  return (
    <div className="flex-1 min-w-0 h-full flex flex-col overflow-hidden">
      <Navbar />

      <div className="flex-1 min-h-0 flex flex-col">
        <MessageList />
      </div>

      <div className="shrink-0 w-full">
        <ChatInput />
      </div>
    </div>
  );
}

export default ChatArea;
