'use client';
import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from 'react';
import axios from 'axios';
import TableHeader from './TableHeader';
import { messageSchema } from '@/store/messageSchema';
import { useMessageStore } from '@/store/messageStore';

const TableOne = () => {
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
  }, [searchQuery, messages, setFilteredMessages, setCurrentPage]);

  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = filteredMessages.slice(indexOfFirstMessage, indexOfLastMessage);

  const totalPages = Math.ceil(filteredMessages.length / messagesPerPage);

  return (
    <div className="rounded-sm border border-stroke bg-white dark:bg-black px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold">Recieved Messages through contact up</h4>

      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4 p-2 border rounded"
      />

      <div className="flex flex-col">
        {/* <TableHeader /> */}
         <div className="grid grid-cols-3 rounded-sm  items-start dark:bg-black sm:grid-cols-4 border-y-2">
           <div className="p-2.5 xl:p-5 border-x">
             <h5 className="text-sm font-medium uppercase xsm:text-base">Full Name</h5>
           </div>
           <div className="p-2.5 text-start xl:p-5 border-r">
             <h5 className="text-sm font-medium uppercase xsm:text-base">Email</h5>
           </div>
           <div className="p-2.5 text-start xl:p-5 border-r">
             <h5 className="text-sm font-medium uppercase xsm:text-base">Phone</h5>
           </div>
           <div className="hidden p-2.5 text-start sm:block xl:p-5 border-r">
             <h5 className="text-sm font-medium uppercase xsm:text-base ">Message</h5>
           </div>
         </div>
        {currentMessages?.map((message: { fullName: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; email: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; phone: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; message: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }, index: Key | null | undefined) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-4 border-b ${
              index === currentMessages.length - 1 ? '' : 'border-b border-stroke dark:border-dark-3'
            }`}
            key={index}
          >
            <div className="flex items-start p-2.5 xl:p-5 border-x">
              <p className="text-black dark:text-white">{message?.fullName}</p>
            </div>
            <div className="flex items-center justify-start border-r p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{message?.email}</p>
            </div>
            <div className="flex items-center justify-start border-r p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{message?.phone}</p>
            </div>
            <div className="hidden items-center justify-start border-r  p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{message?.message}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between my-6">
        <button
          onClick={() => setCurrentPage((prev: number) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="p-2 border rounded disabled:opacity-50"
        >
          {"<"}
        </button>
        <span className="self-center">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => setCurrentPage((prev: number) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="p-2 border rounded disabled:opacity-50"
        >
        {">"}

        </button>
      </div>
    </div>
  );
};

export default TableOne;
