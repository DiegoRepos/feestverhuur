import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../../services/api.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  template: `
    <!-- Hero -->
    <section class="hero-dark text-white py-28 min-h-[480px] flex items-center">
      <div class="container relative z-10">
        <h1 class="text-4xl md:text-6xl font-bold mb-5 max-w-2xl leading-tight">
          Professionele verhuur<br>voor elk event
        </h1>
        <p class="text-lg text-blue-200 mb-10 max-w-xl">
          Complete eventverhuur, professioneel en zorgeloos geregeld.
        </p>
        <div class="flex flex-wrap gap-4">
          <a routerLink="/pakketten" class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-3 rounded-lg transition-colors">
            Bekijk pakketten
          </a>
          <a routerLink="/artikelen" class="border border-white/30 hover:border-white/60 text-white px-7 py-3 rounded-lg transition-colors">
            Losse verhuur
          </a>
        </div>
      </div>
    </section>

    <!-- Categorieën -->
    <section class="bg-[#07071a] py-16">
      <div class="container">
        <div class="flex items-center justify-center gap-4 mb-12">
          <div class="h-px w-16 bg-blue-500/40"></div>
          <p class="text-blue-400 text-base font-bold tracking-[0.35em] uppercase">Pakketten</p>
          <div class="h-px w-16 bg-blue-500/40"></div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          @for (cat of categories; track cat.id) {
            <a [routerLink]="['/pakketten']" [queryParams]="{categoryId: cat.id}"
               class="dark-card rounded-2xl overflow-hidden flex flex-col text-white cursor-pointer group">
              <!-- Afbeelding -->
              <div class="relative h-48 overflow-hidden">
                <img [src]="categoryImage(cat.name)" [alt]="cat.displayName"
                     class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
                <div class="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80"></div>
              </div>
              <!-- Tekst -->
              <div class="p-5 flex flex-col flex-1">
                <p class="text-xs font-bold tracking-widest text-blue-400 uppercase mb-1">{{ cat.displayName }}</p>
                <p class="text-xs text-blue-200 uppercase tracking-wider mb-3">PAKKETTEN</p>
                <p class="text-gray-400 text-sm flex-1 mb-5">{{ cat.description }}</p>
                <span class="flex items-center gap-2 text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                  Bekijk pakketten <mat-icon class="text-base">arrow_forward</mat-icon>
                </span>
              </div>
            </a>
          }
        </div>
        <div class="text-center">
          <a routerLink="/pakketten" class="inline-flex items-center gap-2 text-white border border-white/20 hover:border-white/50 px-6 py-2.5 rounded-lg text-sm transition-colors">
            Meer pakketten bekijken <mat-icon class="text-base">arrow_forward</mat-icon>
          </a>
        </div>
      </div>
    </section>

    <!-- Google Reviews -->
    <section class="bg-[#07071a] border-t border-white/5 py-14">
      <div class="container">
        <div class="flex flex-col md:flex-row gap-10 items-start">
          <div class="flex-shrink-0 text-white">
            <div class="flex items-center gap-3 mb-2">
              <svg class="w-7 h-7" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span class="font-bold text-lg">Google Beoordelingen</span>
            </div>
            <div class="text-5xl font-bold text-white mb-1">4,9</div>
            <div class="flex gap-0.5 mb-1">
              @for (star of [1,2,3,4,5]; track star) {
                <mat-icon class="text-yellow-400 text-xl">star</mat-icon>
              }
            </div>
            <p class="text-gray-400 text-sm">Gebaseerd op 127+ reviews</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
            @for (review of reviews; track review.name) {
              <div class="dark-card rounded-xl p-5 text-white">
                <div class="flex items-center gap-3 mb-3">
                  <div class="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center font-bold text-sm">
                    {{ review.name[0] }}
                  </div>
                  <div>
                    <p class="font-semibold text-sm">{{ review.name }}</p>
                    <p class="text-gray-500 text-xs">{{ review.time }}</p>
                  </div>
                </div>
                <div class="flex gap-0.5 mb-2">
                  @for (star of [1,2,3,4,5]; track star) {
                    <mat-icon class="text-yellow-400 text-sm">star</mat-icon>
                  }
                </div>
                <p class="text-gray-400 text-sm leading-relaxed">"{{ review.text }}"</p>
              </div>
            }
          </div>
        </div>
        <div class="mt-6">
          <a href="#" class="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm transition-colors">
            Bekijk alle reviews op Google <mat-icon class="text-base">arrow_forward</mat-icon>
          </a>
        </div>
      </div>
    </section>
  `
})
export class HomeComponent implements OnInit {
  categories: Category[] = [];

  reviews = [
    { name: 'Thomas de Vries', time: '2 weken geleden', text: 'Top service en kwaliteit! Alles was perfect geregeld en het zag er fantastisch uit. Zeker een aanrader!' },
    { name: 'Sanne Jansen', time: '1 maand geleden', text: 'Dankzij Zyvento was ons feest een groot succes. Professioneel, betrouwbaar en super vriendelijk!' },
    { name: 'Mark Verhoeven', time: '3 weken geleden', text: 'Fijne communicatie en alles tot in de puntjes verzorgd. Wij huren hier zeker weer!' },
  ];

  private readonly categoryOrder = ['KINDERFEEST', 'SWEET_16', 'EVENT_STYLING', 'TROUWFEEST'];

  private readonly images: Record<string, string> = {
    KINDERFEEST:   'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=600&h=400&q=80',
    SWEET_16:      'https://images.unsplash.com/photo-1575132246077-e597d2f15549?auto=format&fit=crop&w=600&h=400&q=80',
    EVENT_STYLING: 'https://images.unsplash.com/photo-1464047736614-af63643285bf?auto=format&fit=crop&w=600&h=400&q=80',
    TROUWFEEST:    'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=600&h=400&q=80',
  };

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getCategories().subscribe(cats => {
      this.categories = this.categoryOrder
        .map(name => cats.find(c => c.name === name))
        .filter((c): c is Category => !!c);
    });
  }

  categoryImage(name: string): string {
    return this.images[name] ?? 'https://picsum.photos/seed/party/600/400';
  }
}
