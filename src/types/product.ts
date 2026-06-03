import type { Category } from "../features/products/constants/categories";

export interface Product {
  id: string;

  name: string;
  brand: string;
  description: string;
  image: string;
  price: number;
  quantity: number;

  category: Category;
  model: string;

  rate: number;
  isActive: boolean;

  specs: Record<string, string>;
  owner: string;

  createdAt: string;
  updatedAt: string;
}