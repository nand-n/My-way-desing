import { Product } from '@prisma/client';
import create from 'zustand';
import axios from 'axios';
import { message } from 'antd';

interface ProductStoreState {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredProducts: Product[];
  setFilteredProducts: (products: Product[]) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  productsPerPage: number;
  products: Product[];
  fetchProducts: () => Promise<void>;
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
}

export const useProductStore = create<ProductStoreState>((set) => ({
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  filteredProducts: [],
  setFilteredProducts: (products) => set({ filteredProducts: products }),
  currentPage: 1,
  setCurrentPage: (page) => set({ currentPage: page }),
  productsPerPage: 10,
  products: [],

  fetchProducts: async () => {
    try {
      const response = await axios.get<Product[]>('/api/product');
      set({ products: response.data, filteredProducts: response.data });
    } catch (error: any) {
      message.error(error.message);
      console.error('Error fetching products:', error);
    }
  },

  addProduct: async (product) => {
    try {
      const response = await axios.post<Product>('/api/product', product);
      set((state) => ({
        products: [...state.products, response.data],
        filteredProducts: [...state.products, response.data],
      }));
      message.success('Product added successfully');
    } catch (error: any) {
      message.error('Error adding product');
      console.error('Error adding product:', error);
    }
  },
}));
