import { z } from 'zod';

export const MessageSchema = z.object({
  id: z.string().uuid(),
  fullName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  message: z.string(),
  status: z.string(),
});

export type messageSchema = z.infer<typeof MessageSchema>;
