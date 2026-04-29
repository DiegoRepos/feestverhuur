import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatButtonModule, MatIconModule, MatBadgeModule],
  template: `
    <header class="bg-primary-900 text-white shadow-lg sticky top-0 z-50">
      <div class="container flex items-center justify-between h-16">
        <a routerLink="/" class="flex items-center gap-2 text-xl font-bold">
          <mat-icon>celebration</mat-icon>
          <span>Feestverhuur</span>
        </a>
        <nav class="hidden md:flex items-center gap-6 text-sm font-medium">
          <a routerLink="/pakketten" routerLinkActive="text-accent-400" class="hover:text-accent-400 transition-colors">Pakketten</a>
          <a routerLink="/artikelen" routerLinkActive="text-accent-400" class="hover:text-accent-400 transition-colors">Losse artikelen</a>
          <a routerLink="/contact" routerLinkActive="text-accent-400" class="hover:text-accent-400 transition-colors">Contact</a>
        </nav>
        <a routerLink="/winkelwagen" mat-icon-button>
          <mat-icon [matBadge]="cartService.count()" [matBadgeHidden]="cartService.count() === 0" matBadgeColor="accent">
            shopping_cart
          </mat-icon>
        </a>
      </div>
    </header>
  `
})
export class HeaderComponent {
  constructor(public cartService: CartService) {}
}
