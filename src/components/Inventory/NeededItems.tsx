'use client'
import { useEffect, useState } from 'react';
import { Button, Modal, message, Popover } from 'antd';
import { PlusCircleOutlined, MoreOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import AssignModal from './Modals/AssignModal';
import NeededItemModal from './Modals/NeededItemModal';
import Table from '../Common/GenericTable';
import { useNeededItemStore } from '@/store/neededITemStore';
import { Area, NeededItem } from '@prisma/client';

const NeededItems: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isAssignModalVisible, setIsAssignModalVisible] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<NeededItem | null>(null);
  const [popoverVisible, setPopoverVisible] = useState<string | null>(null);

  const neededItems: NeededItem[] = useNeededItemStore((state) => state.neededItems);
  const searchQuery: string = useNeededItemStore((state) => state.searchQuery);
  const setSearchQuery: (query: string) => void = useNeededItemStore((state) => state.setSearchQuery);
  const filteredNeededItems: NeededItem[] = useNeededItemStore((state) => state.filteredNeededItems);
  const setFilteredNeededItems: (items: NeededItem[]) => void = useNeededItemStore((state) => state.setFilteredNeededItems);
  const currentPage: number = useNeededItemStore((state) => state.currentPage);
  const setCurrentPage: (page: number) => void = useNeededItemStore((state) => state.setCurrentPage);
  const itemsPerPage: number = useNeededItemStore((state) => state.itemsPerPage);
  const fetchNeededItems: () => Promise<void> = useNeededItemStore((state) => state.fetchNeededItems);
  const addNeededItem: (item: Omit<NeededItem, 'id'>) => Promise<void> = useNeededItemStore((state) => state.addNeededItem);
  const updateNeededItem: (item: NeededItem) => Promise<void> = useNeededItemStore((state) => state.updateNeededItem);
  const deleteNeededItem: (id: string) => Promise<void> = useNeededItemStore((state) => state.deleteNeededItem);
  const assignNeededItem: (id: string, address: string) => Promise<void> = useNeededItemStore((state) => state.assignNeededItem);
  const fetchAreas: () => Promise<void> = useNeededItemStore((state) => state.fetchAreas);
  const areas: Area[] = useNeededItemStore((state) => state.areas);

  useEffect(() => {
    fetchNeededItems();
    fetchAreas();
  }, []);


  useEffect(() => {
    const lowerCaseQuery: string | undefined = searchQuery?.toLowerCase();
    const filtered: NeededItem[] = neededItems.filter((item) =>
      item?.name?.toLowerCase()?.includes(lowerCaseQuery) ||
      item?.priority?.toLowerCase()?.includes(lowerCaseQuery) ||
      item?.area?.toLowerCase()?.includes(lowerCaseQuery)
    );
    setFilteredNeededItems(filtered);
    setCurrentPage(1);
  }, [searchQuery]);

  const handleMenuClick = (item: NeededItem) => {
    setSelectedItem(item);
  };

  const handleAssign = async (address: string) => {
    if (selectedItem) {
      try {
        await assignNeededItem(selectedItem.id, address);
      } catch (error :any) {
        console.error('Error assigning item:', error);
        message.error('Error assigning item', error)
      }
    }
  };

  const handleUpdate = async (item: Omit<NeededItem, 'id'>) => {
    if (selectedItem) {
      try {
        await updateNeededItem({ ...selectedItem, ...item });
        setSelectedItem(null);
        setIsModalVisible(false);
      } catch (error) {
        console.error('Error updating item:', error);
      }
    }
  };

  const handleDelete = async (id: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this needed item?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await deleteNeededItem(id);
        } catch (error) {
          console.error('Error deleting item:', error);
        }
      },
    });
  };

  const columns = [
    { header: 'Name', accessor: (item: NeededItem) => item.name },
    { header: 'Priority', accessor: (item: NeededItem) => item.priority },
    { header: 'Area', accessor: (item: NeededItem) => item.area },
    { header: 'Quantity', accessor: (item: NeededItem) => item.quantity },
    { header: 'Price', accessor: (item: NeededItem) => item.price },
    {
      header: 'Actions',
      accessor: (item: NeededItem) => (
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
          Add Needed Item
        </Button>
      </div>
      <Table
        data={filteredNeededItems}
        columns={columns}
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
        totalItems={filteredNeededItems.length}
      />
      <NeededItemModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        initialValues={selectedItem || undefined}
        areas={areas}
        onSubmit={selectedItem ? handleUpdate : addNeededItem}
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

export default NeededItems;
