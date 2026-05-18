import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-wonka-events',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  template: `
    <div class="bg-[#07071a] min-h-screen text-white">

      <!-- Hero -->
      <section class="hero-dark relative overflow-hidden">
        <div class="container relative z-10 pt-6 pb-16">
          <!-- Breadcrumb -->
          <nav class="flex items-center gap-2 text-sm text-gray-400 mb-8">
            <a routerLink="/" class="hover:text-white transition-colors">Home</a>
            <mat-icon class="text-base text-gray-600">chevron_right</mat-icon>
            <a routerLink="/partners" class="hover:text-white transition-colors">Partners</a>
            <mat-icon class="text-base text-gray-600">chevron_right</mat-icon>
            <span class="text-white">Wonka Events</span>
          </nav>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <!-- Links: tekst -->
            <div>
              <h1 class="text-4xl md:text-5xl font-bold mb-2">Wonka Events</h1>
              <p class="text-yellow-400 font-bold tracking-widest text-sm uppercase mb-6">
                Audio &bull; Visual &bull; Event &bull; Rental
              </p>
              <p class="text-gray-300 text-base leading-relaxed mb-8">
                Wonka Events is meer dan alleen geluid en licht.<br>
                Wij creëren belevingen die mensen raken.<br>
                Van intieme feesten tot grote evenementen:<br>
                met professioneel materiaal en creatieve concepten<br>
                brengen wij jouw visie tot leven.
              </p>
              <div class="flex flex-wrap gap-3">
                <a href="https://wa.me/3247053787" target="_blank"
                   class="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm">
                  <mat-icon class="text-base">phone</mat-icon>
                  +32 470 53 78 79
                </a>
                <a href="mailto:info@wonka.events"
                   class="flex items-center gap-2 border border-white/30 hover:border-white/60 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm">
                  <mat-icon class="text-base">mail</mat-icon>
                  info&#64;wonka.events
                </a>
              </div>
            </div>

            <!-- Rechts: foto -->
            <div class="relative hidden md:block h-[480px]">
              <img src="partners/wonka.jpeg" alt="Wonka Events"
                   class="w-full h-full object-cover rounded-2xl">
              <div class="absolute inset-0 bg-gradient-to-r from-[#07071a] via-[#07071a]/30 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Wat wij doen -->
      <section class="bg-[#07071a] border-t border-white/5 py-16">
        <div class="container">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-12">
            <div>
              <h2 class="text-2xl md:text-3xl font-bold mb-5">Wat wij doen</h2>
              <p class="text-gray-400 leading-relaxed">
                Wij leveren complete oplossingen op het gebied van geluid, licht en techniek.
                Of het nu gaat om verhuur of een totaalconcept, wij zorgen voor de perfecte beleving.
                Altijd met oog voor detail en kwaliteit.
              </p>
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            @for (item of diensten; track item.title) {
              <div class="dark-card rounded-2xl p-6 flex flex-col items-center text-center">
                <div class="w-14 h-14 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mb-4">
                  <mat-icon class="text-blue-400 text-2xl">{{ item.icon }}</mat-icon>
                </div>
                <h3 class="font-bold text-white mb-2">{{ item.title }}</h3>
                <p class="text-gray-400 text-sm leading-relaxed">{{ item.description }}</p>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Sfeerimpressie -->
      <section class="bg-[#07071a] border-t border-white/5 py-16">
        <div class="container">
          <h2 class="text-2xl font-bold mb-8">Sfeerimpressie</h2>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
            <img src="partners/wonka.jpeg" alt="Wonka Events sfeer 1"
                 class="rounded-xl w-full h-48 object-cover">
            <img src="partners/wonka.jpeg" alt="Wonka Events sfeer 2"
                 class="rounded-xl w-full h-48 object-cover object-top">
            <img src="partners/wonka.jpeg" alt="Wonka Events sfeer 3"
                 class="rounded-xl w-full h-48 object-cover object-bottom">
          </div>
        </div>
      </section>

      <!-- Klaar voor een onvergetelijk event? -->
      <section class="bg-[#07071a] border-t border-white/5 py-16">
        <div class="container">
          <h2 class="text-2xl font-bold mb-10 text-center">Klaar voor een onvergetelijk event?</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <!-- Links: checklist + knoppen -->
            <div>
              <ul class="space-y-4 mb-8">
                @for (punt of checklijst; track punt) {
                  <li class="flex items-start gap-3">
                    <mat-icon class="text-blue-400 text-xl mt-0.5 flex-shrink-0">check_circle</mat-icon>
                    <span class="text-gray-300">{{ punt }}</span>
                  </li>
                }
              </ul>
              <div class="flex flex-wrap gap-3">
                <a href="https://wa.me/3247053787" target="_blank"
                   class="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm">
                  <mat-icon class="text-base">phone</mat-icon>
                  +32 470 53 78 79
                </a>
                <a href="mailto:info@wonka.events"
                   class="flex items-center gap-2 border border-white/30 hover:border-white/60 text-white px-5 py-2.5 rounded-lg transition-colors text-sm">
                  <mat-icon class="text-base">mail</mat-icon>
                  info&#64;wonka.events
                </a>
              </div>
            </div>
            <!-- Rechts: logo -->
            <div class="rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center bg-black/30 p-8">
              <img src="partners/wonka.jpeg" alt="Wonka Events logo"
                   class="max-h-64 object-contain">
            </div>
          </div>
        </div>
      </section>

      <!-- Terug knop -->
      <div class="border-t border-white/5 py-8">
        <div class="container flex justify-center">
          <a routerLink="/partners"
             class="flex items-center gap-2 border border-white/20 hover:border-white/50 text-white px-6 py-2.5 rounded-lg text-sm transition-colors">
            <mat-icon class="text-base">arrow_back</mat-icon>
            Terug naar partners
          </a>
        </div>
      </div>

    </div>
  `
})
export class WonkaEventsComponent {
  diensten = [
    {
      icon: 'volume_up',
      title: 'Audio',
      description: 'Professionele geluidssystemen voor elke locatie en elk event.'
    },
    {
      icon: 'wb_incandescent',
      title: 'Visual & Lights',
      description: 'Sfeervolle verlichting en visuele effecten die indruk maken.'
    },
    {
      icon: 'event',
      title: 'Event Production',
      description: 'Complete technische productie van concept tot uitvoering.'
    },
    {
      icon: 'inventory_2',
      title: 'Rental',
      description: 'Verhuur van hoogwaardig materiaal en professioneel advies.'
    }
  ];

  checklijst = [
    'Professionele apparatuur & techniek',
    'Ervaren team & persoonlijke aanpak',
    'Flexibel, creatief en oplossingsgericht',
    'Van klein tot groot – wij staan klaar'
  ];
}
