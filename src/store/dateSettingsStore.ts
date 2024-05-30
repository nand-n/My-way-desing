import { Dates } from '@prisma/client'
import { message } from 'antd';
import axios from 'axios';
import { create } from 'zustand';
interface DateStoreState {
  searchQuery : string;
  setSearchQuery:  (query:string) => void;
  filteredDates: Dates[];
  setFilteredDate: (dates:Dates[]) =>void;
  currentPage: number;
  setCurrentPage: (page:number) =>  void;
  datesParPage:number;
  fetchDates: ()=> Promise<void>;
  addDates:(dates:Omit<Dates, "id">) => Promise<void>;
  updateDate:(id:string , date:Dates) =>Promise<void>;
  deleteDates:(id:string)=>Promise<void>;
}

export const useDatesSettingStore = create<DateStoreState>((set)=>({
  searchQuery:'',
  setSearchQuery:(query) =>set({ searchQuery:query}),
  filteredDates:[],
  setFilteredDate: (dates) => set({ filteredDates:dates}),
  currentPage:1,
  setCurrentPage:(page)=> set({currentPage:page}),
  datesParPage: 10,
  addDates:async(date) =>{
    try {
      const response = await axios.post<Dates>('/api/settings/dates',date)
      set({filteredDates:response.data})
    } catch (error:any) {
      message.error(error)
      console.log('Error Saving Date' , error);
    }
  },
  fetchDates:async()=>{},
  deleteDates:async(id) =>{},
  updateDate:async(id,date) =>{}

}))
