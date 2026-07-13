import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatIconModule, MatBadgeModule],
  template: `
    @if (!isAdminRoute) {
      <header class="bg-[#07071a]/75 backdrop-blur-md border-b border-white/10 text-white sticky top-0 z-50">
        <div class="container flex items-center justify-between h-16">
          <a routerLink="/" class="text-xl font-bold tracking-widest">ZYVENTO</a>
          <nav class="hidden md:flex items-center gap-7 text-sm font-medium text-gray-300">
            <a routerLink="/" routerLinkActive="text-white" [routerLinkActiveOptions]="{exact:true}" class="hover:text-white transition-colors">Home</a>
            <a routerLink="/pakketten" routerLinkActive="text-white" class="hover:text-white transition-colors">Pakketten</a>
            <a routerLink="/artikelen" routerLinkActive="text-white" class="hover:text-white transition-colors">Artikelen</a>
            <a routerLink="/partners" routerLinkActive="text-white" class="hover:text-white transition-colors">Partners</a>
          </nav>
          <div class="flex items-center gap-3">
            <a routerLink="/winkelwagen" class="relative p-2 text-gray-300 hover:text-white transition-colors">
              <mat-icon [matBadge]="cartService.count()" [matBadgeHidden]="cartService.count() === 0" matBadgeColor="accent">shopping_cart</mat-icon>
            </a>
            <a routerLink="/contact" class="hidden sm:inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors">
              Offerte aanvragen
            </a>
            <button (click)="mobileMenuOpen = !mobileMenuOpen" type="button"
                    class="md:hidden p-2 text-gray-300 hover:text-white transition-colors">
              <mat-icon>{{ mobileMenuOpen ? 'close' : 'menu' }}</mat-icon>
            </button>
          </div>
        </div>
        @if (mobileMenuOpen) {
          <nav class="md:hidden border-t border-white/10 bg-[#07071a]/95 backdrop-blur-md">
            <div class="container flex flex-col py-4 gap-1 text-sm font-medium text-gray-300">
              <a routerLink="/" (click)="mobileMenuOpen = false" routerLinkActive="text-white" [routerLinkActiveOptions]="{exact:true}" class="py-2.5 hover:text-white transition-colors">Home</a>
              <a routerLink="/pakketten" (click)="mobileMenuOpen = false" routerLinkActive="text-white" class="py-2.5 hover:text-white transition-colors">Pakketten</a>
              <a routerLink="/artikelen" (click)="mobileMenuOpen = false" routerLinkActive="text-white" class="py-2.5 hover:text-white transition-colors">Artikelen</a>
              <a routerLink="/partners" (click)="mobileMenuOpen = false" routerLinkActive="text-white" class="py-2.5 hover:text-white transition-colors">Partners</a>
              <a routerLink="/contact" (click)="mobileMenuOpen = false" class="sm:hidden mt-2 mb-4 bg-blue-600 hover:bg-blue-700 text-white text-center font-semibold px-5 py-2.5 rounded-lg transition-colors">
                Offerte aanvragen
              </a>
            </div>
          </nav>
        }
      </header>
    }
  `
})
export class HeaderComponent {
  mobileMenuOpen = false;

  constructor(public cartService: CartService, private router: Router) {
    this.router.events.subscribe(() => { this.mobileMenuOpen = false; });
  }

  get isAdminRoute(): boolean { return this.router.url.startsWith('/admin'); }
}
