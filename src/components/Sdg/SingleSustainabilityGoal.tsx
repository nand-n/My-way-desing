import { SustainabilityGoalType } from '@/types/sdg';
import React from 'react';
import Image from 'next/image';

type SingleSustainabilityGoalProps = {
  goal: SustainabilityGoalType;
};

const SingleSustainabilityGoal: React.FC<SingleSustainabilityGoalProps> = ({ goal }) => {
  return (
    <div className="w-full px-4 md:w-1/2 lg:w-1/3 mb-6">
      <div className="dark:bg-black p-4 rounded-lg shadow-md">
        {goal.image && (
          <Image
            src={goal.image}
            alt={goal.title}
            layout="responsive"
            width={600}
            height={400}
          className="w-full h-48 object-cover rounded-md mb-6 rounded-t-lg "

          />
        )}
        <h3 className="text-lg font-semibold mb-2">{goal.title}</h3>
        <p className=" mb-4">{goal.description}</p>
      </div>
    </div>
  );
};

export default SingleSustainabilityGoal;
