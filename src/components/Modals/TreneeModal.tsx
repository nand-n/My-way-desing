// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { Modal, Input } from 'antd';
// import { TraineeSchema, traineeSchema } from '@/store/traineeSchema';

// interface TraineeModalProps {
//   visible: boolean;
//   onCancel: () => void;
//   onOk: (data: TraineeSchema) => void;
//   initialValues: TraineeSchema | null;
// }

// const TraineeModal: React.FC<TraineeModalProps> = ({ visible, onCancel, onOk, initialValues }) => {
//   const {
//     handleSubmit,
//     register,
//     formState: { errors },
//     reset,
//     getValues
//   } = useForm<TraineeSchema>({
//     resolver: zodResolver(traineeSchema),
//     defaultValues: initialValues || {id:1 , name: '', education: '', address: '' },
//   });
//   console.log(getValues(), "All Values");
//   React.useEffect(() => {
//     reset(initialValues || { id:1, name: '', education: '', address: '' });
//   }, [initialValues, reset]);

//   console.log(errors,"error");

//   return (
//     <Modal title="Trainee" open={visible} onCancel={onCancel} onOk={handleSubmit(onOk)}>
//       <form>
//         <div>
//           <label>Name</label>
//           <Input {...register('name')} />
//           {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
//         </div>
//         <div>
//           <label>Email</label>
//           <Input {...register('email')} />
//           {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
//         </div>
//         <div>
//           <label>Education</label>
//           <Input {...register('education')} />
//           {errors.education && <p className='text-red-500'>{errors.education.message}</p>}
//         </div>
//         <div>
//           <label>Address</label>
//           <Input {...register('address')} />
//           {errors.address && <p className='text-red-500'>{errors.address.message}</p>}
//         </div>
//         <div>
//           <label>Phone</label>
//           <Input {...register('phone')} />
//           {errors.phone && <p className='text-red-500'>{errors.phone.message}</p>}
//         </div>
//         <div>
//           <label>Account Number</label>
//           <Input {...register('accountNumber')} />
//           {errors.accountNumber && <p className='text-red-500'>{errors.accountNumber.message}</p>}
//         </div>
//         <div>
//           <label>Bank Type</label>
//           <Input {...register('bankType')} />
//           {errors.bankType && <p className='text-red-500'>{errors.bankType.message}</p>}
//         </div>
//       </form>
//     </Modal>
//   );
// };

// export default TraineeModal;


import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Modal, Input } from 'antd';

interface TraineeSchema {
  id: number;
  name: string;
  email: string;
  education: string;
  address: string;
  phone: number;
  accountNumber: number;
  bankType: string;
}

interface TraineeModalProps {
  visible: boolean;
  onCancel: () => void;
  onOk: (data: TraineeSchema) => void;
  initialValues: TraineeSchema | null;
}

const TraineeModal: React.FC<TraineeModalProps> = ({ visible, onCancel, onOk, initialValues }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<TraineeSchema>({
    defaultValues: initialValues || { id: 1, name: '', email: '', education: '', address: '', phone: 0, accountNumber: 0, bankType: '' },
  });

  useEffect(() => {
    reset(initialValues || { id: 1, name: '', email: '', education: '', address: '', phone: 0, accountNumber: 0, bankType: '' });
  }, [initialValues, reset]);

  const onSubmit: SubmitHandler<TraineeSchema> = (data) => {
    onOk(data);
  };

  return (
    <Modal
      title="Trainee"
      open={visible}
      onCancel={onCancel}
      onOk={handleSubmit(onSubmit)}
    >
      <form>
        <div>
          <label>Name</label>
          <Input {...register('name', { required: 'Name is required' })} />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <div>
          <label>Email</label>
          <Input {...register('email', { required: 'Email is required' })} />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>
        <div>
          <label>Education</label>
          <Input {...register('education', { required: 'Education is required' })} />
          {errors.education && <p className="text-red-500">{errors.education.message}</p>}
        </div>
        <div>
          <label>Address</label>
          <Input {...register('address', { required: 'Address is required' })} />
          {errors.address && <p className="text-red-500">{errors.address.message}</p>}
        </div>
        <div>
          <label>Phone</label>
          <Input {...register('phone', { required: 'Phone number is required' })} />
          {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
        </div>
        <div>
          <label>Account Number</label>
          <Input {...register('accountNumber', { required: 'Account number is required' })} />
          {errors.accountNumber && <p className="text-red-500">{errors.accountNumber.message}</p>}
        </div>
        <div>
          <label>Bank Type</label>
          <Input {...register('bankType', { required: 'Bank type is required' })} />
          {errors.bankType && <p className="text-red-500">{errors.bankType.message}</p>}
        </div>
      </form>
    </Modal>
  );
};

export default TraineeModal;
