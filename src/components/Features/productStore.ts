import create from 'zustand';
import { z } from 'zod';

// Define the schema for Product using zod
const productSchema = z.object({
  title: z.string(),
  description: z.string(),
  image: z.string(),
  category: z.string(),
});

// Define the TypeScript type based on the zod schema
export type Product = z.infer<typeof productSchema>;

// Initialize products with type safety
const initialProducts: Product[] = [
  {
    title: "Sweat Shirts",
    description: "Hand Crafted beautiful and Comfortable Sweat Shirt.",
    image: "/images/myway/shurap.png",
    category: "Clothing",
  },
  {
    title: "Bags",
    description: "Hand Crafted beautiful and Comfortable Bags.",
    image: "/images/myway/bag.jpg",
    category: "Accessories",
  },
  {
    title: "Kids Cloths",
    description: "Hand Crafted beautiful and Comfortable Kids Cloths.",
    image: "/images/myway/childCloth.jpg",
    category: "Clothing",
  },
  {
    title: "Shoes",
    description: "Hand Crafted beautiful and Comfortable Shoes.",
    image: "/images/myway/shoeshalf.jpeg",
    category: "Footwear",
  },
  {
    title: "Sandals",
    description: "Hand Crafted beautiful and Comfortable Sandals.",
    image: "/images/myway/slipershoes.jpeg",
    category: "Footwear",
  },
  {
    title: "Scarf",
    description: "Hand Crafted beautiful and Comfortable Scarf.",
    image: "/images/myway/scarf.jpeg",
    category: "Accessories",
  },
].map(product => productSchema.parse(product));

// Define the StoreState interface
interface StoreState {
  products: Product[];
  filter: string;
  setFilter: (filter: string) => void;
  filteredProducts: () => Product[];
}

// Create the zustand store with type safety
const useStore = create<StoreState>((set, get) => ({
  products: initialProducts,
  filter: '',
  setFilter: (filter) => set({ filter }),
  filteredProducts: () => {
    const { products, filter } = get();
    if (!filter) return products;
    return products.filter(product => 
      product.category.toLowerCase().includes(filter.toLowerCase())
    );
  },
}));

export default useStore;
