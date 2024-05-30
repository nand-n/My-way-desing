'use client';
import { ReactNode } from 'react';

interface Column<T> {
  header: string;
  accessor: (item: T) => ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchQuery: string;
  onSearch: (query: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
  totalItems: number;
}

const Table = <T,>({
  data,
  columns,
  searchQuery,
  onSearch,
  currentPage,
  setCurrentPage,
  itemsPerPage,
  totalItems,
}: TableProps<T>) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="rounded-sm border border-stroke bg-white dark:bg-black px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => onSearch(e.target.value)}
        className="mb-4 p-2 border rounded"
      />

      <div className="flex flex-col">
        <div className="grid grid-cols-5  rounded-sm items-start dark:bg-black sm:grid-cols-5 border-y-2">
          {columns.map((col, index) => (
            <div key={index} className="p-2.5 xl:p-5 border-x">
              <h5 className="text-sm font-medium uppercase xsm:text-base">{col.header}</h5>
            </div>
          ))}
        </div>
        {data.map((item, index) => (
          <div
            key={index}
            className={`grid grid-cols-5 sm:grid-cols-5 border-b ${
              index === data.length - 1 ? '' : 'border-b border-stroke dark:border-dark-3'
            }`}
          >
            {columns.map((col, colIndex) => (
              <div key={colIndex} className="flex items-start p-2.5 xl:p-5 border-x">
                <p className="text-black dark:text-white">{col.accessor(item)}</p>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="flex justify-between my-6">
        <button
          onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="p-2 border rounded disabled:opacity-50"
        >
          {"<"}
        </button>
        <span className="self-center">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="p-2 border rounded disabled:opacity-50"
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default Table;
