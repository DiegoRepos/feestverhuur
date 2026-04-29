import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatIconModule, NgIf],
  template: `
    <div class="container py-20 text-center">
      <div class="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <mat-icon class="text-green-500 text-5xl">check_circle</mat-icon>
      </div>
      <h1 class="text-4xl font-bold mb-4">Betaling geslaagd!</h1>
      <p class="text-gray-500 text-lg mb-2">Bedankt voor je boeking bij Feestverhuur.</p>
      <p class="text-gray-500 mb-8">Je ontvangt een bevestiging per e-mail. Boeking #{{ bookingId }}</p>
      <div class="flex gap-4 justify-center">
        <a routerLink="/" mat-raised-button color="primary">Terug naar home</a>
        <a routerLink="/pakketten" mat-stroked-button>Nog iets huren</a>
      </div>
    </div>
  `
})
export class PaymentSuccessComponent implements OnInit {
  bookingId?: number;

  constructor(private route: ActivatedRoute, private api: ApiService) {}

  ngOnInit(): void {
    this.bookingId = Number(this.route.snapshot.queryParamMap.get('bookingId'));
  }
}
