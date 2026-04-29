import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Category } from '../../models/category.model';
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatCardModule, MatIconModule, MatSelectModule, MatFormFieldModule, FormsModule, CurrencyPipe, NgFor, NgIf],
  template: `
    <div class="container py-12">
      <h1 class="text-4xl font-bold mb-2">Losse artikelen</h1>
      <p class="text-gray-500 mb-8">Huur individuele artikelen voor jouw event</p>

      <div class="mb-6">
        <mat-form-field appearance="outline">
          <mat-label>Filter op categorie</mat-label>
          <mat-select [(ngModel)]="selectedCategory" (ngModelChange)="onCategoryChange()">
            <mat-option [value]="null">Alle categorieën</mat-option>
            <mat-option *ngFor="let cat of categories" [value]="cat.id">{{ cat.displayName }}</mat-option>
          </mat-select>
        </mat-form-field>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        @for (item of items; track item.id) {
          <div class="card-hover bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
            <div class="h-40 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              @if (item.imageUrl) {
                <img [src]="item.imageUrl" [alt]="item.name" class="w-full h-full object-cover">
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
  `
})
export class ItemsComponent implements OnInit {
  categories: Category[] = [];
  items: Item[] = [];
  selectedCategory: number | null = null;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getCategories().subscribe(cats => this.categories = cats);
    this.loadItems();
  }

  onCategoryChange(): void {
    this.loadItems();
  }

  private loadItems(): void {
    this.api.getItems(this.selectedCategory ?? undefined).subscribe(items => this.items = items);
  }
}
