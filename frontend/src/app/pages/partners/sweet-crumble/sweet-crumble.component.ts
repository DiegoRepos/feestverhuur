import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sweet-crumble',
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
            <span class="text-white">Sweet Crumble Patisserie</span>
          </nav>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-0 items-start">
            <!-- Links: tekst -->
            <div class="pr-0 md:pr-8">
              <div class="mb-5">
                <img src="partners/sweet-crumble-logo.jpeg" alt="Sweet Crumble Patisserie logo"
                     class="h-48 object-contain mix-blend-lighten">
              </div>
              <p class="text-amber-400 font-bold tracking-widest text-sm uppercase mb-6">
                Ambachtelijk &bull; Stijlvol &bull; Zoet genieten
              </p>
              <p class="text-gray-300 text-base leading-relaxed mb-8">
                Bij Sweet Crumble Patisserie draait alles om verfijnde desserts, ambachtelijke
                patisserie en stijlvolle sweet creations. Van luxe dessert glaasjes en mini pastries
                tot volledig gepersonaliseerde sweet tables — elk detail wordt met zorg, creativiteit
                en passie afgewerkt.<br><br>
                Met een moderne en warme uitstraling combineren we smaak, elegantie en beleving
                voor elke gelegenheid.
              </p>
              <div class="flex flex-wrap gap-3">
                <a href="https://wa.me/3247053787" target="_blank"
                   class="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm">
                  <mat-icon class="text-base">phone</mat-icon>
                  0470 53 78 79
                </a>
                <a href="mailto:info@sweetcrumble.be"
                   class="flex items-center gap-2 border border-white/30 hover:border-white/60 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm">
                  <mat-icon class="text-base">mail</mat-icon>
                  info&#64;sweetcrumble.be
                </a>
              </div>
            </div>

            <!-- Rechts: foto met fade naar links -->
            <div class="relative hidden md:block h-[480px]">
              <img src="https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&h=600&q=80"
                   alt="Sweet Crumble desserts"
                   class="w-full h-full object-cover rounded-2xl">
              <div class="absolute inset-0 bg-gradient-to-r from-[#07071a] via-[#07071a]/30 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Wat wij voor jou creëren -->
      <section class="bg-[#07071a] border-t border-white/5 py-16">
        <div class="container">
          <h2 class="text-2xl md:text-3xl font-bold text-center mb-10">Wat wij voor jou creëren</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            @for (item of diensten; track item.title) {
              <div class="dark-card rounded-2xl p-6 flex flex-col items-center text-center">
                <div class="w-14 h-14 rounded-full bg-amber-600/20 border border-amber-500/30 flex items-center justify-center mb-4">
                  <mat-icon class="text-amber-400 text-2xl">{{ item.icon }}</mat-icon>
                </div>
                <h3 class="font-bold text-white mb-2">{{ item.title }}</h3>
                <p class="text-gray-400 text-sm leading-relaxed">{{ item.description }}</p>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Smaak, elegantie & beleving -->
      <section class="bg-[#07071a] border-t border-white/5 py-16">
        <div class="container">
          <h2 class="text-2xl font-bold mb-8">Smaak, elegantie &amp; beleving</h2>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
            <img src="https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=600&h=400&q=80"
                 alt="Sweet Crumble sfeer 1" class="rounded-xl w-full h-48 object-cover">
            <img src="https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=600&h=400&q=80"
                 alt="Sweet Crumble sfeer 2" class="rounded-xl w-full h-48 object-cover">
            <img src="https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=600&h=400&q=80"
                 alt="Sweet Crumble sfeer 3" class="rounded-xl w-full h-48 object-cover">
          </div>
        </div>
      </section>

      <!-- Klaar om jouw moment extra zoet te maken? -->
      <section class="bg-[#07071a] border-t border-white/5 py-16">
        <div class="container">
          <h2 class="text-2xl font-bold mb-10 text-center">
            Klaar om jouw moment<br>
            <span class="text-amber-400 italic">extra zoet te maken?</span>
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <!-- Links: checklist + knoppen -->
            <div>
              <ul class="space-y-4 mb-8">
                @for (punt of checklijst; track punt) {
                  <li class="flex items-start gap-3">
                    <mat-icon class="text-amber-400 text-xl mt-0.5 flex-shrink-0">check_circle</mat-icon>
                    <span class="text-gray-300">{{ punt }}</span>
                  </li>
                }
              </ul>
              <div class="flex flex-wrap gap-3">
                <a href="https://wa.me/3247053787" target="_blank"
                   class="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm">
                  <mat-icon class="text-base">phone</mat-icon>
                  0470 53 78 79
                </a>
                <a href="mailto:info@sweetcrumble.be"
                   class="flex items-center gap-2 border border-white/30 hover:border-white/60 text-white px-5 py-2.5 rounded-lg transition-colors text-sm">
                  <mat-icon class="text-base">mail</mat-icon>
                  info&#64;sweetcrumble.be
                </a>
              </div>
            </div>
            <!-- Rechts: logo -->
            <div class="flex items-center justify-center bg-white/5 rounded-2xl p-10">
              <img src="partners/sweet-crumble-logo.jpeg" alt="Sweet Crumble Patisserie"
                   class="max-h-56 object-contain">
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
export class SweetCrumbleComponent {
  diensten = [
    {
      icon: 'cake',
      title: 'Ambachtelijke patisserie',
      description: 'Met liefde en vakmanschap bereid, enkel met kwaliteitsvolle ingrediënten.'
    },
    {
      icon: 'wine_bar',
      title: 'Luxe desserts',
      description: 'Verfijnde dessert glaasjes, mini pastries en zoete creaties die indruk maken.'
    },
    {
      icon: 'table_restaurant',
      title: 'Sweet tables op maat',
      description: 'Volledig gepersonaliseerde sweet tables tot in de kleinste details.'
    },
    {
      icon: 'favorite',
      title: 'Voor elke gelegenheid',
      description: 'Van verjaardagen en babyshowers tot events en speciale momenten die net dat tikje extra verdienen.'
    }
  ];

  checklijst = [
    'Persoonlijke aanpak en advies op maat',
    'Unieke creaties volledig afgestemd op jouw wensen',
    'Zorgeloos genieten, wij regelen de zoete details'
  ];
}
