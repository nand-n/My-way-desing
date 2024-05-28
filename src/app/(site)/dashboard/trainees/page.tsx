// import CardDataStats from "@/components/CardDataStats/CardDataStats";
// import Breadcrumb from "@/components/Common/Breadcrumb";
// import DefaultLayout from "@/components/Layouts/DefaultLaout";
// import { Metadata } from "next";

// export const metadata: Metadata = {
//   title:
//     "Trainees Page | Treaining",
//   description: "This is Training page description",
// };

// const TraineesPage = () => {
//   return (
//     <DefaultLayout>
//       <Breadcrumb pageName="Trainees" isDashboard />
//     </DefaultLayout>
//   );
// };

// export default TraineesPage;



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

  const handleDelete = (id: number) => {
    deleteTrainee(id);
  };

  const handleOk = (values: TraineeSchema) => {
    if (currentTrainee) {
      updateTrainee({ ...currentTrainee, ...values });
    } else {
      console.log(values,"vals");
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
      <div className="mt-4"></div> 
      <Button type="primary" onClick={handleAdd}>
        Add Trainee
      </Button>
      <Space />
      <div className="h-4"></div>
      <TraineeTable trainees={trainees} onEdit={handleEdit} onDelete={handleDelete} />
      <TraineeModal
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={handleOk}
        initialValues={currentTrainee}
      />
    </DefaultLayout>
  );
};

export default TraineesPage;
