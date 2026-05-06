import { Component, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe, NgFor } from '@angular/common';
import { combineLatest } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Category } from '../../models/category.model';
import { RentalPackage } from '../../models/package.model';

@Component({
  selector: 'app-packages',
  standalone: true,
  imports: [RouterLink, MatIconModule, CurrencyPipe, NgFor],
  template: `
    <div class="bg-[#07071a] min-h-screen">

      <!-- Hero breadcrumb -->
      <div class="hero-dark border-b border-white/5">
        <div class="container py-8 relative z-10">
          <nav class="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <a routerLink="/" class="hover:text-white transition-colors">Home</a>
            <mat-icon class="text-base text-gray-600">chevron_right</mat-icon>
            <span class="text-white">Pakketten</span>
          </nav>
          <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">Pakketten</h1>
          <p class="text-blue-300">Kies het pakket dat bij jouw feest past</p>
        </div>
      </div>

      <div class="container py-10">

        <!-- Categorie filter -->
        <div class="flex flex-wrap gap-2 mb-8">
          <button (click)="selectCategory(null)"
                  [class]="selectedCategoryId === null
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-transparent text-gray-400 border-white/20 hover:border-white/50 hover:text-white'"
                  class="border px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Alle
          </button>
          <button *ngFor="let cat of categories"
                  (click)="selectCategory(cat.id)"
                  [class]="selectedCategoryId === cat.id
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-transparent text-gray-400 border-white/20 hover:border-white/50 hover:text-white'"
                  class="border px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            {{ cat.displayName }}
          </button>
        </div>

        <!-- Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (pkg of filteredPackages(); track pkg.id) {
            <div class="dark-card rounded-2xl overflow-hidden flex flex-col text-white">

              <!-- Foto -->
              <div class="h-48 overflow-hidden relative">
                <img [src]="categoryImage(pkg.category?.name)"
                     [alt]="pkg.name"
                     class="w-full h-full object-cover transition-transform duration-500 hover:scale-105">
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <!-- Formule badge -->
                <span class="absolute top-3 right-3 text-xs font-bold tracking-widest uppercase bg-black/40 backdrop-blur-sm border border-white/20 text-white px-2.5 py-1 rounded-full">
                  {{ pkg.formula }}
                </span>
              </div>

              <!-- Info -->
              <div class="p-5 flex flex-col flex-1">
                <p class="text-xs font-bold tracking-widest text-blue-400 uppercase mb-1">
                  {{ pkg.category?.displayName }}
                </p>
                <h3 class="text-lg font-bold text-white mb-2">{{ pkg.name }}</h3>
                <p class="text-gray-400 text-sm leading-relaxed flex-1 mb-4 line-clamp-2">
                  {{ pkg.description }}
                </p>
                <div class="flex items-center justify-between pt-3 border-t border-white/10">
                  <div>
                    <span class="text-xs text-gray-500">Vanaf</span>
                    <div class="text-xl font-bold text-white">{{ pkg.priceFrom | currency:'EUR':'symbol':'1.0-0' }}</div>
                  </div>
                  <a [routerLink]="['/pakketten', pkg.id]"
                     class="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
                    Bekijken
                  </a>
                </div>
              </div>

            </div>
          }
        </div>

        <!-- Leeg -->
        @if (filteredPackages().length === 0) {
          <div class="text-center py-16 text-gray-500">
            <mat-icon class="text-6xl mb-4">search_off</mat-icon>
            <p>Geen pakketten gevonden</p>
          </div>
        }

      </div>
    </div>
  `
})
export class PackagesComponent implements OnInit {
  categories: Category[] = [];
  packages: RentalPackage[] = [];
  selectedCategoryId: number | null = null;

  private readonly hiddenCategories = ['EXTRA', 'GELUID', 'LICHT', 'EFFECTEN'];

  private readonly images: Record<string, string> = {
    KINDERFEEST:   'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=600&h=400&q=80',
    SWEET_16:      'https://images.unsplash.com/photo-1575132246077-e597d2f15549?auto=format&fit=crop&w=600&h=400&q=80',
    EVENT_STYLING: 'https://images.unsplash.com/photo-1776267890230-94f1926c30ef?auto=format&fit=crop&w=600&h=400&q=80',
    TROUWFEEST:    'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=600&h=400&q=80',
    SIMPLE_PARTY:  'https://images.unsplash.com/photo-1718096551424-910dff37709f?auto=format&fit=crop&w=600&h=400&q=80',
  };

  constructor(private api: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    combineLatest([
      this.api.getCategories(),
      this.api.getPackages(),
      this.route.queryParams
    ]).subscribe(([cats, pkgs, params]) => {
      this.categories = cats.filter(c => !this.hiddenCategories.includes(c.name));
      this.packages = pkgs;
      if (params['categoryId']) {
        this.selectedCategoryId = +params['categoryId'];
      }
    });
  }

  selectCategory(id: number | null): void {
    this.selectedCategoryId = id;
  }

  filteredPackages(): RentalPackage[] {
    if (this.selectedCategoryId === null) return this.packages;
    return this.packages.filter(p => p.category?.id === this.selectedCategoryId);
  }

  categoryImage(name?: string): string {
    return this.images[name ?? ''] ?? 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=600&h=400&q=80';
  }
}
