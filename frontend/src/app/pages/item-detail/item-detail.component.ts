import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CurrencyPipe, NgIf } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { CartService } from '../../services/cart.service';
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-item-detail',
  standalone: true,
  imports: [RouterLink, MatIconModule, MatSnackBarModule, CurrencyPipe, NgIf],
  template: `
    <div class="bg-[#07071a] min-h-screen" *ngIf="item">

      <!-- Hero breadcrumb -->
      <div class="hero-dark border-b border-white/5">
        <div class="container py-8 relative z-10">
          <nav class="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <a routerLink="/artikelen" class="hover:text-white transition-colors">Artikelen</a>
            <mat-icon class="text-base text-gray-600">chevron_right</mat-icon>
            <span class="text-blue-400">{{ item.category?.displayName }}</span>
            <mat-icon class="text-base text-gray-600">chevron_right</mat-icon>
            <span class="text-white">{{ item.name }}</span>
          </nav>
          <h1 class="text-3xl md:text-4xl font-bold text-white">{{ item.name }}</h1>
        </div>
      </div>

      <!-- Content -->
      <div class="container py-12">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          <!-- Links: productfoto -->
          <div class="bg-white rounded-2xl flex items-center justify-center p-10 shadow-2xl"
               style="min-height: 380px;">
            @if (item.imageUrl) {
              <img [src]="item.imageUrl" [alt]="item.name"
                   class="max-h-72 max-w-full object-contain mix-blend-multiply">
            } @else {
              <mat-icon class="text-gray-300" style="font-size: 96px; width: 96px; height: 96px;">inventory_2</mat-icon>
            }
          </div>

          <!-- Rechts: info -->
          <div class="flex flex-col gap-6">

            <!-- Categorie + beschikbaarheid -->
            <div class="flex items-center gap-3">
              <span class="text-xs font-bold tracking-widest text-blue-400 uppercase bg-blue-400/10 border border-blue-400/20 px-3 py-1 rounded-full">
                {{ item.category?.displayName }}
              </span>
              @if (item.isAvailable) {
                <span class="flex items-center gap-1 text-xs font-semibold text-green-400">
                  <span class="w-2 h-2 rounded-full bg-green-400"></span> Beschikbaar
                </span>
              } @else {
                <span class="flex items-center gap-1 text-xs font-semibold text-red-400">
                  <span class="w-2 h-2 rounded-full bg-red-400"></span> Niet beschikbaar
                </span>
              }
            </div>

            <!-- Beschrijving -->
            <p class="text-gray-400 leading-relaxed">{{ item.description }}</p>

            <!-- Prijzen grid -->
            <div class="grid grid-cols-2 gap-3">
              <div class="dark-card rounded-xl p-4">
                <div class="text-xs text-gray-500 mb-1">Per dag</div>
                <div class="text-xl font-bold text-white">{{ item.pricePerDay | currency:'EUR' }}</div>
              </div>
              @if (item.pricePerWeekend) {
                <div class="dark-card rounded-xl p-4">
                  <div class="text-xs text-gray-500 mb-1">Per weekend</div>
                  <div class="text-xl font-bold text-white">{{ item.pricePerWeekend | currency:'EUR' }}</div>
                </div>
              }
              @if (item.pricePerWeek) {
                <div class="dark-card rounded-xl p-4">
                  <div class="text-xs text-gray-500 mb-1">Per week</div>
                  <div class="text-xl font-bold text-white">{{ item.pricePerWeek | currency:'EUR' }}</div>
                </div>
              }
              <div class="dark-card rounded-xl p-4">
                <div class="text-xs text-gray-500 mb-1">Waarborg</div>
                <div class="text-xl font-bold text-blue-300">{{ item.deposit | currency:'EUR' }}</div>
              </div>
            </div>

            <!-- Voorraad -->
            <div class="flex items-center gap-2 text-sm text-gray-400">
              <mat-icon class="text-base text-gray-500">inventory_2</mat-icon>
              <span>{{ item.stock }} stuks op voorraad</span>
            </div>

            <!-- Aantal + knop -->
            <div class="flex items-center gap-4">
              <!-- Aantal selector -->
              <div class="flex items-center border border-white/20 rounded-xl overflow-hidden">
                <button (click)="decrement()"
                        class="w-10 h-11 flex items-center justify-center text-white hover:bg-white/10 transition-colors text-lg font-bold">
                  −
                </button>
                <span class="w-10 text-center text-white font-semibold text-sm">{{ quantity }}</span>
                <button (click)="increment()"
                        class="w-10 h-11 flex items-center justify-center text-white hover:bg-white/10 transition-colors text-lg font-bold">
                  +
                </button>
              </div>

              <!-- Toevoegen -->
              <button (click)="addToCart()" [disabled]="!item.isAvailable || maxAddable <= 0"
                      class="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-xl transition-colors">
                <mat-icon class="text-base">add_shopping_cart</mat-icon>
                {{ maxAddable <= 0 ? 'Max bereikt' : 'Toevoegen aan winkelwagen' }}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  `
})
export class ItemDetailComponent implements OnInit {
  item?: Item;
  quantity = 1;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private cart: CartService,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.api.getItem(id).subscribe(i => this.item = i);
  }

  get cartQuantity(): number {
    return this.cart.lines().find(l => l.type === 'item' && l.id === this.item?.id)?.quantity ?? 0;
  }

  get maxAddable(): number {
    return (this.item?.stock ?? 0) - this.cartQuantity;
  }

  increment(): void {
    if (this.quantity < this.maxAddable) this.quantity++;
  }

  decrement(): void {
    if (this.quantity > 1) this.quantity--;
  }

  addToCart(): void {
    if (!this.item) return;
    if (this.maxAddable <= 0) {
      this.snack.open('Maximum aantal al in winkelwagen', 'OK', { duration: 3000 });
      return;
    }
    const qty = Math.min(this.quantity, this.maxAddable);
    this.cart.addItem({
      type: 'item',
      id: this.item.id,
      name: this.item.name,
      pricePerDay: this.item.pricePerDay,
      quantity: qty,
      stock: this.item.stock,
      imageUrl: this.item.imageUrl,
    });
    this.quantity = 1;
    this.snack.open(`${this.item.name} toegevoegd aan winkelwagen`, 'OK', { duration: 3000 });
  }
}
