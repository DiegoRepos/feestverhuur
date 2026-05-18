import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { AuthService } from '../../../services/auth.service';
import { ApiService } from '../../../services/api.service';
import { RentalPackage } from '../../../models/package.model';
import { Category } from '../../../models/category.model';

@Component({
  selector: 'app-packages-admin',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatIconModule, CurrencyPipe, FormsModule],
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
          <button (click)="openNew()"
                  class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
            <mat-icon class="text-base">add</mat-icon> Nieuw pakket
          </button>
        </div>

        <div class="dark-card rounded-2xl overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-white/8">
                  <th class="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Foto</th>
                  <th class="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Naam</th>
                  <th class="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Categorie</th>
                  <th class="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Prijs v.a.</th>
                  <th class="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th class="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody>
                @for (p of packages; track p.id) {
                  <tr class="border-b border-white/5 hover:bg-white/3 transition-colors">
                    <td class="px-5 py-3">
                      @if (p.imageUrl) {
                        <img [src]="p.imageUrl" [alt]="p.name" class="w-12 h-12 object-cover rounded-lg">
                      } @else {
                        <div class="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center">
                          <mat-icon class="text-gray-600 text-base">image_not_supported</mat-icon>
                        </div>
                      }
                    </td>
                    <td class="px-5 py-3 text-white font-medium">{{ p.name }}</td>
                    <td class="px-5 py-3">
                      <span class="text-xs bg-blue-400/10 text-blue-400 border border-blue-400/20 px-2 py-0.5 rounded-full">{{ p.category?.displayName }}</span>
                    </td>
                    <td class="px-5 py-3 text-white font-semibold">{{ p.priceFrom | currency:'EUR' }}</td>
                    <td class="px-5 py-3">
                      @if (p.isActive) {
                        <span class="flex items-center gap-1 text-xs text-green-400"><span class="w-1.5 h-1.5 rounded-full bg-green-400"></span>Actief</span>
                      } @else {
                        <span class="flex items-center gap-1 text-xs text-gray-500"><span class="w-1.5 h-1.5 rounded-full bg-gray-500"></span>Inactief</span>
                      }
                    </td>
                    <td class="px-5 py-3">
                      <div class="flex items-center gap-1">
                        <button (click)="openEdit(p)" title="Bewerken"
                                class="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors">
                          <mat-icon class="text-base">edit</mat-icon>
                        </button>
                        <button (click)="delete(p.id)" title="Verwijderen"
                                class="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
                          <mat-icon class="text-base">delete</mat-icon>
                        </button>
                      </div>
                    </td>
                  </tr>
                }
                @if (packages.length === 0) {
                  <tr><td colspan="6" class="px-5 py-12 text-center text-gray-600">Geen pakketten gevonden</td></tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>

    <!-- Bewerkmodal -->
    @if (editPkg) {
      <div class="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" (click)="closeEdit()">
        <div class="bg-[#0f0f2a] border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl max-h-[90vh] flex flex-col" (click)="$event.stopPropagation()">
          <div class="flex items-center justify-between p-6 pb-0 shrink-0">
            <h2 class="text-lg font-bold text-white">{{ isNew ? 'Nieuw pakket' : 'Pakket bewerken' }}</h2>
            <button (click)="closeEdit()" class="text-gray-500 hover:text-white transition-colors">
              <mat-icon>close</mat-icon>
            </button>
          </div>

          <div class="overflow-y-auto flex-1 px-6 py-4 space-y-4">
            <!-- Naam -->
            <div>
              <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Naam</label>
              <input [(ngModel)]="editPkg.name" type="text"
                     class="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors">
            </div>

            <!-- Beschrijving -->
            <div>
              <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Beschrijving</label>
              <textarea [(ngModel)]="editPkg.description" rows="3"
                        class="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none"></textarea>
            </div>

            <!-- Prijs & Actief -->
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Prijs v.a. (€)</label>
                <input [(ngModel)]="editPkg.priceFrom" type="number" step="0.01"
                       class="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors">
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Status</label>
                <select [(ngModel)]="editPkg.isActive"
                        class="w-full bg-[#0f0f2a] border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors">
                  <option [ngValue]="true">Actief</option>
                  <option [ngValue]="false">Inactief</option>
                </select>
              </div>
            </div>

            <!-- Categorie & Formule -->
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Categorie</label>
                <select [(ngModel)]="selectedCategoryId"
                        class="w-full bg-[#0f0f2a] border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors">
                  <option [ngValue]="null" disabled>Kies een categorie</option>
                  @for (cat of categories; track cat.id) {
                    <option [ngValue]="cat.id">{{ cat.displayName }}</option>
                  }
                </select>
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Formule label</label>
                <input [(ngModel)]="editPkg.formula" type="text" placeholder="bv. BASIC, VIP..."
                       class="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors">
              </div>
            </div>

            <!-- Foto -->
            <div>
              <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Foto</label>
              <div class="flex gap-2 mb-2">
                <input [(ngModel)]="editPkg.imageUrl" type="text" placeholder="https://... of upload hieronder"
                       class="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors">
              </div>
              <label class="flex items-center justify-center gap-2 w-full border border-dashed border-white/20 hover:border-blue-500/60 hover:bg-blue-500/5 rounded-lg py-3 cursor-pointer transition-colors text-sm text-gray-400 hover:text-blue-400">
                <mat-icon class="text-base">upload</mat-icon>
                Foto uploaden vanaf PC
                <input type="file" accept="image/*" class="hidden" (change)="onFileSelected($event)">
              </label>
            </div>

            <!-- Voorvertoning -->
            @if (editPkg.imageUrl) {
              <div class="rounded-xl overflow-hidden">
                <img [src]="editPkg.imageUrl" alt="Voorvertoning" class="w-full h-32 object-cover">
              </div>
            }
          </div>

          <div class="flex gap-3 p-6 pt-4 shrink-0 border-t border-white/8">
            <button (click)="saveEdit()" [disabled]="saving"
                    class="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg transition-colors text-sm">
              {{ saving ? (isNew ? 'Aanmaken...' : 'Opslaan...') : (isNew ? 'Aanmaken' : 'Opslaan') }}
            </button>
            <button (click)="closeEdit()"
                    class="px-5 border border-white/20 hover:border-white/40 text-white py-2.5 rounded-lg transition-colors text-sm">
              Annuleren
            </button>
          </div>
        </div>
      </div>
    }
  `
})
export class PackagesAdminComponent implements OnInit {
  packages: RentalPackage[] = [];
  categories: Category[] = [];
  editPkg: RentalPackage | null = null;
  selectedCategoryId: number | null = null;
  isNew = false;
  saving = false;

  constructor(private admin: AdminService, private auth: AuthService, private router: Router, private api: ApiService) {}

  ngOnInit(): void {
    this.admin.getPackages().subscribe(p => this.packages = p);
    this.api.getCategories().subscribe(cats => this.categories = cats.filter(c => !['EXTRA','GELUID','LICHT','EFFECTEN','MEUBILAIR','TENTEN'].includes(c.name)));
  }

  openNew(): void {
    this.isNew = true;
    this.selectedCategoryId = null;
    this.editPkg = { id: 0, name: '', description: '', priceFrom: 0, formula: '', imageUrl: '', isActive: true, category: null, packageItems: [] } as any;
  }

  openEdit(pkg: RentalPackage): void {
    this.isNew = false;
    this.selectedCategoryId = pkg.category?.id ?? null;
    this.editPkg = { ...pkg };
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file || !this.editPkg) return;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const img = new Image();
    img.onload = () => {
      const maxSize = 800;
      const ratio = Math.min(maxSize / img.width, maxSize / img.height, 1);
      canvas.width = img.width * ratio;
      canvas.height = img.height * ratio;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      this.editPkg!.imageUrl = canvas.toDataURL('image/jpeg', 0.85);
    };
    img.src = URL.createObjectURL(file);
  }

  closeEdit(): void {
    this.editPkg = null;
    this.isNew = false;
    this.saving = false;
  }

  saveEdit(): void {
    if (!this.editPkg) return;
    this.saving = true;
    const payload: any = { ...this.editPkg, category: this.selectedCategoryId ? { id: this.selectedCategoryId } : null };
    if (!this.editPkg.id) {
      this.admin.createPackage(payload).subscribe({
        next: created => { this.packages.push(created); this.closeEdit(); },
        error: () => { this.saving = false; }
      });
    } else {
      this.admin.updatePackage(this.editPkg.id, payload).subscribe({
        next: updated => {
          const idx = this.packages.findIndex(p => p.id === updated.id);
          if (idx !== -1) this.packages[idx] = updated;
          this.closeEdit();
        },
        error: () => { this.saving = false; }
      });
    }
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
