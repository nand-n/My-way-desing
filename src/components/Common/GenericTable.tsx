'use client';
import { ReactNode } from 'react';
import CldImage from './CldImage';

interface Column<T> {
  header: string;
  accessor: (item: T) => ReactNode;
  isImage?: boolean;
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
  const gridTemplateColumns = `repeat(${columns.length}, minmax(0, 1fr))`;

  return (
    <div className="rounded-sm border border-stroke text-black dark:text-white bg-white dark:bg-black px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => onSearch(e.target.value)}
        className="mb-4 p-2 border rounded"
      />

      <div>
        <div
          className="grid rounded-sm items-start dark:bg-black text-black dark:text-white border-y-2"
          style={{ gridTemplateColumns }}
        >
          {columns.map((col, index) => (
            <div key={index} className="p-2.5 xl:p-5 border-x">
              <h5 className="text-sm font-medium uppercase xsm:text-base ">{col.header}</h5>
            </div>
          ))}
        </div>
        {data.map((item, rowIndex) => (
          <div
            key={rowIndex}
            className={`grid border-b transition duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer ${rowIndex === data.length - 1 ? '' : 'border-b border-stroke dark:border-dark-3'}`}
            style={{ gridTemplateColumns }}
          >
            {columns.map((col, colIndex) => (
              <div key={colIndex} className={`flex items-center justify-start p-2.5 xl:p-5 border-x ${col.isImage ? 'justify-center' : ''}`}>
                {col.isImage ? (
                  <CldImage crop={"auto"} width={50} height={50} src={col.accessor(item) as string} alt="Uploaded Image" />
                ) : (
                  <p className="text-black dark:text-white">{col.accessor(item)}</p>
                )}
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
