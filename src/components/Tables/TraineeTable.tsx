import React from 'react';
import { Table, Button, Space, Popconfirm } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { TraineeSchema } from '@/store/traineeSchema';

interface TraineeTableProps {
  trainees: TraineeSchema[];
  onEdit: (trainee: TraineeSchema) => void;
  onDelete: (id: number) => void;
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
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this trainee?"
            onConfirm={() => onDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return <Table columns={columns} dataSource={trainees} rowKey="id" />;
};

export default TraineeTable;
