export interface CartLine {
  type: 'item' | 'package';
  id: number;
  name: string;
  pricePerDay?: number;
  priceFixed?: number;
  quantity: number;
  imageUrl?: string;
}

export interface BookingRequest {
  startDate: string;
  endDate: string;
  deliveryRequired: boolean;
  deliveryAddress?: string;
  notes?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  lines: BookingLineRequest[];
}

export interface BookingLineRequest {
  itemId?: number;
  packageId?: number;
  quantity: number;
}

export interface BookingResponse {
  id: number;
  status: string;
  startDate: string;
  endDate: string;
  deliveryRequired: boolean;
  totalAmount: number;
  checkoutUrl?: string;
  createdAt: string;
}
