"use client" 
import React from 'react';
import Link from 'next/link';
import SectionTitle from '../Common/SectionTitle';
import SingleFeature from './SingleFeature';
import useStore from './productStore';

const Features: React.FC = () => {
  const { filteredProducts, setFilter } = useStore((state: { filteredProducts: () => any; setFilter: any; }) => ({
    filteredProducts: state.filteredProducts(),
    setFilter: state.setFilter,
  }));

  return (
    <section className="pb-8 pt-20 dark:bg-dark lg:pb-[70px] lg:pt-[120px]">
      <div className="container">
        <SectionTitle
          subtitle="Products"
          title="Main Products that we provide..."
          paragraph="There are many types of hand crafted clothing, gloves, shoes, sweatshirts, and more..."
        />

        <div className="flex justify-center my-8">
          <select 
            className="p-2 rounded-md border dark:bg-dark dark:text-white" 
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="Clothing">Clothing</option>
            <option value="Footwear">Footwear</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>

        <div className="-mx-4 mt-12 flex flex-wrap lg:mt-20">
          {filteredProducts.map((feature: { title: string; image: string; description: string; category: string; }, i: React.Key | null | undefined) => (
            <SingleFeature key={i} feature={feature} />
          ))}
        </div>
        <div className="flex justify-center items-center mt-8">
          <Link href={'/products'} 
            className="inline-flex items-center justify-center rounded-md bg-white px-7 py-[14px] text-center text-base font-medium text-dark shadow-1 transition duration-300 ease-in-out hover:bg-gray-2"
          >
            More {"->"}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Features;
