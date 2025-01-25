import { create } from "zustand";

const useConversation = create((set) => ({
  // Selected conversation
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) => set({ selectedConversation }),

  // All the conversations
  conversations: [],
  setConversations: (conversations) => set({ conversations }),

  // All the messages in the selected conversation
  messages: [],
  setMessages: (messages) => set({ messages }),

  // Send a new message to the selected conversation
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
}));

export default useConversation;
