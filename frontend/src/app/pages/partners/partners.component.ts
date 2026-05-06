import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Partner {
  name: string;
  description: string;
  image: string;
  logo?: boolean;
  route?: string;
  href?: string;
}

@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="bg-[#07071a] min-h-screen">

      <!-- Hero -->
      <section class="hero-dark text-white py-20">
        <div class="container relative z-10">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">Onze Partners</h1>
          <p class="text-blue-300 text-lg max-w-xl">
            Samenwerkingen waar we trots op zijn.<br>
            Dankzij onze partners maken we elk event compleet.
          </p>
        </div>
      </section>

      <!-- Partner kaarten -->
      <section class="bg-[#07071a] py-16">
        <div class="container">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            @for (partner of partners; track partner.name) {
              <div class="dark-card rounded-2xl overflow-hidden flex flex-col text-white">
                <!-- Afbeelding -->
                <div class="h-56 overflow-hidden flex items-center justify-center"
                     [class.bg-black]="partner.logo">
                  <img [src]="partner.image" [alt]="partner.name"
                       [class]="partner.logo ? 'w-40 h-40 object-contain rounded-full' : 'w-full h-full object-cover'">
                </div>
                <!-- Tekst -->
                <div class="p-6 flex flex-col flex-1 items-center text-center">
                  <h2 class="text-xl font-bold text-white mb-3">{{ partner.name }}</h2>
                  <p class="text-gray-400 text-sm leading-relaxed flex-1 mb-6">{{ partner.description }}</p>
                  @if (partner.route) {
                    <a [routerLink]="partner.route"
                       class="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors">
                      Meer info
                    </a>
                  } @else {
                    <a [href]="partner.href" target="_blank"
                       class="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors">
                      Meer info
                    </a>
                  }
                </div>
              </div>
            }
          </div>
        </div>
      </section>

    </div>
  `
})
export class PartnersComponent {
  partners: Partner[] = [
    {
      name: 'PeMa Foodtruck',
      description: 'Authentieke Griekse specialiteiten, aangevuld met frituur, BBQ en hotdogkraam – een veelzijdige foodervaring voor elk event en feest.',
      image: 'partners/pema.jpeg',
      route: '/partners/pema-foodtruck'
    },
    {
      name: 'Wonka Events',
      description: 'Creatieve eventproductie en entertainment voor evenementen die indruk maken.',
      image: 'partners/wonka.jpeg',
      href: '#'
    }
  ];
}
