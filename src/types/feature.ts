// export type Feature = {
//   id: number;
//   icon: JSX.Element;
//   title: string;
//   paragraph: string;
//   btn: string;
//   btnLink: string;
// };


// export interface Feature {
//   title: string;
//   description: string;
//   image: string;
// }

import { z } from 'zod';

export const FeatureSchema = z.object({
  title: z.string(),
  description: z.string(),
  image: z.string(),
  category: z.string(),
});

export type Feature = z.infer<typeof FeatureSchema>;