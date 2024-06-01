import { Modal, Form, Input, InputNumber, Button, message } from 'antd';
import { StockItem } from '@prisma/client';
import { useState, useEffect } from 'react';
import { ImageUploader } from '@/components/ImageUpload/image-uploader';
import CldImage from '@/components/Common/CldImage';

interface StockItemModalProps {
  isVisible: boolean;
  onClose: () => void;
  initialValues?: Partial<StockItem>;
  onSubmit: (values: Omit<StockItem, 'id'>) => Promise<void>;
}

const StockItemModal = ({ isVisible, onClose, initialValues, onSubmit }: StockItemModalProps) => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState<string | null>(initialValues?.image || null);
  const [isImageUploaded, setIsImageUploaded] = useState<boolean>(false);

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await onSubmit({ ...values, image: imageUrl } as Omit<StockItem, 'id'>);
      onClose();
      form.resetFields();
      setImageUrl(null);
      setIsImageUploaded(false);
    } catch (error: any) {
      console.error('Error submitting stock item:', error);
      message.error('Error submitting stock item. Please try again.');
    }
  };

  const handleCancel = () => {
    onClose();
    form.resetFields();
    setImageUrl(null);
    setIsImageUploaded(false);
  };

  const saveImage = (url: string) => {
    setImageUrl(url);
    setIsImageUploaded(true);
  };

  return (
    <Modal
      title={initialValues ? "Update Stock Item" : "Add Stock Item"}
      open={isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText={initialValues ? "Update" : "Add"}
      cancelText="Cancel"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please input the name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please input the description!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: 'Please input the category!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="area"
          label="Area"
          rules={[{ required: true, message: 'Please input the Area!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: 'Please input the price!' }]}
        >
          <InputNumber type="number" min={0} prefix="ETB" style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="quantity"
          label="Quantity"
          rules={[{ required: true, message: 'Please input the quantity!' }]}
        >
          <InputNumber type="number" min={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label="Image">
          <ImageUploader onUploadSuccess={saveImage} />
          <div className="mt-4 rounded-lg">
            {isImageUploaded && imageUrl && <CldImage width="960" height="600" src={imageUrl} alt="Uploaded Image" />}
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default StockItemModal;
