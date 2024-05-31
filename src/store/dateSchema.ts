import { z } from 'zod';

const datesSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, { message: 'Name is required' }),
  start: z.date({ required_error: 'Start date is required' }),
  end: z.date({ required_error: 'End date is required' }),
});

export default datesSchema;
