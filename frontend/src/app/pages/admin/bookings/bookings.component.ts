import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe, DatePipe, NgFor } from '@angular/common';
import { AdminService } from '../../../services/admin.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatTableModule, MatIconModule, MatChipsModule,
            MatSelectModule, MatFormFieldModule, FormsModule, CurrencyPipe, DatePipe, NgFor],
  template: `
    <div class="container py-8">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold">Boekingen</h1>
        <div class="flex gap-3">
          <a routerLink="/admin/artikelen" mat-stroked-button>Artikelen</a>
          <a routerLink="/admin/pakketten" mat-stroked-button>Pakketten</a>
          <button mat-stroked-button color="warn" (click)="logout()">Uitloggen</button>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table mat-table [dataSource]="bookings" class="w-full">
          <ng-container matColumnDef="id">
            <th mat-header-cell *matHeaderCellDef>#</th>
            <td mat-cell *matCellDef="let b">{{ b.id }}</td>
          </ng-container>
          <ng-container matColumnDef="customer">
            <th mat-header-cell *matHeaderCellDef>Klant</th>
            <td mat-cell *matCellDef="let b">{{ b.customer?.firstName }} {{ b.customer?.lastName }}<br>
              <span class="text-xs text-gray-400">{{ b.customer?.email }}</span>
            </td>
          </ng-container>
          <ng-container matColumnDef="dates">
            <th mat-header-cell *matHeaderCellDef>Periode</th>
            <td mat-cell *matCellDef="let b">{{ b.startDate }} — {{ b.endDate }}</td>
          </ng-container>
          <ng-container matColumnDef="total">
            <th mat-header-cell *matHeaderCellDef>Totaal</th>
            <td mat-cell *matCellDef="let b">{{ b.totalAmount | currency:'EUR' }}</td>
          </ng-container>
          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef>Status</th>
            <td mat-cell *matCellDef="let b">
              <mat-form-field appearance="outline" class="w-32" style="font-size:12px">
                <mat-select [(ngModel)]="b.status" (ngModelChange)="updateStatus(b)">
                  <mat-option *ngFor="let s of statuses" [value]="s">{{ s }}</mat-option>
                </mat-select>
              </mat-form-field>
            </td>
          </ng-container>
          <ng-container matColumnDef="created">
            <th mat-header-cell *matHeaderCellDef>Aangemaakt</th>
            <td mat-cell *matCellDef="let b">{{ b.createdAt | date:'dd/MM/yyyy HH:mm' }}</td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="columns"></tr>
          <tr mat-row *matRowDef="let row; columns: columns;" class="hover:bg-gray-50"></tr>
        </table>
      </div>
    </div>
  `
})
export class BookingsComponent implements OnInit {
  bookings: any[] = [];
  columns = ['id', 'customer', 'dates', 'total', 'status', 'created'];
  statuses = ['PENDING', 'PAID', 'CONFIRMED', 'CANCELLED', 'REFUNDED'];

  constructor(private admin: AdminService, private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.admin.getBookings().subscribe(b => this.bookings = b);
  }

  updateStatus(booking: any): void {
    this.admin.updateBookingStatus(booking.id, booking.status).subscribe();
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/admin/login']);
  }
}
