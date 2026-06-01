import { z } from 'zod';

// Pagination
export const paginationSchema = z.object({
  page: z.string().transform(Number).pipe(z.number().int().min(1)).optional().default('1'),
  limit: z.string().transform(Number).pipe(z.number().int().min(1).max(100)).optional().default('10'),
});

// Auth
export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token is required'),
});

// Address
export const addressSchema = z.object({
  type: z.enum(['HOME', 'OFFICE', 'OTHER']),
  street: z.string().min(5, 'Street address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zipCode: z.string().regex(/^\d{5,6}$/, 'Invalid zip code'),
  country: z.string().min(2, 'Country is required'),
  isDefault: z.boolean().optional().default(false),
});

// Product
export const createProductSchema = z.object({
  name: z.string().min(3, 'Product name must be at least 3 characters'),
  slug: z.string().min(3, 'Slug is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.number().positive('Price must be positive'),
  discount: z.number().min(0).max(100).optional().default(0),
  stock: z.number().int().min(0, 'Stock must be non-negative'),
  category: z.string().min(2, 'Category is required'),
  sku: z.string().min(3, 'SKU is required'),
});

export const updateProductSchema = createProductSchema.partial();

// Cart
export const addToCartSchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
  quantity: z.number().int().min(1, 'Quantity must be at least 1'),
});

// Order
export const createOrderSchema = z.object({
  items: z.array(z.object({
    productId: z.string(),
    quantity: z.number().int().min(1),
  })).min(1, 'Order must have at least one item'),
  shippingAddressId: z.string().optional(),
  notes: z.string().optional(),
});

// Review
export const createReviewSchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
  rating: z.number().int().min(1, 'Rating must be between 1 and 5').max(5),
  title: z.string().min(3, 'Title must be at least 3 characters'),
  comment: z.string().optional(),
});

export const updateReviewSchema = createReviewSchema.partial();

// Wishlist
export const addToWishlistSchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type AddressInput = z.infer<typeof addressSchema>;
export type CreateProductInput = z.infer<typeof createProductSchema>;
export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type CreateReviewInput = z.infer<typeof createReviewSchema>;
export type AddToCartInput = z.infer<typeof addToCartSchema>;
export type PaginationInput = z.infer<typeof paginationSchema>;
