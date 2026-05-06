import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';
import { AdminService } from '../../../services/admin.service';
import { AuthService } from '../../../services/auth.service';
import { RentalPackage } from '../../../models/package.model';

@Component({
  selector: 'app-packages-admin',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatIconModule, CurrencyPipe],
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

        <div class="flex items-center justify-between mb-8">
          <div>
            <h1 class="text-2xl font-bold text-white">Pakketten</h1>
            <p class="text-gray-500 text-sm mt-0.5">Beheer van verhuurpakketten</p>
          </div>
          <div class="text-sm text-gray-500">{{ packages.length }} pakket(ten)</div>
        </div>

        <div class="dark-card rounded-2xl overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-white/8">
                  <th class="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">#</th>
                  <th class="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Naam</th>
                  <th class="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Categorie</th>
                  <th class="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Formule</th>
                  <th class="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Prijs v.a.</th>
                  <th class="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th class="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody>
                @for (p of packages; track p.id) {
                  <tr class="border-b border-white/5 hover:bg-white/3 transition-colors">
                    <td class="px-5 py-4 text-gray-500 font-mono">{{ p.id }}</td>
                    <td class="px-5 py-4 text-white font-medium">{{ p.name }}</td>
                    <td class="px-5 py-4">
                      <span class="text-xs bg-blue-400/10 text-blue-400 border border-blue-400/20 px-2 py-0.5 rounded-full">{{ p.category?.displayName }}</span>
                    </td>
                    <td class="px-5 py-4 text-gray-400 font-mono text-xs">{{ p.formula }}</td>
                    <td class="px-5 py-4 text-white font-semibold">{{ p.priceFrom | currency:'EUR' }}</td>
                    <td class="px-5 py-4">
                      @if (p.isActive) {
                        <span class="flex items-center gap-1 text-xs text-green-400"><span class="w-1.5 h-1.5 rounded-full bg-green-400"></span>Actief</span>
                      } @else {
                        <span class="flex items-center gap-1 text-xs text-gray-500"><span class="w-1.5 h-1.5 rounded-full bg-gray-500"></span>Inactief</span>
                      }
                    </td>
                    <td class="px-5 py-4">
                      <button (click)="delete(p.id)" title="Verwijderen"
                              class="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
                        <mat-icon class="text-base">delete</mat-icon>
                      </button>
                    </td>
                  </tr>
                }
                @if (packages.length === 0) {
                  <tr><td colspan="7" class="px-5 py-12 text-center text-gray-600">Geen pakketten gevonden</td></tr>
                }
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  `
})
export class PackagesAdminComponent implements OnInit {
  packages: RentalPackage[] = [];

  constructor(private admin: AdminService, private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.admin.getPackages().subscribe(p => this.packages = p);
  }

  delete(id: number): void {
    if (!confirm('Pakket verwijderen?')) return;
    this.admin.deletePackage(id).subscribe(() => {
      this.packages = this.packages.filter(p => p.id !== id);
    });
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/admin/login']);
  }
}
