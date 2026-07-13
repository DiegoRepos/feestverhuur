import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-row1',
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
            <span class="text-white">ROW1</span>
          </nav>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <!-- Links: tekst -->
            <div>
              <h1 class="text-4xl md:text-5xl font-bold mb-2">ROW1</h1>
              <p class="text-purple-400 font-bold tracking-widest text-sm uppercase mb-6">Hard Trance DJ</p>
              <p class="text-gray-300 text-base leading-relaxed mb-8">
                Een jonge en compromisloze dj laat van zich horen in de Europese hard dance underground —
                ROW1 vertegenwoordigt een nieuwe generatie artiesten die bewust afstand neemt van de mainstream.
                Met slechts 24 jaar trekt hij de aandacht met hoog-energetische sets en een kenmerkende mix
                van hard trance en drijvende, percussieve energie — rauw, direct en gemaakt voor de dansvloer.
              </p>
              <div class="flex flex-wrap gap-3">
                <a routerLink="/contact"
                   class="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm">
                  <mat-icon class="text-base">mail</mat-icon>
                  Boekingsaanvraag
                </a>
              </div>
            </div>

            <!-- Rechts: foto -->
            <div class="relative hidden md:block h-[480px]">
              <img src="partners/ROW2.jpg" alt="ROW1" style="object-position: center 20%"
                   class="w-full h-full object-cover rounded-2xl">
              <div class="absolute inset-0 bg-gradient-to-r from-[#07071a] via-[#07071a]/30 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Over ROW1 -->
      <section class="bg-[#07071a] border-t border-white/5 py-16">
        <div class="container">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div class="order-2 md:order-1">
              <h2 class="text-2xl md:text-3xl font-bold mb-5">Zijn eigen weg</h2>
              <p class="text-gray-400 leading-relaxed">
                Terwijl veel van zijn generatiegenoten algoritme-gedreven trends volgen, kiest ROW1 zijn eigen weg:
                zijn muziek spreekt een subcultuur aan die intensiteit, individualiteit en gemeenschap boven
                commercieel succes stelt. Wat begon in een slaapkamer beweegt nu lichamen in clubs over heel de kaart —
                en ROW1 is nog maar net begonnen.
              </p>
            </div>
            <div class="order-1 md:order-2 rounded-2xl overflow-hidden aspect-video">
              <iframe class="w-full h-full"
                      src="https://www.youtube.com/embed/gWTuh8GTQws"
                      title="ROW1"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowfullscreen></iframe>
            </div>
          </div>
        </div>
      </section>

      <!-- Aanbod -->
      <section class="bg-[#07071a] border-t border-white/5 py-16">
        <div class="container">
          <h2 class="text-2xl font-bold text-center mb-10">Boek ROW1 voor jouw event</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            @for (item of aanbod; track item.title) {
              <div class="dark-card rounded-2xl p-6 flex flex-col items-center text-center">
                <div class="w-14 h-14 rounded-full bg-purple-600/20 border border-purple-500/30 flex items-center justify-center mb-4">
                  <mat-icon class="text-purple-400 text-2xl">{{ item.icon }}</mat-icon>
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
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <!-- Links: checklist -->
            <div>
              <ul class="space-y-4 mb-8">
                @for (punt of checklijst; track punt) {
                  <li class="flex items-start gap-3">
                    <mat-icon class="text-purple-400 text-xl mt-0.5 flex-shrink-0">check_circle</mat-icon>
                    <span class="text-gray-300">{{ punt }}</span>
                  </li>
                }
              </ul>
              <div class="flex flex-wrap gap-3">
                <a routerLink="/contact"
                   class="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm">
                  <mat-icon class="text-base">mail</mat-icon>
                  Boekingsaanvraag
                </a>
              </div>
            </div>
            <!-- Rechts: foto -->
            <div class="rounded-2xl overflow-hidden shadow-2xl">
              <img src="partners/ROW2.jpg" alt="ROW1" style="object-position: center 15%"
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
export class Row1Component {
  aanbod = [
    {
      icon: 'nightlife',
      title: 'Club sets',
      description: 'Hoog-energetische hard trance sets voor clubs en underground line-ups.'
    },
    {
      icon: 'festival',
      title: 'Festival sets',
      description: 'Drijvende, percussieve energy die gemaakt is voor grote podia en line-ups.'
    },
    {
      icon: 'celebration',
      title: 'Privé-events',
      description: 'Een rauwe, directe sound voor verjaardagen, feesten en private line-ups.'
    },
    {
      icon: 'bolt',
      title: 'Hard Trance',
      description: 'Signature blend van hard trance en driving, percussieve energie.'
    }
  ];

  checklijst = [
    'Voor clubs, festivals en privé-events',
    'Signature mix van hard trance en percussieve energie',
    'Rauwe, hoog-energetische live sets',
    'Onderdeel van de Europese hard dance underground'
  ];
}
