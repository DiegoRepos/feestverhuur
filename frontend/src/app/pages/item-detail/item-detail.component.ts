import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe, NgIf } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { CartService } from '../../services/cart.service';
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-item-detail',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatIconModule, MatSnackBarModule, MatFormFieldModule, MatInputModule, FormsModule, CurrencyPipe, NgIf],
  template: `
    <div class="container py-12" *ngIf="item">
      <a routerLink="/artikelen" class="text-primary-600 hover:underline mb-6 inline-flex items-center gap-1">
        <mat-icon class="text-base">arrow_back</mat-icon> Terug naar artikelen
      </a>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-6">
        <div class="h-80 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center">
          @if (item.imageUrl) {
            <img [src]="item.imageUrl" [alt]="item.name" class="w-full h-full object-cover rounded-2xl">
          } @else {
            <mat-icon class="text-gray-400 text-8xl">inventory_2</mat-icon>
          }
        </div>
        <div>
          <span class="text-sm text-primary-600 font-semibold uppercase tracking-wide">{{ item.category?.displayName }}</span>
          <h1 class="text-4xl font-bold mt-2 mb-4">{{ item.name }}</h1>
          <p class="text-gray-600 mb-6">{{ item.description }}</p>

          <div class="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
            <div>
              <div class="text-sm text-gray-500">Prijs per dag</div>
              <div class="text-2xl font-bold text-primary-700">{{ item.pricePerDay | currency:'EUR' }}</div>
            </div>
            <div>
              <div class="text-sm text-gray-500">Waarborg</div>
              <div class="text-2xl font-bold text-gray-700">{{ item.deposit | currency:'EUR' }}</div>
            </div>
            <div>
              <div class="text-sm text-gray-500">Beschikbaar</div>
              <div class="text-base font-semibold" [class.text-green-600]="item.isAvailable" [class.text-red-500]="!item.isAvailable">
                {{ item.isAvailable ? 'Ja' : 'Niet beschikbaar' }}
              </div>
            </div>
            <div>
              <div class="text-sm text-gray-500">Op voorraad</div>
              <div class="text-base font-semibold">{{ item.stock }} stuks</div>
            </div>
          </div>

          <div class="flex items-center gap-4 mb-6">
            <mat-form-field appearance="outline" class="w-24">
              <mat-label>Aantal</mat-label>
              <input matInput type="number" [(ngModel)]="quantity" [min]="1" [max]="item.stock">
            </mat-form-field>
          </div>

          <button mat-raised-button color="primary" class="px-8 py-3 text-lg" (click)="addToCart()" [disabled]="!item.isAvailable">
            <mat-icon>add_shopping_cart</mat-icon>
            Toevoegen aan winkelwagen
          </button>
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

  addToCart(): void {
    if (!this.item) return;
    this.cart.addItem({
      type: 'item',
      id: this.item.id,
      name: this.item.name,
      pricePerDay: this.item.pricePerDay,
      quantity: this.quantity,
      imageUrl: this.item.imageUrl,
    });
    this.snack.open(`${this.item.name} toegevoegd aan winkelwagen`, 'OK', { duration: 3000 });
  }
}
