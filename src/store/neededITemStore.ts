import { Area, NeededItem } from '@prisma/client';
import create from 'zustand';
import axios from 'axios';
import { message } from 'antd';

interface NeededItemStoreState {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredNeededItems: NeededItem[];
  areas: Area[];
  setFilteredNeededItems: (items: NeededItem[]) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
  neededItems: NeededItem[];
  fetchNeededItems: () => Promise<void>;
  fetchAreas: () => Promise<void>;
  addNeededItem: (item: Omit<NeededItem, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateNeededItem: (item: NeededItem) => Promise<void>;
  deleteNeededItem: (id: string) => Promise<void>;
  assignNeededItem: (id: string, address: string) => Promise<void>;
}

export const useNeededItemStore = create<NeededItemStoreState>((set) => ({
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  filteredNeededItems: [],
  setFilteredNeededItems: (items) => set({ filteredNeededItems: items }),
  currentPage: 1,
  setCurrentPage: (page) => set({ currentPage: page }),
  itemsPerPage: 10,
  neededItems: [],
  areas: [],
  fetchNeededItems: async () => {
    try {
      const response = await axios.get<NeededItem[]>('/api/inventory/neededItem');
      set({ neededItems: response.data, filteredNeededItems: response.data });
    } catch (error: any) {
      message.error(error.message);
      console.error('Error fetching needed items:', error);
    }
  },
  fetchAreas: async () => {
    try {
      const response = await axios.get('/api/area');
      set({ ...response.data });
    } catch (error: any) {
      message.error(error.message);
      console.error('Error fetching areas:', error);
    }
  },
  addNeededItem: async (item) => {
    try {
      const response = await axios.post<NeededItem>('/api/inventory/neededItem', item);
      set((state) => ({
        neededItems: [...state.neededItems, response.data],
        filteredNeededItems: [...state.neededItems, response.data],
      }));
      message.success('Needed item added successfully');
    } catch (error: any) {
      message.error('Error adding needed item');
      console.error('Error adding needed item:', error);
    }
  },
  updateNeededItem: async (item) => {
    try {
      const response = await axios.patch<NeededItem>(`/api/inventory/neededItem/${item.id}`, item);
      set((state) => ({
        neededItems: state.neededItems.map((ni) => (ni.id === item.id ? response.data : ni)),
        filteredNeededItems: state.filteredNeededItems.map((ni) => (ni.id === item.id ? response.data : ni)),
      }));
      message.success('Needed item updated successfully');
    } catch (error: any) {
      message.error('Error updating needed item');
      console.error('Error updating needed item:', error);
    }
  },
  deleteNeededItem: async (id) => {
    try {
      await axios.delete(`/api/inventory/neededItem/${id}`);
      set((state) => ({
        neededItems: state.neededItems.filter((ni) => ni.id !== id),
        filteredNeededItems: state.filteredNeededItems.filter((ni) => ni.id !== id),
      }));
      message.success('Needed item deleted successfully');
    } catch (error: any) {
      message.error('Error deleting needed item');
      console.error('Error deleting needed item:', error);
    }
  },
  assignNeededItem: async (id, address) => {
    try {
      await axios.post(`/api/area`, { name: address });
      message.success('Needed item assigned successfully');
    } catch (error: any) {
      message.error('Error assigning needed item');
      console.error('Error assigning needed item:', error);
    }
  },
}));
