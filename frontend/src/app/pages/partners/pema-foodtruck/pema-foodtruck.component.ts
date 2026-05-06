import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-pema-foodtruck',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  template: `
    <div class="bg-[#07071a] min-h-screen text-white">

      <!-- Hero -->
      <section class="hero-dark relative overflow-hidden">
        <div class="container relative z-10 py-16 md:py-24">
          <!-- Breadcrumb -->
          <nav class="flex items-center gap-2 text-sm text-gray-400 mb-8">
            <a routerLink="/" class="hover:text-white transition-colors">Home</a>
            <mat-icon class="text-base text-gray-600">chevron_right</mat-icon>
            <a routerLink="/partners" class="hover:text-white transition-colors">Partners</a>
            <mat-icon class="text-base text-gray-600">chevron_right</mat-icon>
            <span class="text-white">PeMa Foodtruck</span>
          </nav>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <!-- Links: tekst -->
            <div>
              <h1 class="text-4xl md:text-5xl font-bold mb-2">PeMa Foodtruck</h1>
              <p class="text-blue-400 font-bold tracking-widest text-sm uppercase mb-6">Griekse Specialiteiten</p>
              <p class="text-gray-300 text-base leading-relaxed mb-8">
                PeMa Foodtruck brengt de authentieke smaken van Griekenland naar jouw event.
                Naast onze Griekse specialiteiten bieden we ook frituur, BBQ en hotdogkraam aan
                voor een complete foodervaring voor elke gelegenheid.
              </p>
              <div class="flex flex-wrap gap-3">
                <a href="https://wa.me/32479587038" target="_blank"
                   class="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm">
                  <mat-icon class="text-base">phone</mat-icon>
                  0479 58 70 38
                </a>
                <a href="mailto:Pema.grieksfoodtruck@hotmail.com"
                   class="flex items-center gap-2 border border-white/30 hover:border-white/60 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm">
                  <mat-icon class="text-base">mail</mat-icon>
                  E-mail ons
                </a>
              </div>
            </div>

            <!-- Rechts: foto foodtruck -->
            <div class="rounded-2xl overflow-hidden shadow-2xl">
              <img src="partners/pema.jpeg" alt="PeMa Foodtruck"
                   class="w-full h-72 md:h-80 object-cover">
            </div>
          </div>
        </div>
      </section>

      <!-- Smaak sectie -->
      <section class="bg-[#07071a] border-t border-white/5 py-16">
        <div class="container">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <!-- Links: tekst -->
            <div>
              <h2 class="text-2xl md:text-3xl font-bold mb-5">Authentieke Griekse smaak,<br>aangevuld met meer</h2>
              <p class="text-gray-400 leading-relaxed">
                Van klassieke Griekse gerechten tot heerlijke snacks van de frituur, sappige
                BBQ-specialiteiten en overheerlijke hotdogs. PeMa Foodtruck staat garant voor
                kwaliteit, versheid en een vriendelijke service.
              </p>
            </div>
            <!-- Rechts: 2x2 foto grid -->
            <div class="grid grid-cols-2 gap-3">
              <img src="partners/grieks_schotel.webp" alt="Griekse schotel"
                   class="rounded-xl w-full h-40 object-cover">
              <img src="partners/grieks_kalamaris.webp" alt="Kalamaris"
                   class="rounded-xl w-full h-40 object-cover">
              <img src="partners/gyros-pita.jpg" alt="Gyros pita"
                   class="rounded-xl w-full h-40 object-cover">
              <img src="partners/grieks_torie.webp" alt="Griekse torie"
                   class="rounded-xl w-full h-40 object-cover">
            </div>
          </div>
        </div>
      </section>

      <!-- Ons aanbod -->
      <section class="bg-[#07071a] border-t border-white/5 py-16">
        <div class="container">
          <h2 class="text-2xl font-bold text-center mb-10">Ons aanbod</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            @for (item of aanbod; track item.title) {
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

      <!-- Boek sectie -->
      <section class="bg-[#07071a] border-t border-white/5 py-16">
        <div class="container">
          <h2 class="text-2xl font-bold mb-10 text-center">Boek PeMa Foodtruck voor jouw event</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <!-- Links: checklist -->
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
                <a href="https://wa.me/32479587038" target="_blank"
                   class="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm">
                  <mat-icon class="text-base">phone</mat-icon>
                  0479 58 70 38
                </a>
                <a href="mailto:Pema.grieksfoodtruck@hotmail.com"
                   class="flex items-center gap-2 border border-white/30 hover:border-white/60 text-white px-5 py-2.5 rounded-lg transition-colors text-sm">
                  <mat-icon class="text-base">mail</mat-icon>
                  Pema.grieksfoodtruck&#64;hotmail.com
                </a>
              </div>
            </div>
            <!-- Rechts: foto foodtruck -->
            <div class="rounded-2xl overflow-hidden shadow-2xl">
              <img src="partners/pema.jpeg" alt="PeMa Foodtruck"
                   class="w-full h-72 object-cover">
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
export class PemaFoodtruckComponent {
  aanbod = [
    {
      icon: 'restaurant',
      title: 'Griekse specialiteiten',
      description: 'Authentieke gerechten zoals souvlaki, gyros, moussaka, salades en meer.'
    },
    {
      icon: 'lunch_dining',
      title: 'Frituur',
      description: 'Krokante frietjes, snacks en klassiekers – altijd vers en goudbruin.'
    },
    {
      icon: 'outdoor_grill',
      title: 'BBQ',
      description: 'Sappige vleesgerechten recht van de grill, vol smaak en kwaliteit.'
    },
    {
      icon: 'fastfood',
      title: 'Hotdogkraam',
      description: 'Heerlijke hotdogs met diverse toppings, ideaal voor elk event.'
    }
  ];

  checklijst = [
    'Voor privéfeesten, bedrijfsevents, festivals en meer',
    'Flexibel aanbod op maat van jouw wensen',
    'Verse ingrediënten en authentieke bereiding',
    'Vriendelijke service en professionele aanpak'
  ];
}
