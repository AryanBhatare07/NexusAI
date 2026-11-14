import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    messages: [],
    isChatStarted: false,
    artifacts: [],
    isLoading: false,
  },
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setChatStarted: (state, action) => {
      state.isChatStarted = action.payload;
    },
    setArtifacts: (state, action) => {
      state.artifacts = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setMessages,
  addMessage,
  setChatStarted,
  setArtifacts,
  setIsLoading,
} = messageSlice.actions;
export default messageSlice.reducer;
