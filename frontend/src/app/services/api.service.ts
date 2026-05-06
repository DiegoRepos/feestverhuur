import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { Item } from '../models/item.model';
import { RentalPackage } from '../models/package.model';
import { BookingRequest, BookingResponse } from '../models/booking.model';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private base = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  // Categories
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.base}/categories`);
  }

  // Items
  getItems(categoryId?: number): Observable<Item[]> {
    let params = new HttpParams();
    if (categoryId) params = params.set('categoryId', categoryId);
    return this.http.get<Item[]>(`${this.base}/items`, { params });
  }

  getItem(id: number): Observable<Item> {
    return this.http.get<Item>(`${this.base}/items/${id}`);
  }

  // Packages
  getPackages(categoryId?: number): Observable<RentalPackage[]> {
    let params = new HttpParams();
    if (categoryId) params = params.set('categoryId', categoryId);
    return this.http.get<RentalPackage[]>(`${this.base}/packages`, { params });
  }

  getPackage(id: number): Observable<RentalPackage> {
    return this.http.get<RentalPackage>(`${this.base}/packages/${id}`);
  }

  // Contact
  sendContact(data: { naam: string; email: string; telefoon?: string; onderwerp?: string; bericht: string }): Observable<void> {
    return this.http.post<void>(`${this.base}/contact`, data);
  }

  // Bookings
  createBooking(request: BookingRequest): Observable<BookingResponse> {
    return this.http.post<BookingResponse>(`${this.base}/bookings`, request);
  }

  getBookingStatus(id: number): Observable<BookingResponse> {
    return this.http.get<BookingResponse>(`${this.base}/bookings/${id}/status`);
  }
}
