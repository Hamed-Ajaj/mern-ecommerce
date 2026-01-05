import { z } from 'zod'

export const createProductSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.coerce.number().positive('Price must be a positive number'),
  image_url: z.url().optional().or(z.literal('')),
})

export const updateProductSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').optional(),
  description: z.string().min(20, 'Description must be at least 20 characters').optional().or(z.literal('')),
  price: z.coerce.number().positive('Price must be a positive number').optional(),
  image_url: z.string().url().optional().or(z.literal('')),
})
