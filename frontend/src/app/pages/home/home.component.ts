import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ApiService } from '../../services/api.service';
import { Category } from '../../models/category.model';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatIconModule, MatCardModule, NgFor],
  template: `
    <!-- Hero -->
    <section class="hero-gradient text-white py-24">
      <div class="container text-center">
        <h1 class="text-4xl md:text-6xl font-bold mb-6">Jouw feest, onze zorg</h1>
        <p class="text-xl md:text-2xl text-indigo-200 mb-10 max-w-2xl mx-auto">
          Van kinderfeest tot groot event — wij leveren alles wat je nodig hebt voor een onvergetelijk feest.
        </p>
        <div class="flex flex-wrap gap-4 justify-center">
          <a routerLink="/pakketten" mat-raised-button class="bg-white text-primary-800 font-bold px-8 py-3 rounded-lg text-lg">
            Bekijk pakketten
          </a>
          <a routerLink="/artikelen" mat-stroked-button class="border-white text-white px-8 py-3 rounded-lg text-lg">
            Losse verhuur
          </a>
        </div>
      </div>
    </section>

    <!-- Categorieën -->
    <section class="section">
      <div class="container">
        <h2 class="text-3xl font-bold text-center mb-2">Ons aanbod</h2>
        <p class="text-gray-500 text-center mb-10">Kies een pakket of huur artikelen los</p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          @for (cat of categories; track cat.id) {
            <a [routerLink]="['/pakketten']" [queryParams]="{categoryId: cat.id}"
               class="card-hover bg-white rounded-2xl p-6 shadow-md text-center cursor-pointer border border-gray-100">
              <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <mat-icon class="text-primary-600 text-3xl">{{ categoryIcon(cat.name) }}</mat-icon>
              </div>
              <h3 class="font-bold text-lg mb-2">{{ cat.displayName }}</h3>
              <p class="text-gray-500 text-sm">{{ cat.description }}</p>
            </a>
          }
        </div>
      </div>
    </section>

    <!-- Capaciteit -->
    <section class="bg-primary-900 text-white py-16">
      <div class="container">
        <h2 class="text-3xl font-bold text-center mb-10">Onze capaciteit</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div class="text-5xl font-bold text-accent-400 mb-2">250</div>
            <div class="text-lg">personen zittend</div>
          </div>
          <div>
            <div class="text-5xl font-bold text-accent-400 mb-2">400</div>
            <div class="text-lg">personen staand</div>
          </div>
          <div>
            <div class="text-5xl font-bold text-accent-400 mb-2">300</div>
            <div class="text-lg">personen buiten</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section text-center">
      <div class="container">
        <h2 class="text-3xl font-bold mb-4">Klaar om te beginnen?</h2>
        <p class="text-gray-500 mb-8">Kies een pakket of stel je eigen opstelling samen uit losse artikelen.</p>
        <a routerLink="/pakketten" mat-raised-button color="primary" class="px-10 py-3 text-lg">
          Ontdek de pakketten
        </a>
      </div>
    </section>
  `
})
export class HomeComponent implements OnInit {
  categories: Category[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getCategories().subscribe(cats => {
      this.categories = cats.filter(c => c.name !== 'EXTRA');
    });
  }

  categoryIcon(name: string): string {
    const icons: Record<string, string> = {
      KINDERFEEST: 'child_care',
      SWEET_16: 'celebration',
      EVENT_STYLING: 'star',
      SIMPLE_PARTY: 'outdoor_grill',
    };
    return icons[name] ?? 'event';
  }
}
