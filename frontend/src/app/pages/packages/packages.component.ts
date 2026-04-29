import { Component, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { NgFor, NgIf, CurrencyPipe } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Category } from '../../models/category.model';
import { RentalPackage } from '../../models/package.model';

@Component({
  selector: 'app-packages',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatTabsModule, MatCardModule, MatIconModule, MatChipsModule, NgFor, NgIf, CurrencyPipe],
  template: `
    <div class="container py-12">
      <h1 class="text-4xl font-bold mb-2">Pakketten</h1>
      <p class="text-gray-500 mb-8">Kies het pakket dat bij jouw feest past</p>

      <mat-tab-group (selectedIndexChange)="onTabChange($event)" [selectedIndex]="selectedTab">
        <mat-tab label="Alle">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            @for (pkg of packages; track pkg.id) {
              <ng-container *ngTemplateOutlet="packageCard; context: {pkg}"></ng-container>
            }
          </div>
        </mat-tab>
        @for (cat of categories; track cat.id) {
          <mat-tab [label]="cat.displayName">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              @for (pkg of getByCategory(cat.id); track pkg.id) {
                <ng-container *ngTemplateOutlet="packageCard; context: {pkg}"></ng-container>
              }
            </div>
          </mat-tab>
        }
      </mat-tab-group>
    </div>

    <ng-template #packageCard let-pkg="pkg">
      <div class="card-hover bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
        <div class="h-48 bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center">
          @if (pkg.imageUrl) {
            <img [src]="pkg.imageUrl" [alt]="pkg.name" class="w-full h-full object-cover">
          } @else {
            <mat-icon class="text-white text-6xl opacity-60">celebration</mat-icon>
          }
        </div>
        <div class="p-5">
          <mat-chip class="mb-2 text-xs">{{ pkg.category?.displayName }}</mat-chip>
          <h3 class="text-xl font-bold mb-2">{{ pkg.name }}</h3>
          <p class="text-gray-500 text-sm mb-4 line-clamp-2">{{ pkg.description }}</p>
          <div class="flex items-center justify-between">
            <span class="text-2xl font-bold text-primary-700">v.a. {{ pkg.priceFrom | currency:'EUR':'symbol':'1.0-0' }}</span>
            <a [routerLink]="['/pakketten', pkg.id]" mat-raised-button color="primary">Bekijken</a>
          </div>
        </div>
      </div>
    </ng-template>
  `
})
export class PackagesComponent implements OnInit {
  categories: Category[] = [];
  packages: RentalPackage[] = [];
  selectedTab = 0;

  constructor(private api: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.api.getCategories().subscribe(cats => {
      this.categories = cats.filter(c => c.name !== 'EXTRA');
    });
    this.api.getPackages().subscribe(pkgs => this.packages = pkgs);

    this.route.queryParams.subscribe(params => {
      if (params['categoryId']) {
        const idx = this.categories.findIndex(c => c.id === +params['categoryId']);
        this.selectedTab = idx >= 0 ? idx + 1 : 0;
      }
    });
  }

  onTabChange(idx: number): void {
    this.selectedTab = idx;
  }

  getByCategory(categoryId: number): RentalPackage[] {
    return this.packages.filter(p => p.category?.id === categoryId);
  }
}
