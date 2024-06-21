import React from 'react';
import Image from 'next/image';
import { Feature } from '@/types/feature';

interface SingleFeatureProps {
  feature: Feature;
}

const SingleFeature: React.FC<SingleFeatureProps> = ({ feature }) => {
  return (
    <div className="w-full h-full px-4 md:w-1/3 lg:w-1/4">
      <div className="mb-10 overflow-hidden rounded-lg bg-white p-6 shadow-lg dark:bg-dark">
        <div className="relative mb-6 w-full h-60">
          <Image src={feature.image} alt={feature.title} layout="fill" className="rounded-lg" />
        </div>
        <h3 className="mb-4 text-xl font-semibold">{feature.title}</h3>
        <p className="text-body-color">{feature.description}</p>
      </div>
    </div>
  );
};

export default SingleFeature;
