import { Category } from './category.model';

export interface PackageItem {
  itemId: number;
  itemName: string;
  quantity: number;
}

export interface RentalPackage {
  id: number;
  name: string;
  description: string;
  priceFrom: number;
  formula: string;
  imageUrl?: string;
  isActive: boolean;
  category?: Category;
  packageItems: PackageItem[];
}
