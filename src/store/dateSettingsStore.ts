import { Dates } from '@prisma/client';
import { message } from 'antd';
import axios from 'axios';
import { create } from 'zustand';

interface DateStoreState {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredDates: Dates[];
  setFilteredDate: (dates: Dates[]) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  datesParPage: number;
  fetchDates: () => Promise<void>;
  addDates: (date: Omit<Dates, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateDate: (id: string, date: Partial<Omit<Dates, "id">>) => Promise<void>;
  deleteDates: (id: string) => Promise<void>;
}

export const useDatesSettingStore = create<DateStoreState>((set) => ({
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  filteredDates: [],
  setFilteredDate: (dates) => set({ filteredDates: dates }),
  currentPage: 1,
  setCurrentPage: (page) => set({ currentPage: page }),
  datesParPage: 10,
  fetchDates: async () => {
    try {
      const response = await axios.get<Dates[]>('/api/settings/dates');
      set({ filteredDates: response.data });
    } catch (error: any) {
      message.error('Error fetching dates');
      console.error('Error fetching dates', error);
    }
  },
  addDates: async (date) => {
    try {
      const response = await axios.post<Dates>('/api/settings/dates', date);
      if (response.status === 200 || response.status === 201) {
        set((state) => ({ filteredDates: [...state.filteredDates, response.data] }));
        message.success('Date saved successfully');
      } else {
        message.error(`Error saving date: ${response.statusText}`);
      }
    } catch (error: any) {
      message.error('Error saving date');
      console.error('Error saving date', error);
    }
  },
  updateDate: async (id, date) => {
    try {
      const response = await axios.patch<Dates>(`/api/settings/dates/${id}`, date);
      set((state) => ({
        filteredDates: state.filteredDates.map((d) => (d.id === id ? response.data : d)),
      }));
    } catch (error: any) {
      message.error('Error updating date');
      console.error('Error updating date', error);
    }
  },
  deleteDates: async (id) => {
    try {
      await axios.delete(`/api/settings/dates/${id}`);
      set((state) => ({
        filteredDates: state.filteredDates.filter((date) => date.id !== id),
      }));
    } catch (error: any) {
      message.error('Error deleting date');
      console.error('Error deleting date', error);
    }
  },
}));
