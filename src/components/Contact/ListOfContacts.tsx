'use client';
import { useEffect, useState } from 'react';
import Table from '../Common/GenericTable';
import { Message } from '@prisma/client';
import { messageSchema } from '@/store/messageSchema';
import { useMessageStore } from '@/store/messageStore';
import axios from 'axios';

const ListofContacts = () => {
  const [messages, setMessages] = useState<messageSchema[]>([]);
  const searchQuery = useMessageStore((state: { searchQuery: any; }) => state.searchQuery);
  const setSearchQuery = useMessageStore((state: { setSearchQuery: any; }) => state.setSearchQuery);
  const filteredMessages = useMessageStore((state: { filteredMessages: any; }) => state.filteredMessages);
  const setFilteredMessages = useMessageStore((state: { setFilteredMessages: any; }) => state.setFilteredMessages);
  const currentPage = useMessageStore((state: { currentPage: any; }) => state.currentPage);
  const setCurrentPage = useMessageStore((state: { setCurrentPage: any; }) => state.setCurrentPage);
  const messagesPerPage = useMessageStore((state: { messagesPerPage: any; }) => state.messagesPerPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<messageSchema[]>('/api/send-email');
        setMessages(response.data);
        setFilteredMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    fetchData();
  }, [setFilteredMessages]);

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = messages.filter((message) =>
      message.fullName.toLowerCase().includes(lowerCaseQuery) ||
      message.email.toLowerCase().includes(lowerCaseQuery) ||
      message.phone.toLowerCase().includes(lowerCaseQuery) ||
      message.message.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredMessages(filtered);
    setCurrentPage(1);
  }, [searchQuery, messages]);

  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = filteredMessages.slice(indexOfFirstMessage, indexOfLastMessage);

  const columns = [
    { header: 'Full Name', accessor: (message: Message) => message.fullName },
    { header: 'Email', accessor: (message: Message) => message.email },
    { header: 'Phone', accessor: (message: Message) => message.phone },
    { header: 'Message', accessor: (message: Message) => message.message },
     ];

  return (
    <div className=''>
      <Table
        data={currentMessages}
        columns={columns}
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={messagesPerPage}
        totalItems={filteredMessages.length}
      />
    </div>
  );
};

export default ListofContacts;
