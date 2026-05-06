import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { AdminService } from '../../../services/admin.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatIconModule, FormsModule, CurrencyPipe, DatePipe],
  template: `
    <div class="bg-[#07071a] min-h-screen flex">

      <!-- Sidebar -->
      <aside class="w-60 min-h-screen bg-[#080818] border-r border-white/8 flex flex-col fixed top-0 left-0 z-40">
        <div class="p-5 border-b border-white/8">
          <div class="text-lg font-bold tracking-widest text-white">ZYVENTO</div>
          <div class="text-xs text-blue-400 font-semibold mt-0.5 tracking-wider uppercase">Admin Panel</div>
        </div>

        <nav class="flex-1 p-3 space-y-1 mt-2">
          <a routerLink="/admin/boekingen" routerLinkActive="bg-blue-600/15 text-white border-l-2 border-blue-500"
             class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all text-sm font-medium border-l-2 border-transparent">
            <mat-icon class="text-base shrink-0">receipt_long</mat-icon> Boekingen
          </a>
          <a routerLink="/admin/artikelen" routerLinkActive="bg-blue-600/15 text-white border-l-2 border-blue-500"
             class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all text-sm font-medium border-l-2 border-transparent">
            <mat-icon class="text-base shrink-0">inventory_2</mat-icon> Artikelen
          </a>
          <a routerLink="/admin/pakketten" routerLinkActive="bg-blue-600/15 text-white border-l-2 border-blue-500"
             class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all text-sm font-medium border-l-2 border-transparent">
            <mat-icon class="text-base shrink-0">celebration</mat-icon> Pakketten
          </a>
        </nav>

        <div class="p-3 border-t border-white/8">
          <button (click)="logout()"
                  class="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-400/10 transition-all text-sm font-medium">
            <mat-icon class="text-base shrink-0">logout</mat-icon> Uitloggen
          </button>
        </div>
      </aside>

      <!-- Content -->
      <main class="ml-60 flex-1 p-8">

        <!-- Header -->
        <div class="flex items-center justify-between mb-8">
          <div>
            <h1 class="text-2xl font-bold text-white">Boekingen</h1>
            <p class="text-gray-500 text-sm mt-0.5">Overzicht van alle klantboekingen</p>
          </div>
          <div class="text-sm text-gray-500">{{ bookings.length }} boeking(en)</div>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
          @for (s of statuses; track s.key) {
            <div class="dark-card rounded-xl p-4">
              <div class="text-xs text-gray-500 mb-1">{{ s.label }}</div>
              <div class="text-2xl font-bold" [class]="s.color">{{ count(s.key) }}</div>
            </div>
          }
        </div>

        <!-- Filter -->
        <div class="flex flex-wrap gap-2 mb-4">
          <button (click)="activeFilter = ''"
                  [class]="activeFilter === '' ? 'bg-white/15 text-white border-white/30' : 'text-gray-500 border-white/10 hover:text-white hover:border-white/25'"
                  class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors">
            Alle <span class="opacity-60">{{ bookings.length }}</span>
          </button>
          @for (s of statuses; track s.key) {
            <button (click)="activeFilter = s.key"
                    [class]="activeFilter === s.key ? s.activeCls : 'text-gray-500 border-white/10 hover:text-white hover:border-white/25'"
                    class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors">
              {{ s.label }} <span class="opacity-60">{{ count(s.key) }}</span>
            </button>
          }
        </div>

        <!-- Table -->
        <div class="dark-card rounded-2xl overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-white/8">
                  <th class="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">#</th>
                  <th class="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Klant</th>
                  <th class="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Periode</th>
                  <th class="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Totaal</th>
                  <th class="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th class="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Aangemaakt</th>
                </tr>
              </thead>
              <tbody>
                @for (b of filtered; track b.id) {
                  <tr class="border-b border-white/5 hover:bg-white/3 transition-colors">
                    <td class="px-5 py-4 text-gray-500 font-mono">{{ b.id }}</td>
                    <td class="px-5 py-4">
                      <div class="text-white font-medium">{{ b.customer?.firstName }} {{ b.customer?.lastName }}</div>
                      <div class="text-gray-500 text-xs">{{ b.customer?.email }}</div>
                    </td>
                    <td class="px-5 py-4 text-gray-300">{{ b.startDate }} — {{ b.endDate }}</td>
                    <td class="px-5 py-4 text-white font-semibold">{{ b.totalAmount | currency:'EUR' }}</td>
                    <td class="px-5 py-4">
                      <select [(ngModel)]="b.status" (ngModelChange)="updateStatus(b)"
                              class="bg-[#07071a] border border-white/15 text-white text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-blue-500 cursor-pointer">
                        <option value="PENDING">Wachtend</option>
                        <option value="PAID">Betaald</option>
                        <option value="CONFIRMED">Bevestigd</option>
                        <option value="CANCELLED">Geannuleerd</option>
                        <option value="REFUNDED">Terugbetaald</option>
                      </select>
                    </td>
                    <td class="px-5 py-4 text-gray-500 text-xs">{{ b.createdAt | date:'dd/MM/yy HH:mm' }}</td>
                  </tr>
                }
                @if (filtered.length === 0) {
                  <tr>
                    <td colspan="6" class="px-5 py-12 text-center text-gray-600">
                      {{ bookings.length === 0 ? 'Nog geen boekingen' : 'Geen boekingen met deze status' }}
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  `
})
export class BookingsComponent implements OnInit {
  bookings: any[] = [];

  activeFilter = '';

  statuses = [
    { key: 'PENDING',   label: 'Wachtend',    color: 'text-yellow-400', activeCls: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30' },
    { key: 'PAID',      label: 'Betaald',      color: 'text-green-400',  activeCls: 'bg-green-500/10 text-green-400 border-green-500/30'   },
    { key: 'CONFIRMED', label: 'Bevestigd',    color: 'text-blue-400',   activeCls: 'bg-blue-500/10 text-blue-400 border-blue-500/30'      },
    { key: 'CANCELLED', label: 'Geannuleerd',  color: 'text-red-400',    activeCls: 'bg-red-500/10 text-red-400 border-red-500/30'         },
    { key: 'REFUNDED',  label: 'Terugbetaald', color: 'text-gray-400',   activeCls: 'bg-gray-500/10 text-gray-400 border-gray-500/30'      },
  ];

  get filtered() {
    return this.activeFilter
      ? this.bookings.filter(b => b.status === this.activeFilter)
      : this.bookings;
  }

  constructor(private admin: AdminService, private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.admin.getBookings().subscribe(b => this.bookings = b);
  }

  count(status: string): number {
    return this.bookings.filter(b => b.status === status).length;
  }

  updateStatus(booking: any): void {
    this.admin.updateBookingStatus(booking.id, booking.status).subscribe();
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/admin/login']);
  }
}
