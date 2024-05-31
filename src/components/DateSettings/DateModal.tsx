// 'use client';

// import React, { useEffect } from 'react';
// import { Modal, Form, Input, DatePicker, Button } from 'antd';
// import { Dates } from '@prisma/client';

// interface DateModalProps {
//   isVisible: boolean;
//   onClose: () => void;
//   onSubmit: (date: Omit<Dates, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }) => void;
//   dateToEdit?: Dates | null;
// }

// const DateModal: React.FC<DateModalProps> = ({ isVisible, onClose, onSubmit, dateToEdit }) => {
//   const [form] = Form.useForm();

//   useEffect(() => {
//     if (isVisible) {
//       form.resetFields();
//       if (dateToEdit) {
//         form.setFieldsValue({
//           ...dateToEdit,
//           start: dateToEdit.start ? new Date(dateToEdit.start) : "",
//           end: dateToEdit.end ? new Date(dateToEdit.end) : "",
//         });
//       }
//     }
//   }, [isVisible, dateToEdit, form]);

//   const handleFinish = (values: any) => {
//     const formattedValues = {
//       ...values,
//       start: values.start ? values.start : null,
//       end: values.end ? values.end : null,
//     };
//     onSubmit(formattedValues);
//   };

//   return (
//     <Modal
//       open={isVisible}
//       title={dateToEdit ? 'Edit Date' : 'Add Date'}
//       onCancel={onClose}
//       footer={null}
//     >
//       <Form
//         form={form}
//         onFinish={handleFinish}
//       >
//         <Form.Item
//           name="name"
//           label="Name"
//           rules={[{ required: true, message: 'Please enter the name' }]}
//         >
//           <Input />
//         </Form.Item>
//         <Form.Item
//           name="start"
//           label="Start Date"
//           rules={[{ required: true, message: 'Please select the start date' }]}
//         >
//           <DatePicker />
//         </Form.Item>
//         <Form.Item
//           name="end"
//           label="End Date"
//           rules={[{ required: true, message: 'Please select the end date' }]}
//         >
//           <DatePicker />
//         </Form.Item>
//         <Form.Item>
//           <Button type="primary" htmlType="submit">
//             {dateToEdit ? 'Update' : 'Add'}
//           </Button>
//         </Form.Item>
//       </Form>
//     </Modal>
//   );
// };

// export default DateModal;



import React, { useEffect } from 'react';
import { Modal, Form, Input, DatePicker, Button } from 'antd';
import { Dates } from '@prisma/client';
import moment, { Moment } from 'moment'; // Import moment
import 'moment/locale/en-gb'; // Import locale if needed

interface DateModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (date: Omit<Dates, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }) => void;
  dateToEdit?: Dates | null;
}

const DateModal: React.FC<DateModalProps> = ({ isVisible, onClose, onSubmit, dateToEdit }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (isVisible && dateToEdit) {
      form.resetFields();
      form.setFieldsValue({
        ...dateToEdit,
        start: dateToEdit.start ? moment(dateToEdit.start) : null,
        end: dateToEdit.end ? moment(dateToEdit.end) : null,
      });
    }
  }, [isVisible, dateToEdit, form]);

  const handleFinish = (values: any) => {
    const formattedValues = {
      ...values,
      start: values.start ? (values.start as Moment).toDate() : null,
      end: values.end ? (values.end as Moment).toDate() : null,
    };
    onSubmit(formattedValues);
  };

  return (
    <Modal
      visible={isVisible} // Use visible instead of open
      title={dateToEdit ? 'Edit Date' : 'Add Date'}
      onCancel={onClose}
      footer={null}
    >
      <Form
        form={form}
        onFinish={handleFinish}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please enter the name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="start"
          label="Start Date"
          rules={[{ required: true, message: 'Please select the start date' }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          name="end"
          label="End Date"
          rules={[{ required: true, message: 'Please select the end date' }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {dateToEdit ? 'Update' : 'Add'}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DateModal;
