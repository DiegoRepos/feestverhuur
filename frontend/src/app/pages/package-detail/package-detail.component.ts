import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { CartService } from '../../services/cart.service';
import { RentalPackage } from '../../models/package.model';

@Component({
  selector: 'app-package-detail',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatIconModule, MatSnackBarModule, CurrencyPipe, NgFor, NgIf],
  template: `
    <div class="container py-12" *ngIf="pkg">
      <a routerLink="/pakketten" class="text-primary-600 hover:underline mb-6 inline-flex items-center gap-1">
        <mat-icon class="text-base">arrow_back</mat-icon> Terug naar pakketten
      </a>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-6">
        <div class="h-96 bg-gradient-to-br from-primary-600 to-accent-500 rounded-2xl flex items-center justify-center">
          @if (pkg.imageUrl) {
            <img [src]="pkg.imageUrl" [alt]="pkg.name" class="w-full h-full object-cover rounded-2xl">
          } @else {
            <mat-icon class="text-white text-8xl opacity-60">celebration</mat-icon>
          }
        </div>
        <div>
          <span class="text-sm text-primary-600 font-semibold uppercase tracking-wide">{{ pkg.category?.displayName }}</span>
          <h1 class="text-4xl font-bold mt-2 mb-4">{{ pkg.name }}</h1>
          <p class="text-gray-600 mb-6">{{ pkg.description }}</p>

          @if (pkg.packageItems.length > 0) {
            <div class="mb-6">
              <h3 class="font-semibold mb-2">Inbegrepen in dit pakket:</h3>
              <ul class="space-y-1">
                <li *ngFor="let pi of pkg.packageItems" class="flex items-center gap-2 text-sm text-gray-600">
                  <mat-icon class="text-green-500 text-base">check_circle</mat-icon>
                  {{ pi.quantity }}× {{ pi.itemName }}
                </li>
              </ul>
            </div>
          }

          <div class="text-4xl font-bold text-primary-700 mb-8">
            v.a. {{ pkg.priceFrom | currency:'EUR' }}
          </div>

          <div class="flex gap-4">
            <button mat-raised-button color="primary" class="px-8 py-3 text-lg" (click)="addToCart()">
              <mat-icon>add_shopping_cart</mat-icon>
              Toevoegen aan winkelwagen
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class PackageDetailComponent implements OnInit {
  pkg?: RentalPackage;

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
