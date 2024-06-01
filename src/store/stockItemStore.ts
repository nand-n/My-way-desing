import { Area, StockItem } from '@prisma/client';
import create from 'zustand';
import axios from 'axios';
import { message } from 'antd';

interface StockStoreState {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredStockItems: StockItem[];
  areas: Area[];
  setFilteredStockItems: (items: StockItem[]) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
  stockItems: StockItem[];
  fetchStockItems: () => Promise<void>;
  fetchStockAreas: () => Promise<void>;
  addStockItem: (item: Omit<StockItem, 'id'>) => Promise<void>;
  updateStockItem: (item: StockItem) => Promise<void>;
  deleteStockItem: (id: string) => Promise<void>;
  assignStockItem: (id: string, address: string) => Promise<void>;
}

export const useStockStore = create<StockStoreState>((set) => ({
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  filteredStockItems: [],
  setFilteredStockItems: (items) => set({ filteredStockItems: items }),
  currentPage: 1,
  setCurrentPage: (page) => set({ currentPage: page }),
  itemsPerPage: 10,
  stockItems: [],
  areas:[],
  fetchStockItems: async () => {
    try {
      const response = await axios.get<StockItem[]>('/api/inventory/stock');
      set({ stockItems: response.data, filteredStockItems: response.data });
    } catch (error: any) {
      message.error(error.message);
      console.error('Error fetching stock items:', error);
    }
  },
  fetchStockAreas: async () => {
    try {
      const response = await axios.get<StockItem[]>('/api/area');
      set({ areas: response.data });
    } catch (error: any) {
      message.error(error.message);
      console.error('Error fetching area items:', error);
    }
  },

  addStockItem: async (item) => {
    try {
      const response = await axios.post<StockItem>('/api/inventory/stock', item);
      set((state) => ({
        stockItems: [...state.stockItems, response.data],
        filteredStockItems: [...state.stockItems, response.data],
      }));
      message.success('Stock item added successfully');
    } catch (error: any) {
      message.error('Error adding stock item');
      console.error('Error adding stock item:', error);
    }
  },

  updateStockItem: async (item) => {
    try {
      const response = await axios.patch<StockItem>(`/api/inventory/stock/${item.id}`, item);
      set((state) => ({
        stockItems: state.stockItems.map((si) => (si.id === item.id ? response.data : si)),
        filteredStockItems: state.filteredStockItems.map((si) => (si.id === item.id ? response.data : si)),
      }));
      message.success('Stock item updated successfully');
    } catch (error: any) {
      message.error('Error updating stock item');
      console.error('Error updating stock item:', error);
    }
  },

  deleteStockItem: async (id) => {
    try {
      await axios.delete(`/api/inventory/stock/${id}`);
      set((state) => ({
        stockItems: state.stockItems.filter((si) => si.id !== id),
        filteredStockItems: state.filteredStockItems.filter((si) => si.id !== id),
      }));
      message.success('Stock item deleted successfully');
    } catch (error: any) {
      message.error('Error deleting stock item');
      console.error('Error deleting stock item:', error);
    }
  },

  assignStockItem: async (id, address) => {
    try {
      await axios.post(`/api/area`, { name:address });
      message.success('Stock item assigned successfully');
    } catch (error: any) {
      message.error('Error assigning stock item');
      console.error('Error assigning stock item:', error);
    }
  },
}));
