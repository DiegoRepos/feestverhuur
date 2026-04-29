import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { NgIf, CurrencyPipe } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { ApiService } from '../../services/api.service';
import { BookingRequest } from '../../models/booking.model';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatCheckboxModule,
            MatProgressSpinnerModule, ReactiveFormsModule, NgIf, CurrencyPipe],
  template: `
    <div class="container py-12 max-w-2xl">
      <h1 class="text-4xl font-bold mb-2">Boeking voltooien</h1>
      <p class="text-gray-500 mb-8">Vul je gegevens in om door te gaan naar de betaling</p>

      <div class="bg-primary-50 rounded-xl p-5 mb-8 border border-primary-100">
        <h3 class="font-semibold mb-3">Overzicht</h3>
        <div class="flex justify-between text-sm mb-1">
          <span>Huurperiode</span>
          <span>{{ cart.startDate() }} — {{ cart.endDate() }} ({{ cart.totalDays() }} dag(en))</span>
        </div>
        <div class="flex justify-between font-bold text-lg mt-2 pt-2 border-t border-primary-200">
          <span>Totaal te betalen</span>
          <span class="text-primary-700">{{ cart.total() | currency:'EUR' }}</span>
        </div>
      </div>

      <form [formGroup]="form" (ngSubmit)="submit()" class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <mat-form-field appearance="outline">
            <mat-label>Voornaam</mat-label>
            <input matInput formControlName="firstName">
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Achternaam</mat-label>
            <input matInput formControlName="lastName">
          </mat-form-field>
        </div>

        <mat-form-field appearance="outline" class="w-full">
          <mat-label>E-mailadres</mat-label>
          <input matInput type="email" formControlName="email">
        </mat-form-field>

        <mat-form-field appearance="outline" class="w-full">
          <mat-label>Telefoonnummer</mat-label>
          <input matInput formControlName="phone">
        </mat-form-field>

        <mat-form-field appearance="outline" class="w-full">
          <mat-label>Straat en huisnummer</mat-label>
          <input matInput formControlName="address">
        </mat-form-field>

        <div class="grid grid-cols-2 gap-4">
          <mat-form-field appearance="outline">
            <mat-label>Postcode</mat-label>
            <input matInput formControlName="postalCode">
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Gemeente</mat-label>
            <input matInput formControlName="city">
          </mat-form-field>
        </div>

        <div class="p-4 bg-gray-50 rounded-xl">
          <mat-checkbox formControlName="deliveryRequired">Levering & opbouw gewenst</mat-checkbox>
          @if (form.get('deliveryRequired')?.value) {
            <mat-form-field appearance="outline" class="w-full mt-3">
              <mat-label>Leveringsadres (als afwijkend)</mat-label>
              <input matInput formControlName="deliveryAddress">
            </mat-form-field>
          }
        </div>

        <mat-form-field appearance="outline" class="w-full">
          <mat-label>Opmerkingen (optioneel)</mat-label>
          <textarea matInput formControlName="notes" rows="3"></textarea>
        </mat-form-field>

        <div class="text-sm text-gray-500 mt-2">
          Door te boeken gaat u akkoord met onze <a routerLink="/voorwaarden" class="text-primary-600 underline">verhuurvoorwaarden</a>.
        </div>

        <button mat-raised-button color="primary" type="submit" class="w-full py-4 text-lg mt-4"
                [disabled]="form.invalid || loading">
          @if (loading) {
            <mat-spinner diameter="24" class="inline-block mr-2"></mat-spinner>
          }
          Betalen via Mollie
        </button>
      </form>
    </div>
  `
})
export class BookingComponent implements OnInit {
  private fb = inject(FormBuilder);
  public cart = inject(CartService);
  private api = inject(ApiService);
  private router = inject(Router);

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    address: ['', Validators.required],
    city: ['', Validators.required],
    postalCode: ['', Validators.required],
    deliveryRequired: [false],
    deliveryAddress: [''],
    notes: [''],
  });

  loading = false;

  ngOnInit(): void {
    if (this.cart.lines().length === 0) {
      this.router.navigate(['/winkelwagen']);
    }
  }

  submit(): void {
    if (this.form.invalid || this.cart.lines().length === 0) return;
    this.loading = true;

    const f = this.form.value;
    const request: BookingRequest = {
      startDate: this.cart.startDate(),
      endDate: this.cart.endDate(),
      deliveryRequired: f.deliveryRequired ?? false,
      deliveryAddress: f.deliveryAddress ?? undefined,
      notes: f.notes ?? undefined,
      firstName: f.firstName!,
      lastName: f.lastName!,
      email: f.email!,
      phone: f.phone!,
      address: f.address!,
      city: f.city!,
      postalCode: f.postalCode!,
      lines: this.cart.lines().map(l => ({
        itemId: l.type === 'item' ? l.id : undefined,
        packageId: l.type === 'package' ? l.id : undefined,
        quantity: l.quantity,
      })),
    };

    this.api.createBooking(request).subscribe({
      next: res => {
        this.cart.clear();
        if (res.checkoutUrl) {
          window.location.href = res.checkoutUrl;
        } else {
          this.router.navigate(['/betaling/succes'], { queryParams: { bookingId: res.id } });
        }
      },
      error: () => { this.loading = false; }
    });
  }
}
