'use client';

// import { Modal, Form, Input, InputNumber, Button, Upload, message } from 'antd';
// import { useProductStore } from '@/store/productStore';
// import { Product } from '@prisma/client';
// import { useState } from 'react';
// import cloudinary from '@/utils/claudinary';

// interface ProductModalProps {
//   isVisible: boolean;
//   onClose: () => void;
// }

// const ProductModal = ({ isVisible, onClose }: ProductModalProps) => {
//   const [form] = Form.useForm();
//   const addProduct = useProductStore((state) => state.addProduct);
//   const [imageUrl, setImageUrl] = useState<string | null>(null);

//   const handleFileUpload = async (file: File) => {
//     const arrayBuffer = await file.arrayBuffer();
//     const buffer = new Uint8Array(arrayBuffer);
//     return new Promise((resolve, reject) => {
//       cloudinary.uploader.upload_stream({}, (error, result) => {
//         if (error) {
//           reject(error);
//           return;
//         }
//         resolve(result);
//       }).end(buffer);
//     });
//   };

//   const handleOk = async () => {
//     try {
//       const values = await form.validateFields();
//       const file = form.getFieldValue('image') as File;

//       if (file) {
//         const result: any = await handleFileUpload(file);
//         setImageUrl(result.url);
//       }

//       await addProduct({ ...values, image: imageUrl } as Omit<Product, 'id'>);
//       onClose();
//       form.resetFields();
//       setImageUrl(null);
//     } catch (error: any) {
//       console.error('Error adding product:', error);
//       message.error('Error adding product. Please try again.');
//     }
//   };

//   const handleCancel = () => {
//     onClose();
//     form.resetFields();
//     setImageUrl(null);
//   };

//   return (
//     <Modal
//       title="Add Product"
//       open={isVisible}
//       onOk={handleOk}
//       onCancel={handleCancel}
//       okText="Add"
//       cancelText="Cancel"
//     >
//       <Form form={form} layout="vertical">
//         <Form.Item
//           name="title"
//           label="Title"
//           rules={[{ required: true, message: 'Please input the title!' }]}
//         >
//           <Input />
//         </Form.Item>
//         <Form.Item
//           name="description"
//           label="Description"
//           rules={[{ required: true, message: 'Please input the description!' }]}
//         >
//           <Input />
//         </Form.Item>
//         <Form.Item
//           name="category"
//           label="Category"
//           rules={[{ required: true, message: 'Please input the category!' }]}
//         >
//           <Input />
//         </Form.Item>
//         <Form.Item
//           name="price"
//           label="Price"
//           rules={[{ required: true, message: 'Please input the price!' }]}
//         >
//           <InputNumber min={0} prefix="$" style={{ width: '100%' }} />
//         </Form.Item>
//         <Form.Item
//           name="itemCount"
//           label="Item Count"
//           rules={[{ required: true, message: 'Please input the item count!' }]}
//         >
//           <InputNumber min={0} style={{ width: '100%' }} />
//         </Form.Item>
//         <Form.Item label="Image">
//           <input
//             id="image"
//             name="image"
//             type="file"
//             required
//             className="block w-full border-slate-400"
//             onChange={(e) => {
//               const file = e.target.files?.[0];
//               form.setFieldsValue({ image: file });
//             }}
//           />
//         </Form.Item>
//       </Form>
//     </Modal>
//   );
// };

// export default ProductModal;


// ProductModal.tsx

import { Modal, Form, Input, InputNumber, Button, Upload, message } from 'antd';
import { useProductStore } from '@/store/productStore';
import { Product } from '@prisma/client';
import { useState } from 'react';
import cloudinary from '@/utils/claudinary';
import { ImageUploader } from '../ImageUpload/image-uploader';

interface ProductModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const ProductModal = ({ isVisible, onClose }: ProductModalProps) => {
  const [form] = Form.useForm();
  const addProduct = useProductStore((state) => state.addProduct);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // const handleFileUpload = async (file: any) => {
  //   const arrayBuffer = await file.arrayBuffer();
  //   const buffer = new Uint8Array(arrayBuffer);
  //     await cloudinary.uploader.upload(file)
  // };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const file = form.getFieldValue('image') as File;

      if (file) {
        console.log("image Uploaded" ,file);
        // const result: any = await handleFileUpload(file);
        // setImageUrl(result.url);
      }else{
        console.log("no image provided");
      }

      await addProduct({ ...values, image: imageUrl } as Omit<Product, 'id'>);
      onClose();
      form.resetFields();
      setImageUrl(null);
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
    // "use server";
    console.log("upload Success",url);
    // await updateUser({ avatar: url });
    // revalidatePath("/");
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
          <InputNumber min={0} prefix="$" style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="itemCount"
          label="Item Count"
          rules={[{ required: true, message: 'Please input the item count!' }]}
        >
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label="Image">
        <ImageUploader onUploadSuccess={saveImage} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductModal;
