import React from 'react';
import SectionTitle from "../Common/SectionTitle";
import SingleSustainabilityGoal from "./SingleSustainabilityGoal";
import { SustainabilityGoalType } from '@/types/sdg';

const sustainabilityGoals: SustainabilityGoalType[] = [
  {
    id: 1,
    title: "No Poverty (SDG 1)",
    description: "Empower women by providing them with skills and opportunities to start their own crochet businesses, helping lift them out of poverty.",
    image: "/images/myway/sdg1.jpeg"
  },
  {
    id: 2,
    title: "Quality Education (SDG 4)",
    description: "Offer free lessons in crocheting, providing educational opportunities that help women gain new skills and improve their economic prospects.",
    image: "/images/myway/sdg4.webp"
  },
  {
    id: 3,
    title: "Gender Equality (SDG 5)",
    description: "Focus on helping women of all backgrounds achieve financial independence and equality through skill development and business opportunities.",
    image: "/images/myway/sdg5.jpeg"
  },
  {
    id: 4,
    title: "Decent Work and Economic Growth (SDG 8)",
    description: "Create job opportunities and foster entrepreneurship, contributing to economic growth and promoting decent work for women.",
    image: "/images/myway/sdg8.jpeg"
  },
  {
    id: 5,
    title: "Reduced Inequalities (SDG 10)",
    description: "Address social and economic inequalities by empowering women of all ages, sizes, marital statuses, and educational levels.",
    image: "/images/myway/sdg10.jpeg"
  },
  {
    id: 6,
    title: "Responsible Consumption and Production (SDG 12)",
    description: "Promote sustainable production practices by using eco-friendly and sustainable materials in the products.",
    image: "/images/myway/sdg12.jpeg"
  },
];

const SustainabilityGoals: React.FC = () => {
  return (
    <section
      id="sustainability-goals"
      className="overflow-hidden bg-gray-1 pb-12 pt-20 text-black dark:text-white dark:bg-dark lg:pb-[90px] lg:pt-[120px]"
    >
      <div className="container">
        <div className="mb-[60px]">
          <SectionTitle
            subtitle="Sustainability Goals"
            title="Our Commitment to Sustainability"
            paragraph="Learn about the initiatives we are taking to contribute to the UN Sustainable Development Goals."
            width="640px"
            center
          />
        </div>

        <div className="-mx-4 flex flex-wrap justify-center">
          {sustainabilityGoals.map((goal, i) => (
            <SingleSustainabilityGoal key={i} goal={goal} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SustainabilityGoals;
