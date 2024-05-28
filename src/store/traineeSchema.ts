import { z } from 'zod';

export const traineeSchema = z.object({
  id: z.number(),
  name: z.string().min(2, "Name is required"),
  email: z.string().email().optional(),
  education: z.string().min(2, "Education is required"),
  address: z.string().min(2, "Address is required"),
  phone: z.number().optional(),
  accountNumber: z.number().optional(),
  bankType: z.string().optional(),
});

export type TraineeSchema = z.infer<typeof traineeSchema>;
