import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-payment-cancelled',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatIconModule],
  template: `
    <div class="bg-[#07071a] min-h-screen">
      <div class="container py-20 text-center">
        <div class="w-24 h-24 bg-red-500/10 border border-red-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <mat-icon class="text-red-400 text-5xl">cancel</mat-icon>
        </div>
        <h1 class="text-4xl font-bold mb-4 text-white">Betaling geannuleerd</h1>
        <p class="text-gray-400 text-lg mb-8">Je betaling werd geannuleerd. Je winkelwagen is bewaard.</p>
        <div class="flex gap-4 justify-center">
          <a routerLink="/winkelwagen" mat-raised-button color="primary">Terug naar winkelwagen</a>
          <a routerLink="/" mat-stroked-button class="!text-white !border-white/30">Home</a>
        </div>
      </div>
    </div>
  `
})
export class PaymentCancelledComponent {}
