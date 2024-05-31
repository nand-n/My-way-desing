

import { Modal, Form, Input, InputNumber, Button, Upload, message } from 'antd';
import { useProductStore } from '@/store/productStore';
import { Product } from '@prisma/client';
import { useState } from 'react';
import cloudinary from '@/utils/claudinary';
import { ImageUploader } from '../ImageUpload/image-uploader';
import CldImage from '../Common/CldImage';

interface ProductModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const ProductModal = ({ isVisible, onClose }: ProductModalProps) => {
  const [form] = Form.useForm();
  const addProduct = useProductStore((state) => state.addProduct);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isImageUploaded, setIsImageUploaded] = useState<boolean>(false);


  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await addProduct({ ...values, image: imageUrl } as Omit<Product, 'id'>);
      onClose();
      form.resetFields();
      setImageUrl(null);
      setIsImageUploaded(false); // Reset image upload state
    } catch (error: any) {
      console.error('Error adding product:', error);
      message.error('Error adding product. Please try again.');
    }
  };

  const handleCancel = () => {
    onClose();
    form.resetFields();
    setImageUrl(null);
  };

    function saveImage(url: string) {
    setImageUrl(url)
    setIsImageUploaded(true);
  }


  return (
    <Modal
      title="Add Product"
      open={isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Add"
      cancelText="Cancel"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please input the title!' }]}
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
          name="price"
          label="Price"
          rules={[{ required: true, message: 'Please input the price!' }]}
        >
          <InputNumber type='number' min={0} prefix="ETB" style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="itemCount"
          label="Item Count"
          rules={[{ required: true, message: 'Please input the item count!' }]}
        >
          <InputNumber type='number' min={0} style={{ width: '100%' }} />
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

export default ProductModal;
