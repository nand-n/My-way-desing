// import { TeamType } from "@/types/team";
// import SectionTitle from "../Common/SectionTitle";
// import SingleTeam from "./SingleTeam";

// const teamData: TeamType[] = [
//   {
//     id: 1,
//     name: "Adveen Desuza",
//     designation: "UI Designer",
//     image: "/images/team/team-01.png",
//     facebookLink: "/#",
//     twitterLink: "/#",
//     instagramLink: "/#",
//   },
//   {
//     id: 2,
//     name: "Jezmin uniya",
//     designation: "Product Designer",
//     image: "/images/team/team-02.png",
//     facebookLink: "/#",
//     twitterLink: "/#",
//     instagramLink: "/#",
//   },
//   {
//     id: 3,
//     name: "Andrieo Gloree",
//     designation: "App Developer",
//     image: "/images/team/team-03.png",
//     facebookLink: "/#",
//     twitterLink: "/#",
//     instagramLink: "/#",
//   },
//   {
//     id: 4,
//     name: "Jackie Sanders",
//     designation: "Content Writer",
//     image: "/images/team/team-04.png",
//     facebookLink: "/#",
//     twitterLink: "/#",
//     instagramLink: "/#",
//   },
// ];

// const Team = () => {
//   return (
//     <section
//       id="team"
//       className="overflow-hidden bg-gray-1 pb-12 pt-20 dark:bg-dark-2 lg:pb-[90px] lg:pt-[120px]"
//     >
//       <div className="container">
//         <div className="mb-[60px]">
//           <SectionTitle
//             subtitle="Our Team"
//             title="Meet Our Team"
//             paragraph="There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form."
//             width="640px"
//             center
//           />
//         </div>

//         <div className="-mx-4 flex flex-wrap justify-center">
//           {teamData.map((team, i) => (
//             <SingleTeam key={i} team={team} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Team;



// Workshops.tsx
import React from 'react';
import { WorkshopType } from "@/types/workshop";
import SectionTitle from "../Common/SectionTitle";
import SingleWorkshop from './SingleTeam';

// Sample workshop data
const workshopData: WorkshopType[] = [
  {
    id: 1,
    title: "Beginner Crochet Class",
    description: "Learn the basics of crochet, including simple stitches and techniques.",
    image: "/images/myway/crochetbeginer.jpeg",
    date: "-",
    time: "-",
  },
  {
    id: 2,
    title: "Advanced Crochet Techniques",
    description: "Take your crochet skills to the next level with advanced patterns and methods.",
    image: "/images/myway/modelBag.jpeg",
    date: "-",
    time: "-",
  },
  {
    id: 3,
    title: "Crochet for Home Decor",
    description: "Learn to create beautiful crochet items for your home, including pillows and throws.",
    image: "/images/myway/homdecor.jpeg",
    date: "-",
    time: "-",
  },
  {
    id: 4,
    title: "Crochet Gifts and Accessories",
    description: "Make unique crochet gifts and accessories, perfect for any occasion.",
    image: "/images/myway/crochetgift.jpeg",
    date: "-",
    time: "-",
  },
];

const Workshops: React.FC = () => {
  return (
    <section
      id="workshops"
      className="overflow-hidden bg-gray-1 pb-12 pt-20 dark:bg-dark-2 lg:pb-[90px] lg:pt-[120px]"
    >
      <div className="container">
        <div className="mb-[60px]">
          <SectionTitle
            subtitle="Our Workshops"
            title="Join Our Crochet Classes"
            paragraph="Enhance your crochet skills with our comprehensive workshops, suitable for all levels."
            width="640px"
            center
          />
        </div>

        <div className="-mx-4 flex flex-wrap justify-start">
          {workshopData.map((workshop, i) => (
            <SingleWorkshop key={i} workshop={workshop} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Workshops;
