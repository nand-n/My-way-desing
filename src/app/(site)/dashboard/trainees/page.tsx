'use client'
import React, { useEffect, useState } from 'react';
import { Button, Space } from 'antd';
import Breadcrumb from '@/components/Common/Breadcrumb';

import { useTraineeStore } from '@/store/traineeStore';
import { Metadata } from 'next';
import { TraineeSchema } from '@/store/traineeSchema';
import DefaultLayout from '@/components/Layouts/DefaultLaout';
import TraineeTable from '@/components/Tables/TraineeTable';
import TraineeModal from '@/components/Modals/TreneeModal';

// export const metadata: Metadata = {
//   title: 'Trainees Page | Training',
//   description: 'This is the Training page description',
// };

const TraineesPage = () => {
  const { trainees, fetchTrainees, addTrainee, updateTrainee, deleteTrainee } = useTraineeStore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentTrainee, setCurrentTrainee] = useState<TraineeSchema | null>(null);

  useEffect(() => {
    fetchTrainees();
  }, [fetchTrainees]);

  const handleAdd = () => {
    setCurrentTrainee(null);
    setIsModalVisible(true);
  };

  const handleEdit = (trainee: TraineeSchema) => {
    setCurrentTrainee(trainee);
    setIsModalVisible(true);
  };

  const handleDelete = (id: string) => {
    deleteTrainee(id);
  };

  const handleOk = (values: TraineeSchema) => {
    if (currentTrainee) {
      updateTrainee({ ...currentTrainee, ...values });
    } else {
      addTrainee(values);
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Trainees" isDashboard />
      <div className="mt-4"/> 
      <Button type="primary" onClick={handleAdd}>
        Add Trainee
      </Button>
      <Space />
      <div className="h-4"/>
      <TraineeTable trainees={trainees} onEdit={handleEdit} onDelete={handleDelete} />
      <TraineeModal
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={handleOk}
        initialValues={currentTrainee|| null}
      />
    </DefaultLayout>
  );
};

export default TraineesPage;
