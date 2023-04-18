import { z } from 'zod';

export const isValidPost = z.object({
  category: z.string().refine((value) => value !== 'default', {
    message: 'Category is required',
  }),
  title: z.string().min(1),
  image: z.string().min(1),
  content: z.string().min(1),
});

export type validPost = 'category' | 'title' | 'image' | 'content';
