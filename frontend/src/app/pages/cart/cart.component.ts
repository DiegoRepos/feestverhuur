import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, MatIconModule, FormsModule, CurrencyPipe],
  template: `
    <div class="bg-[#07071a] min-h-screen">

      <!-- Hero -->
      <div class="hero-dark border-b border-white/5">
        <div class="container py-8 relative z-10">
          <nav class="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <a routerLink="/" class="hover:text-white transition-colors">Home</a>
            <mat-icon class="text-base text-gray-600">chevron_right</mat-icon>
            <span class="text-white">Winkelwagen</span>
          </nav>
          <div class="flex items-center gap-3">
            <h1 class="text-3xl md:text-4xl font-bold text-white">Winkelwagen</h1>
            @if (cart.count() > 0) {
              <span class="bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full">{{ cart.count() }}</span>
            }
          </div>
        </div>
      </div>

      <div class="container py-12">
        @if (cart.lines().length === 0) {
          <div class="text-center py-24 text-gray-400">
            <mat-icon style="font-size:80px;width:80px;height:80px;" class="mb-6 text-gray-600">shopping_cart</mat-icon>
            <p class="text-xl text-gray-300 mb-2">Je winkelwagen is leeg</p>
            <p class="text-gray-500 mb-8">Voeg pakketten of artikelen toe om verder te gaan.</p>
            <div class="flex justify-center gap-4 flex-wrap">
              <a routerLink="/pakketten"
                 class="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
                <mat-icon class="text-base">celebration</mat-icon> Bekijk pakketten
              </a>
              <a routerLink="/artikelen"
                 class="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
                <mat-icon class="text-base">inventory_2</mat-icon> Bekijk artikelen
              </a>
            </div>
          </div>
        } @else {
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

            <!-- Lijstitems -->
            <div class="lg:col-span-2 space-y-4">
              @for (line of cart.lines(); track line.id + line.type) {
                <div class="dark-card rounded-2xl p-4 flex items-center gap-4">

                  <!-- Foto -->
                  @if (line.imageUrl) {
                    @if (line.type === 'item') {
                      <div class="w-20 h-20 bg-white rounded-xl flex items-center justify-center shrink-0 overflow-hidden">
                        <img [src]="line.imageUrl" [alt]="line.name"
                             class="w-full h-full object-contain mix-blend-multiply p-1">
                      </div>
                    } @else {
                      <div class="w-20 h-20 rounded-xl shrink-0 overflow-hidden">
                        <img [src]="line.imageUrl" [alt]="line.name"
                             class="w-full h-full object-cover">
                      </div>
                    }
                  } @else {
                    <div class="w-20 h-20 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center shrink-0">
                      <mat-icon class="text-gray-500" style="font-size:32px;width:32px;height:32px;">
                        {{ line.type === 'package' ? 'celebration' : 'inventory_2' }}
                      </mat-icon>
                    </div>
                  }

                  <!-- Info -->
                  <div class="flex-1 min-w-0">
                    <div class="text-xs font-bold tracking-widest text-blue-400 uppercase mb-1">
                      {{ line.type === 'package' ? 'Pakket' : 'Artikel' }}
                    </div>
                    <h3 class="font-semibold text-white truncate">{{ line.name }}</h3>
                    <div class="text-sm text-gray-400 mt-0.5">
                      @if (line.pricePerDay != null) {
                        {{ line.pricePerDay | currency:'EUR' }}/dag × {{ cart.totalDays() }} dag(en)
                      } @else {
                        Vaste prijs: {{ line.priceFixed | currency:'EUR' }}
                      }
                    </div>
                  </div>

                  <!-- Aantal -->
                  @if (line.type === 'item') {
                    <div class="flex items-center border border-white/20 rounded-xl overflow-hidden shrink-0">
                      <button (click)="updateQty(line.type, line.id, line.quantity - 1)"
                              class="w-9 h-9 flex items-center justify-center text-white hover:bg-white/10 transition-colors font-bold text-lg">−</button>
                      <span class="w-8 text-center text-white font-semibold text-sm">{{ line.quantity }}</span>
                      <button (click)="updateQty(line.type, line.id, line.quantity + 1)"
                              [disabled]="line.stock != null && line.quantity >= line.stock"
                              class="w-9 h-9 flex items-center justify-center text-white hover:bg-white/10 disabled:opacity-30 transition-colors font-bold text-lg">+</button>
                    </div>
                  } @else {
                    <span class="text-xs text-gray-500 shrink-0">1 pakket</span>
                  }

                  <!-- Prijs -->
                  <div class="text-right shrink-0 min-w-[72px]">
                    <div class="font-bold text-white">
                      @if (line.pricePerDay != null) {
                        {{ line.pricePerDay * cart.totalDays() * line.quantity | currency:'EUR' }}
                      } @else {
                        {{ (line.priceFixed ?? 0) * line.quantity | currency:'EUR' }}
                      }
                    </div>
                  </div>

                  <!-- Verwijder -->
                  <button (click)="cart.removeItem(line.type, line.id)"
                          class="w-9 h-9 flex items-center justify-center text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors shrink-0">
                    <mat-icon class="text-base">delete</mat-icon>
                  </button>
                </div>
              }

              <!-- Datumkeuze -->
              <div class="dark-card rounded-2xl p-6 mt-2">
                <h3 class="font-semibold text-white mb-4 flex items-center gap-2">
                  <mat-icon class="text-blue-400 text-base">calendar_month</mat-icon>
                  Huurperiode kiezen
                </h3>
                <div class="flex gap-4 flex-wrap">
                  <div class="flex flex-col gap-1.5">
                    <label class="text-sm text-gray-400">Startdatum</label>
                    <input type="date" [(ngModel)]="startDate" (ngModelChange)="updateDates()"
                           [min]="today"
                           class="bg-white/5 border border-white/20 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 transition-colors">
                  </div>
                  <div class="flex flex-col gap-1.5">
                    <label class="text-sm text-gray-400">Einddatum</label>
                    <input type="date" [(ngModel)]="endDate" (ngModelChange)="updateDates()"
                           [min]="startDate || today"
                           class="bg-white/5 border border-white/20 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 transition-colors">
                  </div>
                </div>
                @if (startDate && endDate) {
                  <p class="text-sm text-blue-300 mt-3 flex items-center gap-1.5">
                    <mat-icon class="text-base">schedule</mat-icon>
                    Huurperiode: {{ cart.totalDays() }} dag(en)
                  </p>
                }
              </div>
            </div>

            <!-- Samenvatting -->
            <div class="dark-card rounded-2xl p-6 h-fit sticky top-6">
              <h3 class="text-lg font-bold text-white mb-5">Overzicht</h3>
              <div class="space-y-3 mb-5">
                @for (line of cart.lines(); track line.id) {
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-400 truncate mr-2">{{ line.name }} ×{{ line.quantity }}</span>
                    <span class="text-white font-medium shrink-0">
                      @if (line.pricePerDay != null) {
                        {{ line.pricePerDay * cart.totalDays() * line.quantity | currency:'EUR' }}
                      } @else {
                        {{ (line.priceFixed ?? 0) * line.quantity | currency:'EUR' }}
                      }
                    </span>
                  </div>
                }
              </div>
              <div class="border-t border-white/10 pt-4 mb-6">
                <div class="flex justify-between font-bold text-lg">
                  <span class="text-white">Totaal</span>
                  <span class="text-blue-300">{{ cart.total() | currency:'EUR' }}</span>
                </div>
                @if (!startDate || !endDate) {
                  <p class="text-xs text-yellow-400/70 mt-2">Kies een huurperiode voor het eindtotaal</p>
                }
              </div>
              <button (click)="goToBooking()" [disabled]="!startDate || !endDate"
                      class="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-xl transition-colors">
                <mat-icon class="text-base">arrow_forward</mat-icon>
                Doorgaan naar boeken
              </button>
              <p class="text-xs text-gray-600 mt-3 text-center flex items-center justify-center gap-1">
                <mat-icon class="text-xs">lock</mat-icon> Veilig betalen via Mollie
              </p>
            </div>

          </div>
        }
      </div>
    </div>
  `
})
export class CartComponent {
  startDate: string = '';
  endDate: string = '';
  today = new Date().toISOString().split('T')[0];

  constructor(public cart: CartService, private router: Router) {
    this.startDate = cart.startDate();
    this.endDate = cart.endDate();
  }

  updateQty(type: 'item' | 'package', id: number, qty: number): void {
    this.cart.updateQuantity(type, id, qty);
  }

  updateDates(): void {
    if (this.startDate && this.endDate && this.endDate < this.startDate) {
      this.endDate = '';
    }
    if (this.startDate && this.endDate) {
      this.cart.setDates(this.startDate, this.endDate);
    }
  }

  goToBooking(): void {
    this.router.navigate(['/boeken']);
  }
}
