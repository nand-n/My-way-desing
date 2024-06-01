'use client';
import { useEffect, useState } from 'react';
import Table from '../Common/GenericTable';
import { StockItem } from '@prisma/client';
import { Button, Modal, message, Popover } from 'antd';
import { PlusCircleOutlined, MoreOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useStockStore } from '@/store/stockItemStore';
import StockItemModal from './Modals/StockItemModal';
import AssignModal from './Modals/AssignModal';

const StockItems = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAssignModalVisible, setIsAssignModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<StockItem | null>(null);
  const [popoverVisible, setPopoverVisible] = useState<number | string | null>(null);

  const stockItems = useStockStore((state) => state.stockItems);
  const searchQuery = useStockStore((state) => state.searchQuery);
  const setSearchQuery = useStockStore((state) => state.setSearchQuery);
  const filteredStockItems = useStockStore((state) => state.filteredStockItems);
  const setFilteredStockItems = useStockStore((state) => state.setFilteredStockItems);
  const currentPage = useStockStore((state) => state.currentPage);
  const setCurrentPage = useStockStore((state) => state.setCurrentPage);
  const itemsPerPage = useStockStore((state) => state.itemsPerPage);
  const fetchStockItems = useStockStore((state) => state.fetchStockItems);
  const addStockItem = useStockStore((state) => state.addStockItem);
  const updateStockItem = useStockStore((state) => state.updateStockItem);
  const deleteStockItem = useStockStore((state) => state.deleteStockItem);
  const assignStockItem = useStockStore((state) => state.assignStockItem);
  const fetchStockAreas = useStockStore((state) => state.fetchStockAreas);


  useEffect(() => {
    fetchStockItems();
    fetchStockAreas()
  }, []);

  useEffect(() => {
    const lowerCaseQuery = searchQuery?.toLowerCase();
    const filtered = stockItems.filter((item) =>
      item?.name?.toLowerCase()?.includes(lowerCaseQuery) ||
      item?.description?.toLowerCase()?.includes(lowerCaseQuery) ||
      item?.category?.toLowerCase()?.includes(lowerCaseQuery)
    );
    setFilteredStockItems(filtered);
    setCurrentPage(1);
  }, [searchQuery]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStockItems = filteredStockItems?.slice(indexOfFirstItem, indexOfLastItem);

  const handleMenuClick = (item: StockItem) => {
    setSelectedItem(item);
  };

  const handleAssign = async (address: string) => {
    if (selectedItem) {
      try {
        await assignStockItem(selectedItem.id, address);
      } catch (error) {
        console.error('Error assigning item:', error);
      }
    }
  };

  const handleUpdate = async (item: Omit<StockItem, 'id'>) => {
    if (selectedItem) {
      try {
        await updateStockItem({ ...selectedItem, ...item });
        setSelectedItem(null);
        setIsModalVisible(false);
      } catch (error) {
        console.error('Error updating item:', error);
      }
    }
  };

  const handleDelete = async (id: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this stock item?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await deleteStockItem(id);
        } catch (error) {
          console.error('Error deleting item:', error);
        }
      },
    });
  };

  const columns = [
    { header: 'Image', accessor: (item: StockItem) => item.image, isImage: true },
    { header: 'Name', accessor: (item: StockItem) => item.name },
    { header: 'Description', accessor: (item: StockItem) => item.description },
    { header: 'Area', accessor: (item: StockItem) => item.area },
    { header: 'Category', accessor: (item: StockItem) => item.category },
    { header: 'Quantity', accessor: (item: StockItem) => item.quantity },
    { header: 'Price', accessor: (item: StockItem) => item.price },
    {
      header: 'Actions',
      accessor: (item: StockItem) => (
        <Popover
          content={
            <div className='grid gap-2'>
              <Button onClick={() => setIsAssignModalVisible(true)}>Assign</Button>
              <Button onClick={() => { setSelectedItem(item); setIsModalVisible(true); }}>Update</Button>
              <Button onClick={() => handleDelete(item.id)}>Delete</Button>
            </div>
          }
          trigger="click"
          open={popoverVisible === item.id}
          onOpenChange={(visible) => setPopoverVisible(visible ? item.id : null)}
        >
          <Button icon={<MoreOutlined />} onClick={() => handleMenuClick(item)} />
        </Popover>
      ),
    },
  ];

  return (
    <>
      <div className="grid items-center justify-end mb-4 gap-2">
        <Button icon={<PlusCircleOutlined />} type="primary" onClick={() => setIsModalVisible(true)}>
          Add Stock Item
        </Button>
      </div>
      <Table
        data={currentStockItems}
        columns={columns}
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
        totalItems={filteredStockItems.length}
      />
      <StockItemModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        initialValues={selectedItem || undefined}
        onSubmit={selectedItem ? handleUpdate : addStockItem}
      />
      {selectedItem && (
        <AssignModal
          isVisible={isAssignModalVisible}
          onClose={() => setIsAssignModalVisible(false)}
          onAssign={handleAssign}
        />
      )}
    </>
  );
};

export default StockItems;
