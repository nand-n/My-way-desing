import create from 'zustand';
import axios from 'axios';
import { TraineeSchema } from './traineeSchema';

interface TraineeState {
  trainees: TraineeSchema[];
  fetchTrainees: () => Promise<void>;
  addTrainee: (trainee: TraineeSchema) => Promise<void>;
  updateTrainee: (trainee: TraineeSchema) => Promise<void>;
  deleteTrainee: (id: string) => Promise<void>;
}

export const useTraineeStore = create<TraineeState>((set) => ({
  trainees: [],
  fetchTrainees: async () => {
    const response = await axios.get('/api/trainees');
    set({ trainees: response.data });
  },
  addTrainee: async (trainee: TraineeSchema) => {
    const response = await axios.post('/api/trainees', trainee);
    set((state) => ({ trainees: [...state.trainees, response.data] }));
  },
  updateTrainee: async (trainee: TraineeSchema) => {
    const response = await axios.patch('/api/trainees', trainee);
    set((state) => ({
      trainees: state.trainees.map((t) => (t.id === trainee.id ? response.data : t)),
    }));
  },
  deleteTrainee: async (id: string) => {
    await axios.delete('/api/trainees', { data: { id } });
    set((state) => ({
      trainees: state.trainees.filter((trainee) => trainee.id !== id),
    }));
  },
}));
