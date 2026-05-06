import { Category } from './category.model';

export interface Item {
  id: number;
  name: string;
  description: string;
  pricePerDay: number;
  pricePerWeekend?: number;
  pricePerWeek?: number;
  deposit: number;
  stock: number;
  imageUrl?: string;
  isAvailable: boolean;
  category?: Category;
}
