import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { ApiService } from '../../services/api.service';
import { BookingRequest } from '../../models/booking.model';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [MatIconModule, ReactiveFormsModule, CurrencyPipe, RouterLink],
  template: `
    <div class="bg-[#07071a] min-h-screen">

      <!-- Hero breadcrumb -->
      <div class="hero-dark border-b border-white/5">
        <div class="container py-8 relative z-10">
          <nav class="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <a routerLink="/winkelwagen" class="hover:text-white transition-colors">Winkelwagen</a>
            <mat-icon class="text-base text-gray-600">chevron_right</mat-icon>
            <span class="text-white">Boeking voltooien</span>
          </nav>
          <h1 class="text-3xl md:text-4xl font-bold text-white">Boeking voltooien</h1>
          <p class="text-blue-300 mt-2">Vul je gegevens in om door te gaan naar de betaling</p>
        </div>
      </div>

      <div class="container py-12">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          <!-- Formulier -->
          <form [formGroup]="form" (ngSubmit)="submit()" class="lg:col-span-2 space-y-5">

            <!-- Naam -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="flex flex-col gap-1.5">
                <label class="text-sm text-gray-400">Voornaam <span class="text-red-400">*</span></label>
                <input formControlName="firstName" type="text" placeholder="Jordy"
                       class="bg-white/5 border border-white/20 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                       [class.border-red-500]="isInvalid('firstName')">
                @if (isInvalid('firstName')) {
                  <span class="text-red-400 text-xs">Voornaam is verplicht</span>
                }
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-sm text-gray-400">Achternaam <span class="text-red-400">*</span></label>
                <input formControlName="lastName" type="text" placeholder="Janssen"
                       class="bg-white/5 border border-white/20 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                       [class.border-red-500]="isInvalid('lastName')">
                @if (isInvalid('lastName')) {
                  <span class="text-red-400 text-xs">Achternaam is verplicht</span>
                }
              </div>
            </div>

            <!-- Contact -->
            <div class="flex flex-col gap-1.5">
              <label class="text-sm text-gray-400">E-mailadres <span class="text-red-400">*</span></label>
              <input formControlName="email" type="email" placeholder="jordy@email.com"
                     class="bg-white/5 border border-white/20 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                     [class.border-red-500]="isInvalid('email')">
              @if (isInvalid('email')) {
                <span class="text-red-400 text-xs">Geldig e-mailadres verplicht</span>
              }
            </div>

            <div class="flex flex-col gap-1.5">
              <label class="text-sm text-gray-400">Telefoonnummer <span class="text-red-400">*</span></label>
              <input formControlName="phone" type="tel" placeholder="+32 470 00 00 00"
                     class="bg-white/5 border border-white/20 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                     [class.border-red-500]="isInvalid('phone')">
              @if (isInvalid('phone')) {
                <span class="text-red-400 text-xs">Telefoonnummer is verplicht</span>
              }
            </div>

            <!-- Adres -->
            <div class="flex flex-col gap-1.5">
              <label class="text-sm text-gray-400">Straat en huisnummer <span class="text-red-400">*</span></label>
              <input formControlName="address" type="text" placeholder="Kerkstraat 1"
                     class="bg-white/5 border border-white/20 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                     [class.border-red-500]="isInvalid('address')">
              @if (isInvalid('address')) {
                <span class="text-red-400 text-xs">Adres is verplicht</span>
              }
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="flex flex-col gap-1.5">
                <label class="text-sm text-gray-400">Postcode <span class="text-red-400">*</span></label>
                <input formControlName="postalCode" type="text" placeholder="3500"
                       class="bg-white/5 border border-white/20 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                       [class.border-red-500]="isInvalid('postalCode')">
                @if (isInvalid('postalCode')) {
                  <span class="text-red-400 text-xs">Postcode is verplicht</span>
                }
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-sm text-gray-400">Gemeente <span class="text-red-400">*</span></label>
                <input formControlName="city" type="text" placeholder="Hasselt"
                       class="bg-white/5 border border-white/20 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                       [class.border-red-500]="isInvalid('city')">
                @if (isInvalid('city')) {
                  <span class="text-red-400 text-xs">Gemeente is verplicht</span>
                }
              </div>
            </div>

            <!-- Levering -->
            <div class="dark-card rounded-2xl p-5 space-y-4">
              <label class="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" formControlName="deliveryRequired"
                       class="w-5 h-5 rounded accent-blue-600 cursor-pointer">
                <span class="text-white text-sm font-medium">Levering & opbouw gewenst</span>
              </label>
              @if (form.get('deliveryRequired')?.value) {
                <div class="flex flex-col gap-1.5">
                  <label class="text-sm text-gray-400">Leveringsadres (als afwijkend van bovenstaand)</label>
                  <input formControlName="deliveryAddress" type="text" placeholder="Feestzaal De Lindeboom, ..."
                         class="bg-white/5 border border-white/20 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors">
                </div>
              }
            </div>

            <!-- Opmerkingen -->
            <div class="flex flex-col gap-1.5">
              <label class="text-sm text-gray-400">Opmerkingen (optioneel)</label>
              <textarea formControlName="notes" rows="3" placeholder="Speciale wensen, vragen, ..."
                        class="bg-white/5 border border-white/20 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none"></textarea>
            </div>

            <!-- Voorwaarden -->
            <div class="dark-card rounded-2xl p-5">
              <label class="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" formControlName="termsAccepted"
                       class="w-5 h-5 rounded accent-blue-600 cursor-pointer mt-0.5 shrink-0">
                <span class="text-sm text-gray-300">
                  Ik ga akkoord met de
                  <a routerLink="/voorwaarden" target="_blank" class="text-blue-400 hover:text-blue-300 underline">verhuurvoorwaarden</a>
                  van ZYVENTO
                </span>
              </label>
              @if (form.get('termsAccepted')?.invalid && form.get('termsAccepted')?.touched) {
                <p class="text-red-400 text-xs mt-2 ml-8">Je moet akkoord gaan met de verhuurvoorwaarden.</p>
              }
            </div>

            <!-- Submit -->
            <button type="submit" [disabled]="form.invalid || loading"
                    class="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold px-6 py-4 rounded-xl transition-colors text-base">
              @if (loading) {
                <svg class="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
              } @else {
                <mat-icon class="text-base">lock</mat-icon>
              }
              Betalen via Mollie
            </button>

          </form>

          <!-- Samenvatting sidebar -->
          <div class="dark-card rounded-2xl p-6 sticky top-6">
            <h3 class="text-lg font-bold text-white mb-4">Jouw bestelling</h3>

            <div class="space-y-3 mb-4">
              @for (line of cart.lines(); track line.id) {
                <div class="flex justify-between text-sm">
                  <span class="text-gray-400 truncate mr-2">{{ line.name }} ×{{ line.quantity }}</span>
                  <span class="text-white font-medium shrink-0">
                    @if (line.pricePerDay != null) {
                      {{ line.pricePerDay * cart.totalDays() * line.quantity | currency:'EUR' }}
                    } @else {
                      {{ (line.priceFixed ?? 0) * line.quantity | currency:'EUR' }}
                    }
                  </span>
                </div>
              }
            </div>

            <div class="border-t border-white/10 pt-4 mb-4 space-y-2">
              <div class="flex justify-between text-sm text-gray-400">
                <span>Huurperiode</span>
                <span class="text-white">{{ cart.totalDays() }} dag(en)</span>
              </div>
              <div class="flex justify-between text-sm text-gray-400">
                <span>Van</span>
                <span class="text-white">{{ cart.startDate() }}</span>
              </div>
              <div class="flex justify-between text-sm text-gray-400">
                <span>Tot</span>
                <span class="text-white">{{ cart.endDate() }}</span>
              </div>
            </div>

            <div class="border-t border-white/10 pt-4">
              <div class="flex justify-between font-bold text-lg">
                <span class="text-white">Totaal</span>
                <span class="text-blue-300">{{ cart.total() | currency:'EUR' }}</span>
              </div>
              <p class="text-xs text-gray-600 mt-2 flex items-center gap-1">
                <mat-icon class="text-xs">lock</mat-icon> Veilig betalen via Mollie
              </p>
            </div>
          </div>

        </div>
      </div>
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
    termsAccepted: [false, Validators.requiredTrue],
  });

  loading = false;

  isInvalid(field: string): boolean {
    const ctrl = this.form.get(field);
    return !!(ctrl?.invalid && ctrl?.touched);
  }

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
