import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe, DatePipe, NgFor } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule,
            MatDatepickerModule, MatNativeDateModule, FormsModule, CurrencyPipe, DatePipe, NgFor],
  template: `
    <div class="container py-12">
      <h1 class="text-4xl font-bold mb-8">Winkelwagen</h1>

      @if (cart.lines().length === 0) {
        <div class="text-center py-20 text-gray-400">
          <mat-icon class="text-7xl mb-4">shopping_cart</mat-icon>
          <p class="text-xl mb-6">Je winkelwagen is leeg</p>
          <a routerLink="/pakketten" mat-raised-button color="primary">Bekijk pakketten</a>
        </div>
      } @else {
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2 space-y-4">
            <!-- Artikelen -->
            @for (line of cart.lines(); track line.id + line.type) {
              <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-center gap-4">
                <div class="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                  <mat-icon class="text-gray-400">{{ line.type === 'package' ? 'celebration' : 'inventory_2' }}</mat-icon>
                </div>
                <div class="flex-1">
                  <div class="text-xs text-gray-400 uppercase mb-1">{{ line.type === 'package' ? 'Pakket' : 'Artikel' }}</div>
                  <h3 class="font-semibold">{{ line.name }}</h3>
                  <div class="text-sm text-gray-500">
                    @if (line.pricePerDay != null) {
                      {{ line.pricePerDay | currency:'EUR' }}/dag × {{ cart.totalDays() }} dag(en)
                    } @else {
                      Vaste prijs: {{ line.priceFixed | currency:'EUR' }}
                    }
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <button mat-icon-button (click)="updateQty(line.type, line.id, line.quantity - 1)">
                    <mat-icon>remove</mat-icon>
                  </button>
                  <span class="w-8 text-center font-bold">{{ line.quantity }}</span>
                  <button mat-icon-button (click)="updateQty(line.type, line.id, line.quantity + 1)">
                    <mat-icon>add</mat-icon>
                  </button>
                </div>
                <div class="text-right min-w-20">
                  <div class="font-bold text-primary-700">
                    @if (line.pricePerDay != null) {
                      {{ line.pricePerDay * cart.totalDays() * line.quantity | currency:'EUR' }}
                    } @else {
                      {{ (line.priceFixed ?? 0) * line.quantity | currency:'EUR' }}
                    }
                  </div>
                </div>
                <button mat-icon-button color="warn" (click)="cart.removeItem(line.type, line.id)">
                  <mat-icon>delete</mat-icon>
                </button>
              </div>
            }

            <!-- Datumkeuze -->
            <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h3 class="font-semibold mb-4">Huurperiode kiezen</h3>
              <div class="flex gap-4 flex-wrap">
                <mat-form-field appearance="outline">
                  <mat-label>Startdatum</mat-label>
                  <input matInput [matDatepicker]="startPicker" [(ngModel)]="startDate" (ngModelChange)="updateDates()">
                  <mat-datepicker-toggle matSuffix [for]="startPicker"></mat-datepicker-toggle>
                  <mat-datepicker #startPicker></mat-datepicker>
                </mat-form-field>
                <mat-form-field appearance="outline">
                  <mat-label>Einddatum</mat-label>
                  <input matInput [matDatepicker]="endPicker" [(ngModel)]="endDate" (ngModelChange)="updateDates()">
                  <mat-datepicker-toggle matSuffix [for]="endPicker"></mat-datepicker-toggle>
                  <mat-datepicker #endPicker></mat-datepicker>
                </mat-form-field>
              </div>
              @if (cart.totalDays() > 0 && startDate && endDate) {
                <p class="text-sm text-gray-500 mt-2">Huurperiode: {{ cart.totalDays() }} dag(en)</p>
              }
            </div>
          </div>

          <!-- Samenvatting -->
          <div class="bg-white rounded-xl shadow-md border border-gray-100 p-6 h-fit">
            <h3 class="text-xl font-bold mb-6">Samenvatting</h3>
            <div class="space-y-3 mb-6">
              @for (line of cart.lines(); track line.id) {
                <div class="flex justify-between text-sm">
                  <span>{{ line.name }} ×{{ line.quantity }}</span>
                  <span>
                    @if (line.pricePerDay != null) {
                      {{ line.pricePerDay * cart.totalDays() * line.quantity | currency:'EUR' }}
                    } @else {
                      {{ (line.priceFixed ?? 0) * line.quantity | currency:'EUR' }}
                    }
                  </span>
                </div>
              }
            </div>
            <div class="border-t border-gray-200 pt-4 mb-6">
              <div class="flex justify-between font-bold text-lg">
                <span>Totaal</span>
                <span class="text-primary-700">{{ cart.total() | currency:'EUR' }}</span>
              </div>
            </div>
            <button mat-raised-button color="primary" class="w-full py-3 text-lg" (click)="goToBooking()"
                    [disabled]="!startDate || !endDate">
              Doorgaan naar boeken
            </button>
            <p class="text-xs text-gray-400 mt-3 text-center">Betaling via Mollie. Veilig en versleuteld.</p>
          </div>
        </div>
      }
    </div>
  `
})
export class CartComponent {
  startDate: Date | null = null;
  endDate: Date | null = null;

  constructor(public cart: CartService, private router: Router) {
    const start = cart.startDate();
    const end = cart.endDate();
    if (start) this.startDate = new Date(start);
    if (end) this.endDate = new Date(end);
  }

  updateQty(type: 'item' | 'package', id: number, qty: number): void {
    this.cart.updateQuantity(type, id, qty);
  }

  updateDates(): void {
    if (this.startDate && this.endDate) {
      this.cart.setDates(
        this.startDate.toISOString().split('T')[0],
        this.endDate.toISOString().split('T')[0]
      );
    }
  }

  goToBooking(): void {
    this.router.navigate(['/boeken']);
  }
}
