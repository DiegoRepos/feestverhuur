import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { AuthService } from '../../../services/auth.service';
import { ApiService } from '../../../services/api.service';
import { Item } from '../../../models/item.model';
import { Category } from '../../../models/category.model';

@Component({
  selector: 'app-items-admin',
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
            <h1 class="text-2xl font-bold text-white">Artikelen</h1>
            <p class="text-gray-500 text-sm mt-0.5">Beheer van verhuurartikelen</p>
          </div>
          <button (click)="openNew()"
                  class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
            <mat-icon class="text-base">add</mat-icon> Nieuw artikel
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
                  <th class="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Prijs/dag</th>
                  <th class="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Stock</th>
                  <th class="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th class="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody>
                @for (i of items; track i.id) {
                  <tr class="border-b border-white/5 hover:bg-white/3 transition-colors">
                    <td class="px-5 py-3">
                      @if (i.imageUrl) {
                        <img [src]="i.imageUrl" [alt]="i.name" class="w-12 h-12 object-contain bg-white rounded-lg p-1">
                      } @else {
                        <div class="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center">
                          <mat-icon class="text-gray-600 text-base">image_not_supported</mat-icon>
                        </div>
                      }
                    </td>
                    <td class="px-5 py-3 text-white font-medium">{{ i.name }}</td>
                    <td class="px-5 py-3">
                      <span class="text-xs bg-blue-400/10 text-blue-400 border border-blue-400/20 px-2 py-0.5 rounded-full">{{ i.category?.displayName }}</span>
                    </td>
                    <td class="px-5 py-3 text-gray-300">{{ i.pricePerDay | currency:'EUR' }}</td>
                    <td class="px-5 py-3">
                      <span class="font-semibold" [class.text-green-400]="i.stock > 2" [class.text-yellow-400]="i.stock <= 2 && i.stock > 0" [class.text-red-400]="i.stock === 0">{{ i.stock }}</span>
                    </td>
                    <td class="px-5 py-3">
                      @if (i.isAvailable) {
                        <span class="flex items-center gap-1 text-xs text-green-400"><span class="w-1.5 h-1.5 rounded-full bg-green-400"></span>Beschikbaar</span>
                      } @else {
                        <span class="flex items-center gap-1 text-xs text-red-400"><span class="w-1.5 h-1.5 rounded-full bg-red-400"></span>Niet beschikbaar</span>
                      }
                    </td>
                    <td class="px-5 py-3">
                      <div class="flex items-center gap-1">
                        <button (click)="openEdit(i)" title="Bewerken"
                                class="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors">
                          <mat-icon class="text-base">edit</mat-icon>
                        </button>
                        <button (click)="delete(i.id)" title="Verwijderen"
                                class="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
                          <mat-icon class="text-base">delete</mat-icon>
                        </button>
                      </div>
                    </td>
                  </tr>
                }
                @if (items.length === 0) {
                  <tr><td colspan="7" class="px-5 py-12 text-center text-gray-600">Geen artikelen gevonden</td></tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>

    <!-- Bewerkmodal -->
    @if (editItem) {
      <div class="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" (click)="closeEdit()">
        <div class="bg-[#0f0f2a] border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl max-h-[90vh] flex flex-col" (click)="$event.stopPropagation()">
          <div class="flex items-center justify-between p-6 pb-0 shrink-0">
            <h2 class="text-lg font-bold text-white">{{ isNew ? 'Nieuw artikel' : 'Artikel bewerken' }}</h2>
            <button (click)="closeEdit()" class="text-gray-500 hover:text-white transition-colors">
              <mat-icon>close</mat-icon>
            </button>
          </div>

          <div class="overflow-y-auto flex-1 px-6 py-4 space-y-4">
            <!-- Naam -->
            <div>
              <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Naam</label>
              <input [(ngModel)]="editItem.name" type="text"
                     class="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors">
            </div>

            <!-- Beschrijving -->
            <div>
              <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Beschrijving</label>
              <textarea [(ngModel)]="editItem.description" rows="3"
                        class="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none"></textarea>
            </div>

            <!-- Prijs & Waarborg -->
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Prijs per dag (€)</label>
                <input [(ngModel)]="editItem.pricePerDay" type="number" step="0.01"
                       class="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors">
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Waarborg (€)</label>
                <input [(ngModel)]="editItem.deposit" type="number" step="0.01"
                       class="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors">
              </div>
            </div>

            <!-- Stock & Beschikbaar -->
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Stock</label>
                <input [(ngModel)]="editItem.stock" type="number" min="0"
                       class="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors">
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Beschikbaar</label>
                <select [(ngModel)]="editItem.isAvailable"
                        class="w-full bg-[#0f0f2a] border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors">
                  <option [ngValue]="true">Ja</option>
                  <option [ngValue]="false">Nee</option>
                </select>
              </div>
            </div>

            <!-- Categorie -->
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

            <!-- Foto -->
            <div>
              <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Foto</label>
              <div class="flex gap-2 mb-2">
                <input [(ngModel)]="editItem.imageUrl" type="text" placeholder="https://... of upload hieronder"
                       class="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors">
              </div>
              <label class="flex items-center justify-center gap-2 w-full border border-dashed border-white/20 hover:border-blue-500/60 hover:bg-blue-500/5 rounded-lg py-3 cursor-pointer transition-colors text-sm text-gray-400 hover:text-blue-400">
                <mat-icon class="text-base">upload</mat-icon>
                Foto uploaden vanaf PC
                <input type="file" accept="image/*" class="hidden" (change)="onFileSelected($event)">
              </label>
            </div>

            <!-- Voorvertoning -->
            @if (editItem.imageUrl) {
              <div class="flex justify-center bg-white rounded-xl p-3">
                <img [src]="editItem.imageUrl" alt="Voorvertoning" class="max-h-32 object-contain mix-blend-multiply">
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
export class ItemsAdminComponent implements OnInit {
  items: Item[] = [];
  categories: Category[] = [];
  editItem: Item | null = null;
  selectedCategoryId: number | null = null;
  isNew = false;
  saving = false;

  constructor(private admin: AdminService, private auth: AuthService, private router: Router, private api: ApiService) {}

  ngOnInit(): void {
    this.admin.getItems().subscribe(i => this.items = i);
    this.api.getCategories().subscribe(cats => this.categories = cats.filter(c => c.name !== 'EXTRA'));
  }

  openNew(): void {
    this.isNew = true;
    this.selectedCategoryId = null;
    this.editItem = { id: 0, name: '', description: '', pricePerDay: 0, pricePerWeekend: null, pricePerWeek: null, deposit: 0, stock: 1, imageUrl: '', isAvailable: true, category: null } as any;
  }

  openEdit(item: Item): void {
    this.isNew = false;
    this.selectedCategoryId = item.category?.id ?? null;
    this.editItem = { ...item };
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file || !this.editItem) return;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const img = new Image();
    img.onload = () => {
      const maxSize = 800;
      const ratio = Math.min(maxSize / img.width, maxSize / img.height, 1);
      canvas.width = img.width * ratio;
      canvas.height = img.height * ratio;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      this.editItem!.imageUrl = canvas.toDataURL('image/jpeg', 0.85);
    };
    img.src = URL.createObjectURL(file);
  }

  closeEdit(): void {
    this.editItem = null;
    this.isNew = false;
    this.saving = false;
  }

  saveEdit(): void {
    if (!this.editItem) return;
    this.saving = true;
    const payload: any = { ...this.editItem, category: this.selectedCategoryId ? { id: this.selectedCategoryId } : null };
    if (!this.editItem.id) {
      this.admin.createItem(payload).subscribe({
        next: created => { this.items.push(created); this.closeEdit(); },
        error: () => { this.saving = false; }
      });
    } else {
      this.admin.updateItem(this.editItem.id, payload).subscribe({
        next: updated => {
          const idx = this.items.findIndex(i => i.id === updated.id);
          if (idx !== -1) this.items[idx] = updated;
          this.closeEdit();
        },
        error: () => { this.saving = false; }
      });
    }
  }

  delete(id: number): void {
    if (!confirm('Artikel verwijderen?')) return;
    this.admin.deleteItem(id).subscribe(() => {
      this.items = this.items.filter(i => i.id !== id);
    });
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/admin/login']);
  }
}
