import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <div class="container py-12 max-w-2xl">
      <h1 class="text-4xl font-bold mb-2">Contact</h1>
      <p class="text-gray-500 mb-10">Heb je vragen of wil je een vrijblijvende offerte? Neem contact met ons op.</p>
      <div class="space-y-6">
        <div class="flex items-center gap-4 p-5 bg-white rounded-xl shadow-sm border border-gray-100">
          <div class="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
            <mat-icon class="text-primary-600">email</mat-icon>
          </div>
          <div>
            <div class="font-semibold">E-mail</div>
            <a href="mailto:info&#64;feestverhuur.be" class="text-primary-600">info&#64;feestverhuur.be</a>
          </div>
        </div>
        <div class="flex items-center gap-4 p-5 bg-white rounded-xl shadow-sm border border-gray-100">
          <div class="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
            <mat-icon class="text-primary-600">phone</mat-icon>
          </div>
          <div>
            <div class="font-semibold">Telefoon</div>
            <a href="tel:+32000000000" class="text-primary-600">+32 000 00 00 00</a>
          </div>
        </div>
        <div class="flex items-center gap-4 p-5 bg-white rounded-xl shadow-sm border border-gray-100">
          <div class="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
            <mat-icon class="text-primary-600">schedule</mat-icon>
          </div>
          <div>
            <div class="font-semibold">Openingsuren</div>
            <div class="text-gray-500 text-sm">Ma–Vr: 9:00–18:00 | Za: 10:00–16:00</div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ContactComponent {}
