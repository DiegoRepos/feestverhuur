import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../models/item.model';
import { RentalPackage } from '../models/package.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private base = environment.apiUrl + '/admin';

  constructor(private http: HttpClient) {}

  // Boekingen
  getBookings(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/bookings`);
  }

  updateBookingStatus(id: number, status: string): Observable<any> {
    return this.http.put(`${this.base}/bookings/${id}/status`, { status });
  }

  // Artikelen
  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.base}/items`);
  }

  createItem(item: Partial<Item>): Observable<Item> {
    return this.http.post<Item>(`${this.base}/items`, item);
  }

  updateItem(id: number, item: Partial<Item>): Observable<Item> {
    return this.http.put<Item>(`${this.base}/items/${id}`, item);
  }

  deleteItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/items/${id}`);
  }

  // Pakketten
  getPackages(): Observable<RentalPackage[]> {
    return this.http.get<RentalPackage[]>(`${this.base}/packages`);
  }

  createPackage(pkg: Partial<RentalPackage>): Observable<RentalPackage> {
    return this.http.post<RentalPackage>(`${this.base}/packages`, pkg);
  }

  updatePackage(id: number, pkg: Partial<RentalPackage>): Observable<RentalPackage> {
    return this.http.put<RentalPackage>(`${this.base}/packages/${id}`, pkg);
  }

  deletePackage(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/packages/${id}`);
  }
}
