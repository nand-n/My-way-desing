'use client'
import { Area , NeededItem} from '@prisma/client';
import { Modal, Form, Input, Select, Button } from 'antd';
import { useEffect } from 'react';

const { Option } = Select;

interface NeededItemInterface {
  id?: string;
  name: string;
  priority: string;
  quantity: number;
  area: string;
  price: number;
}

interface NeededItemModalProps {
  isVisible: boolean;
  onClose: () => void;
  initialValues?: NeededItem;
  areas:Area[];
  onSubmit: (values: Omit<NeededItem, 'id'>) => Promise<void>;
}


const NeededItemModal: React.FC<NeededItemModalProps> = ({ isVisible, onClose, initialValues, onSubmit , areas }) => {
  const [form] = Form.useForm();


  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [form, initialValues]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onSubmit({...values} as Omit<NeededItem, 'id'> );
      form.resetFields();
      onClose();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  return (
    <Modal
      title={initialValues ? 'Update Needed Item' : 'Add Needed Item'}
      open={isVisible}
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
      footer={[
        <Button key="cancel" onClick={() => {
          form.resetFields();
          onClose();
        }}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          {initialValues ? 'Update' : 'Add'}
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please enter the name of the needed item' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="priority"
          label="Priority"
          rules={[{ required: true, message: 'Please select the priority of the needed item' }]}
        >
          <Select>
            <Option value="LOW">Low</Option>
            <Option value="MEDIUM">Medium</Option>
            <Option value="HIGH">High</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="quantity"
          label="Quantity"
          rules={[{ required: true, message: 'Please enter the quantity of the needed item' }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="area"
          label="Area"
          rules={[{ required: true, message: 'Please select the area for the needed item' }]}
        >
          <Select>
            {areas?.map((area) => (
              <Option key={area.id} value={area.name}>{area.name}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: 'Please enter the price of the needed item' }]}
        >
          <Input type="number" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NeededItemModal;
