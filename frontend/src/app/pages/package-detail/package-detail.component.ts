import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { CartService } from '../../services/cart.service';
import { RentalPackage } from '../../models/package.model';

@Component({
  selector: 'app-package-detail',
  standalone: true,
  imports: [RouterLink, MatIconModule, MatSnackBarModule, CurrencyPipe, NgFor, NgIf],
  template: `
    <div class="bg-[#07071a] min-h-screen" *ngIf="pkg">

      <!-- Hero breadcrumb -->
      <div class="hero-dark border-b border-white/5">
        <div class="container py-8 relative z-10">
          <nav class="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <a routerLink="/pakketten" class="hover:text-white transition-colors">Pakketten</a>
            <mat-icon class="text-base text-gray-600">chevron_right</mat-icon>
            <span class="text-blue-400">{{ pkg.category?.displayName }}</span>
            <mat-icon class="text-base text-gray-600">chevron_right</mat-icon>
            <span class="text-white">{{ pkg.name }}</span>
          </nav>
          <h1 class="text-3xl md:text-4xl font-bold text-white">{{ pkg.name }}</h1>
        </div>
      </div>

      <!-- Content -->
      <div class="container py-12">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          <!-- Links: afbeelding -->
          <div class="rounded-2xl overflow-hidden shadow-2xl relative" style="min-height: 380px;">
            <img [src]="pkg.imageUrl || categoryImage(pkg.category?.name)"
                 [alt]="pkg.name"
                 class="w-full h-full object-cover absolute inset-0" style="min-height: 380px;">
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <!-- Formule badge -->
            <span class="absolute top-4 right-4 text-sm font-bold tracking-widest uppercase bg-black/40 backdrop-blur-sm border border-white/20 text-white px-3 py-1.5 rounded-full">
              {{ pkg.formula }}
            </span>
          </div>

          <!-- Rechts: info -->
          <div class="flex flex-col gap-6">

            <!-- Categorie badge + formule -->
            <div class="flex items-center gap-3 flex-wrap">
              <span class="text-xs font-bold tracking-widest text-blue-400 uppercase bg-blue-400/10 border border-blue-400/20 px-3 py-1 rounded-full">
                {{ pkg.category?.displayName }}
              </span>
              <span class="text-xs font-bold tracking-widest text-purple-400 uppercase bg-purple-400/10 border border-purple-400/20 px-3 py-1 rounded-full">
                {{ pkg.formula }}
              </span>
            </div>

            <!-- Beschrijving -->
            <p class="text-gray-400 leading-relaxed">{{ pkg.description }}</p>

            <!-- Inbegrepen items -->
            @if (pkg.packageItems && pkg.packageItems.length > 0) {
              <div class="dark-card rounded-xl p-5">
                <h3 class="text-white font-semibold mb-4 flex items-center gap-2">
                  <mat-icon class="text-blue-400 text-base">checklist</mat-icon>
                  Inbegrepen in dit pakket
                </h3>
                <ul class="space-y-2">
                  <li *ngFor="let pi of pkg.packageItems"
                      class="flex items-center gap-3 text-sm text-gray-300">
                    <span class="w-6 h-6 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center flex-shrink-0">
                      <mat-icon class="text-green-400" style="font-size: 14px; width: 14px; height: 14px;">check</mat-icon>
                    </span>
                    <span><span class="text-white font-medium">{{ pi.quantity }}×</span> {{ pi.itemName }}</span>
                  </li>
                </ul>
              </div>
            }

            <!-- Prijs -->
            <div class="dark-card rounded-xl p-5 flex items-center justify-between">
              <div>
                <div class="text-xs text-gray-500 mb-1">Startprijs vanaf</div>
                <div class="text-4xl font-bold text-white">{{ pkg.priceFrom | currency:'EUR' }}</div>
                <div class="text-xs text-gray-500 mt-1">Exacte prijs op maat via offerte</div>
              </div>
              <mat-icon class="text-blue-400/30" style="font-size: 64px; width: 64px; height: 64px;">celebration</mat-icon>
            </div>

            <!-- Toevoegen knop -->
            <button (click)="addToCart()"
                    class="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3.5 rounded-xl transition-colors text-base">
              <mat-icon class="text-base">add_shopping_cart</mat-icon>
              Toevoegen aan winkelwagen
            </button>

            <!-- Offerte aanvragen -->
            <a routerLink="/contact"
               class="flex items-center justify-center gap-2 border border-white/20 hover:border-white/50 text-white px-6 py-3 rounded-xl transition-colors text-sm">
              <mat-icon class="text-base">mail</mat-icon>
              Offerte aanvragen
            </a>

          </div>
        </div>
      </div>
    </div>
  `
})
export class PackageDetailComponent implements OnInit {
  pkg?: RentalPackage;

  private readonly images: Record<string, string> = {
    KINDERFEEST:   'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&h=500&q=80',
    SWEET_16:      'https://images.unsplash.com/photo-1575132246077-e597d2f15549?auto=format&fit=crop&w=800&h=500&q=80',
    EVENT_STYLING: 'https://images.unsplash.com/photo-1776267890230-94f1926c30ef?auto=format&fit=crop&w=800&h=500&q=80',
    TROUWFEEST:    'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=800&h=500&q=80',
    SIMPLE_PARTY:  'https://images.unsplash.com/photo-1718096551424-910dff37709f?auto=format&fit=crop&w=800&h=500&q=80',
  };

  categoryImage(name?: string): string {
    return this.images[name ?? ''] ?? 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&h=500&q=80';
  }

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private cart: CartService,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.api.getPackage(id).subscribe(p => this.pkg = p);
  }

  addToCart(): void {
    if (!this.pkg) return;
    this.cart.addItem({
      type: 'package',
      id: this.pkg.id,
      name: this.pkg.name,
      priceFixed: this.pkg.priceFrom,
      quantity: 1,
      imageUrl: this.pkg.imageUrl,
    });
    this.snack.open(`${this.pkg.name} toegevoegd aan winkelwagen`, 'OK', { duration: 3000 });
  }
}
