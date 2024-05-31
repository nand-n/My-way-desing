'use client';
import { useEffect, useState } from 'react';
import Table from '../Common/GenericTable';
import { Dates } from '@prisma/client';
import { Button, Popconfirm } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import DateModal from './DateModal';
import { useDatesSettingStore } from '@/store/dateSettingsStore';

const DateSettings = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState<Dates | null>(null);

  const dates = useDatesSettingStore((state) => state.filteredDates);
  const searchQuery = useDatesSettingStore((state) => state.searchQuery);
  const setSearchQuery = useDatesSettingStore((state) => state.setSearchQuery);
  const setFilteredDates = useDatesSettingStore((state) => state.setFilteredDate);
  const currentPage = useDatesSettingStore((state) => state.currentPage);
  const setCurrentPage = useDatesSettingStore((state) => state.setCurrentPage);
  const datesPerPage = useDatesSettingStore((state) => state.datesParPage);
  const fetchDates = useDatesSettingStore((state) => state.fetchDates);
  const deleteDate = useDatesSettingStore((state) => state.deleteDates);
  const updateDate = useDatesSettingStore((state) => state.updateDate);
  const addDates = useDatesSettingStore((state) => state.addDates);

  useEffect(() => {
    fetchDates();
  }, []);

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = dates.filter((date) =>
      date.name.toLowerCase().includes(lowerCaseQuery) 
    );
    setFilteredDates(filtered);
    setCurrentPage(1);
  }, [searchQuery,fetchDates]);

  const indexOfLastDate = currentPage * datesPerPage;
  const indexOfFirstDate = indexOfLastDate - datesPerPage;
  const currentDates = dates.slice(indexOfFirstDate, indexOfLastDate);

  const handleEdit = (date: Dates) => {
    setCurrentDate(date);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    await deleteDate(id);
  };

  const handleSubmit = async (date: Omit<Dates, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }) => {
    if (currentDate) {
      await updateDate(currentDate.id, date);
    } else {
      await addDates(date);
    }
    setIsModalVisible(false);
    setCurrentDate(null);
  };


  const columns = [
    { header: 'Name', accessor: (date: Dates) => date.name },
    { header: 'Start Date', accessor: (date: Dates) => new Date(date.start).toDateString() },
    { header: 'End Date', accessor: (date: Dates) => new Date(date.end).toDateString() },
    {
      header: 'Actions',
      accessor: (date: Dates) => (
        <>
          <Button onClick={() => handleEdit(date)}>Edit</Button>
          <Popconfirm
            title="Are you sure you want to delete this date?"
            onConfirm={() => handleDelete(date.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="grid items-center justify-start gap-2">
        <Button icon={<PlusCircleOutlined />} type="primary" onClick={() => setIsModalVisible(true)}>
          Add Date
        </Button>
      </div>
      <Table
        data={currentDates}
        columns={columns}
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={datesPerPage}
        totalItems={dates.length}
      />
      <DateModal
        isVisible={isModalVisible}
        onClose={() => {
          setIsModalVisible(false);
          setCurrentDate(null);
        }}
        dateToEdit={currentDate}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default DateSettings;
