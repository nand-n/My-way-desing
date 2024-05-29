import React, { useEffect } from 'react';
import { Modal, Form, Input } from 'antd';
import { TraineeSchema } from '@/store/traineeSchema';

interface TraineeModalProps {
  visible: boolean;
  onCancel: () => void;
  onOk: (data: TraineeSchema) => void;
  initialValues: TraineeSchema | null;
}

const TraineeModal: React.FC<TraineeModalProps> = ({ visible, onCancel, onOk, initialValues }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      form.resetFields();
      if (initialValues) {
        form.setFieldsValue(initialValues);
      }
    }
  }, [initialValues, form, visible]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const data = {
          ...values,
          phone:  Number(values.phone),
          accountNumber:  Number(values.accountNumber),
        };
        onOk(data);
        form.resetFields();
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <Modal
      title="Trainee"
      open={visible}
      onCancel={onCancel}
      onOk={handleOk}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues || { id: '', name: '', email: '', education: '', address: '', phone: '', accountNumber: '', bankType: '' }}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please input the name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
           name="email"
           label="Email"
           rules={[
             { required: false, message: 'Please input the email' },
             { type: 'email', message: 'Please enter a valid email address' }
           ]}
         >
         <Input type='email' />
      </Form.Item>
        <Form.Item
          name="education"
          label="Education"
          rules={[{ required: true, message: 'Please input the education' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="address"
          label="Address"
          rules={[{ required: true, message: 'Please input the address' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone"
          rules={[
            { required: true, message: 'Please input the phone number' },
            { pattern: /^\d{10}$/, message: 'Please enter a valid 10-digit phone number' },
            
          ]}
        >
          <Input type="tel"  pattern="[0-9]*"/>
        </Form.Item>
        <Form.Item
          name="accountNumber"
          label="Account Number"
          rules={[{ required: false, message: 'Please input the account number',pattern: /^\d+$/  }]}
        >
           <Input type="number" />
        </Form.Item>
        <Form.Item
          name="bankType"
          label="Bank Type"
          rules={[{ required: false, message: 'Please input the bank type' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TraineeModal;
