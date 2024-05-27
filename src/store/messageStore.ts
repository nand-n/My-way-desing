// import create from 'zustand';
// import { messageSchema } from './messageSchema';

// interface MessageStore {
//   searchQuery: string;
//   setSearchQuery: (query: string) => void;
//   filteredMessages: messageSchema[];
//   setFilteredMessages: (messages: messageSchema[]) => void;
// }

// export const useMessageStore = create<MessageStore>((set) => ({
//   searchQuery: '',
//   setSearchQuery: (query) => set({ searchQuery: query }),
//   filteredMessages: [],
//   setFilteredMessages: (messages) => set({ filteredMessages: messages }),
// }));


import create from 'zustand';
import { messageSchema } from './messageSchema';

interface MessageStore {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredMessages: messageSchema[];
  setFilteredMessages: (messages: messageSchema[]) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  messagesPerPage: number;
  setMessagesPerPage: (count: number) => void;
}

export const useMessageStore = create<MessageStore>((set) => ({
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  filteredMessages: [],
  setFilteredMessages: (messages) => set({ filteredMessages: messages }),
  currentPage: 1,
  setCurrentPage: (page) => set({ currentPage: page }),
  messagesPerPage: 10,
  setMessagesPerPage: (count) => set({ messagesPerPage: count }),
}));
