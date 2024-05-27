// import { Feature } from "@/types/feature";
// import Link from "next/link";

// const SingleFeature = ({ feature }: { feature: Feature }) => {
//   const { icon, title, paragraph, btn, btnLink } = feature;
//   return (
//     <div className="w-full px-4 md:w-1/2 lg:w-1/4">
//       <div className="wow fadeInUp group mb-12" data-wow-delay=".15s">
//         <div className="relative z-10 mb-8 flex h-[70px] w-[70px] items-center justify-center rounded-2xl bg-primary">
//           <span className="absolute left-0 top-0 z-[-1] mb-8 flex h-[70px] w-[70px] rotate-[25deg] items-center justify-center rounded-2xl bg-primary bg-opacity-20 duration-300 group-hover:rotate-45"></span>
//           {icon}
//         </div>
//         <h3 className="mb-3 text-xl font-bold text-dark dark:text-white">
//           {title}
//         </h3>
//         <p className="mb-8 text-body-color dark:text-dark-6 lg:mb-11">
//           {paragraph}
//         </p>
//         <Link
//           href={btnLink}
//           className="text-base font-medium text-dark hover:text-primary dark:text-white dark:hover:text-primary"
//         >
//           {btn}
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default SingleFeature;



// components/Features/SingleFeature.js

// const SingleFeature = ({ feature }) => {
//   return (
//     <div className="w-full px-4 md:w-1/2 lg:w-1/3">
//       <div className="mb-10 overflow-hidden rounded-lg bg-white p-6 shadow-lg dark:bg-dark">
//         <img src={feature.image} alt={feature.title} className="mb-6 h-48 w-full object-cover" />
//         <h3 className="mb-4 text-xl font-semibold">{feature.title}</h3>
//         <p className="text-body-color">{feature.description}</p>
//       </div>
//     </div>
//   );
// };

// export default SingleFeature;


// import { Feature } from '@/types/feature';
// import Image from 'next/image';

// interface SingleFeatureProps {
//   feature: Feature;
// }

// const SingleFeature: React.FC<SingleFeatureProps> = ({ feature }) => {
//   return (
//     <div className="w-full h-full px-4  md:w-1/3 lg:w-1/4">
//       <div className="mb-10 overflow-hidden rounded-lg bg-white p-6 shadow-lg dark:bg-dark">
//         <div className="relative mb-6  w-full h-60">
//           <Image src={feature.image} alt={feature.title} layout="fill"  className="rounded-lg" />
//         </div>
//         <h3 className="mb-4 text-xl font-semibold">{feature.title}</h3>
//         <p className="text-body-color">{feature.description}</p>
//       </div>
//     </div>
//   );
// };

// export default SingleFeature;


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
