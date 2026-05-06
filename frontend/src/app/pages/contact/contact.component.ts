import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  template: `
    <!-- Hero -->
    <section class="hero-dark text-white py-16 min-h-[220px] flex items-center">
      <div class="container relative z-10">
        <h1 class="text-4xl md:text-5xl font-bold mb-3">Contacteer Ons</h1>
        <p class="text-blue-200 text-base">Neem contact op met ons voor vragen of offertes.</p>
      </div>
    </section>

    <!-- Content -->
    <section class="bg-[#07071a] py-14">
      <div class="container">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">

          <!-- Links: contactinfo -->
          <div class="text-white">
            <h2 class="text-2xl font-bold mb-8">Jordy Geurts</h2>

            <div class="space-y-4 mb-8">
              <a href="tel:+32470537879" class="flex items-center gap-4 group">
                <div class="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z"/>
                  </svg>
                </div>
                <span class="text-gray-200 group-hover:text-white transition-colors">+32 470 53 78 79</span>
              </a>

              <a href="mailto:info@zyvento.be" class="flex items-center gap-4 group">
                <div class="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                  <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <span class="text-gray-200 group-hover:text-white transition-colors">info&#64;zyvento.be</span>
              </a>

              <a href="https://www.zyvento.be" target="_blank" class="flex items-center gap-4 group">
                <div class="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm-1 17.93V18c0-.55.45-1 1-1s1 .45 1 1v1.93A8.003 8.003 0 014.07 13H6c.55 0 1 .45 1 1s-.45 1-1 1H4.07c.46 2.28 2.04 4.15 4.15 4.93zM4.07 11H6c.55 0 1-.45 1-1s-.45-1-1-1H4.07A8.003 8.003 0 0112 4.07V6c0 .55.45 1 1 1s1-.45 1-1V4.07A8.003 8.003 0 0119.93 11H18c-.55 0-1 .45-1 1s.45 1 1 1h1.93A8.003 8.003 0 0112 19.93V18c0-.55-.45-1-1-1s-1 .45-1 1v1.93A8.003 8.003 0 014.07 13H6"/>
                  </svg>
                </div>
                <span class="text-gray-200 group-hover:text-white transition-colors">www.zyvento.be</span>
              </a>

              <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center flex-shrink-0">
                  <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/>
                  </svg>
                </div>
                <span class="text-gray-200">Herestraat 82, 3520 Zonhoven Belgium</span>
              </div>
            </div>

            <!-- WhatsApp knop -->
            <a href="https://wa.me/32470537879" target="_blank"
               class="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors mb-8">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Stuur ons een bericht
            </a>

            <!-- Sociale media -->
            <div class="flex items-center gap-3 mb-6">
              <a href="#" class="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-white/50 transition-colors">
                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z"/>
                </svg>
              </a>
              <a href="#" class="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-white/50 transition-colors">
                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.5 6.19a3.02 3.02 0 00-2.12-2.14C19.54 3.5 12 3.5 12 3.5s-7.54 0-9.38.55A3.02 3.02 0 00.5 6.19C0 8.04 0 12 0 12s0 3.96.5 5.81a3.02 3.02 0 002.12 2.14C4.46 20.5 12 20.5 12 20.5s7.54 0 9.38-.55a3.02 3.02 0 002.12-2.14C24 15.96 24 12 24 12s0-3.96-.5-5.81zM9.75 15.52V8.48L15.5 12l-5.75 3.52z"/>
                </svg>
              </a>
              <a href="#" class="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-white/50 transition-colors">
                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a href="#" class="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-white/50 transition-colors">
                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>

            <p class="text-gray-500 text-sm">Herestraat 82, 3520 Zonhoven Belgium</p>
          </div>

          <!-- Rechts: formulier -->
          <div>
            <h2 class="text-white text-xl font-bold mb-6">Stuur ons een bericht</h2>
            @if (submitted) {
              <div class="dark-card rounded-2xl p-10 text-center text-white">
                <div class="text-green-400 text-5xl mb-4">✓</div>
                <h3 class="text-xl font-bold mb-2">Bericht verzonden!</h3>
                <p class="text-gray-400">We nemen zo snel mogelijk contact met je op.</p>
              </div>
            } @else {
              <form (ngSubmit)="onSubmit(f)" #f="ngForm" class="space-y-4" novalidate>

                <!-- Naam + E-mail -->
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-gray-300 text-sm font-medium mb-1">
                      Naam <span class="text-red-400">*</span>
                    </label>
                    <input name="naam" [(ngModel)]="form.naam" required minlength="2" #naam="ngModel"
                           placeholder="Jouw naam"
                           [class]="inputClass(naam)"
                           (blur)="naam.control.markAsTouched()">
                    @if (naam.touched && naam.errors?.['required']) {
                      <p class="text-red-400 text-xs mt-1">Naam is verplicht</p>
                    } @else if (naam.touched && naam.errors?.['minlength']) {
                      <p class="text-red-400 text-xs mt-1">Minimaal 2 tekens</p>
                    }
                  </div>
                  <div>
                    <label class="block text-gray-300 text-sm font-medium mb-1">
                      E-mailadres <span class="text-red-400">*</span>
                    </label>
                    <input name="email" [(ngModel)]="form.email" required type="email"
                           pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}"
                           #email="ngModel"
                           placeholder="jouw@email.be"
                           [class]="inputClass(email)"
                           (blur)="email.control.markAsTouched()">
                    @if (email.touched && email.errors?.['required']) {
                      <p class="text-red-400 text-xs mt-1">E-mail is verplicht</p>
                    } @else if (email.touched && (email.errors?.['email'] || email.errors?.['pattern'])) {
                      <p class="text-red-400 text-xs mt-1">Voer een geldig e-mailadres in (bv. naam&#64;domein.be)</p>
                    }
                  </div>
                </div>

                <!-- Telefoon -->
                <div>
                  <label class="block text-gray-300 text-sm font-medium mb-1">
                    Telefoonnummer <span class="text-red-400">*</span>
                  </label>
                  <input name="telefoon" [(ngModel)]="form.telefoon" required #telefoon="ngModel"
                         pattern="^[+]?[0-9\s\-()]{7,20}$"
                         placeholder="+32 470 00 00 00"
                         [class]="inputClass(telefoon)"
                         (blur)="telefoon.control.markAsTouched()">
                  @if (telefoon.touched && telefoon.errors?.['required']) {
                    <p class="text-red-400 text-xs mt-1">Telefoonnummer is verplicht</p>
                  } @else if (telefoon.touched && telefoon.errors?.['pattern']) {
                    <p class="text-red-400 text-xs mt-1">Ongeldig telefoonnummer (bv. +32 470 53 78 79)</p>
                  }
                </div>

                <!-- Onderwerp -->
                <div>
                  <label class="block text-gray-300 text-sm font-medium mb-1">Onderwerp</label>
                  <input name="onderwerp" [(ngModel)]="form.onderwerp" #onderwerp="ngModel"
                         placeholder="Waar gaat je vraag over?"
                         [class]="inputClass(onderwerp, false)">
                </div>

                <!-- Bericht -->
                <div>
                  <label class="block text-gray-300 text-sm font-medium mb-1">
                    Bericht <span class="text-red-400">*</span>
                  </label>
                  <textarea name="bericht" [(ngModel)]="form.bericht" required minlength="10" maxlength="2000"
                            #bericht="ngModel" placeholder="Schrijf hier je bericht..." rows="5"
                            [class]="textareaClass(bericht)"
                            (blur)="bericht.control.markAsTouched()"></textarea>
                  <div class="flex justify-between mt-1">
                    <span>
                      @if (bericht.touched && bericht.errors?.['required']) {
                        <p class="text-red-400 text-xs">Bericht is verplicht</p>
                      } @else if (bericht.touched && bericht.errors?.['minlength']) {
                        <p class="text-red-400 text-xs">Minimaal 10 tekens</p>
                      }
                    </span>
                    <span class="text-gray-500 text-xs">{{ form.bericht.length }}/2000</span>
                  </div>
                </div>

                <!-- Foutmelding verzenden -->
                @if (serverError) {
                  <div class="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-red-400 text-sm">
                    {{ serverError }}
                  </div>
                }

                <button type="submit" [disabled]="sending"
                        class="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-lg transition-colors">
                  {{ sending ? 'Verzenden...' : 'Verzend bericht' }}
                </button>
              </form>
            }
          </div>

        </div>
      </div>
    </section>
  `
})
export class ContactComponent {
  submitted = false;
  sending = false;
  serverError = '';

  form = { naam: '', email: '', telefoon: '', onderwerp: '', bericht: '' };

  constructor(private api: ApiService) {}

  onSubmit(f: any): void {
    f.control.markAllAsTouched();
    if (f.invalid) return;
    this.sending = true;
    this.serverError = '';
    this.api.sendContact(this.form).subscribe({
      next: () => { this.submitted = true; this.sending = false; },
      error: (err) => {
        this.sending = false;
        if (err.status === 400) {
          this.serverError = 'De ingevoerde gegevens zijn niet geldig. Controleer je e-mailadres en telefoonnummer.';
        } else if (err.status === 0) {
          this.serverError = 'Geen verbinding met de server. Controleer je internetverbinding.';
        } else if (err.status >= 500) {
          this.serverError = 'Serverfout. Probeer het later opnieuw of neem contact op via WhatsApp.';
        } else {
          this.serverError = 'Er is iets misgegaan. Probeer het later opnieuw.';
        }
      }
    });
  }

  inputClass(ctrl: any, required = true): string {
    const base = 'w-full rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-colors ';
    if (ctrl.touched && ctrl.invalid)
      return base + 'bg-red-500/10 border border-red-500/50 focus:border-red-400';
    if (ctrl.touched && ctrl.valid && required)
      return base + 'bg-white/5 border border-green-500/50 focus:border-green-400';
    return base + 'bg-white/5 border border-white/10 focus:border-blue-500';
  }

  textareaClass(ctrl: any): string {
    return this.inputClass(ctrl) + ' resize-none';
  }
}
