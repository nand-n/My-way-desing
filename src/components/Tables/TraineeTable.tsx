import React from 'react';
import { Table, Button, Space, Popconfirm, message } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { TraineeSchema } from '@/store/traineeSchema';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

interface TraineeTableProps {
  trainees: TraineeSchema[];
  onEdit: (trainee: TraineeSchema) => void;
  onDelete: (id: string) => void;
}

const TraineeTable: React.FC<TraineeTableProps> = ({ trainees, onEdit, onDelete }) => {
  const columns: ColumnsType<TraineeSchema> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Education',
      dataIndex: 'education',
      key: 'education',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Account Number',
      dataIndex: 'accountNumber',
      key: 'accountNumber',
    },
    {
      title: 'Bank Type',
      dataIndex: 'bankType',
      key: 'bankType',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record: TraineeSchema) => (
        <Space size="middle">
          <Button type="link" onClick={() => onEdit(record)}>
          <EditOutlined />
          </Button>
          <Popconfirm
            title="Are you sure to delete this trainee?"
            onConfirm={() => {
              if (record.id) {
                onDelete(record.id);
              } else {
                console.error('ID is undefined');
                message.error("ID is undefined")
              }
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
            <DeleteOutlined />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return <Table  style={ {overflowX: 'auto'}}
  
  rootClassName='bg-white text-black dark:bg-dark dark:text-white'  className='bg-white text-black dark:bg-dark dark:text-white' columns={columns} dataSource={trainees} rowKey="id" />;
};

export default TraineeTable;
