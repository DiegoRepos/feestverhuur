import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe, NgFor } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Category } from '../../models/category.model';
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatCardModule, MatIconModule, FormsModule, CurrencyPipe, NgFor],
  template: `
    <div class="bg-[#07071a] min-h-screen">

      <!-- Hero breadcrumb -->
      <div class="hero-dark border-b border-white/5">
        <div class="container py-8 relative z-10">
          <nav class="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <a routerLink="/" class="hover:text-white transition-colors">Home</a>
            <mat-icon class="text-base text-gray-600">chevron_right</mat-icon>
            <span class="text-white">Artikelen</span>
          </nav>
          <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">Losse artikelen</h1>
          <p class="text-blue-300">Huur individuele artikelen voor jouw event</p>
        </div>
      </div>

    <div class="container py-10">

      <div class="mb-6">
        <select [(ngModel)]="selectedCategory" (ngModelChange)="onCategoryChange()"
                class="border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-primary-500">
          <option [ngValue]="null">Alle categorieën</option>
          <option *ngFor="let cat of categories" [ngValue]="cat.id">{{ cat.displayName }}</option>
        </select>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        @for (item of items; track item.id) {
          <div class="card-hover bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
            <div class="h-44 bg-white flex items-center justify-center p-4">
              @if (item.imageUrl) {
                <img [src]="item.imageUrl" [alt]="item.name" class="max-h-full max-w-full object-contain mix-blend-multiply">
              } @else {
                <mat-icon class="text-gray-400 text-5xl">inventory_2</mat-icon>
              }
            </div>
            <div class="p-4">
              <h3 class="font-bold text-base mb-1">{{ item.name }}</h3>
              <p class="text-gray-500 text-xs mb-3 line-clamp-2">{{ item.description }}</p>
              <div class="flex items-center justify-between">
                <div>
                  <div class="font-bold text-primary-700">{{ item.pricePerDay | currency:'EUR' }}/dag</div>
                  <div class="text-xs text-gray-400">Waarborg: {{ item.deposit | currency:'EUR' }}</div>
                </div>
                <a [routerLink]="['/artikelen', item.id]" mat-raised-button color="primary" class="text-sm">Bekijken</a>
              </div>
            </div>
          </div>
        }
      </div>

      @if (items.length === 0) {
        <div class="text-center py-16 text-gray-400">
          <mat-icon class="text-6xl mb-4">search_off</mat-icon>
          <p>Geen artikelen gevonden</p>
        </div>
      }
    </div>
    </div>
  `
})
export class ItemsComponent implements OnInit {
  categories: Category[] = [];
  items: Item[] = [];
  selectedCategory: number | null = null;

  constructor(private api: ApiService) {}

  private readonly itemCategories = ['GELUID', 'LICHT', 'EFFECTEN'];

  ngOnInit(): void {
    this.api.getCategories().subscribe(cats => {
      this.categories = cats.filter(c => this.itemCategories.includes(c.name));
    });
    this.loadItems();
  }

  onCategoryChange(): void {
    this.loadItems();
  }

  private loadItems(): void {
    this.api.getItems(this.selectedCategory ?? undefined).subscribe(items => this.items = items);
  }
}
