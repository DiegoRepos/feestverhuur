import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="bg-primary-900 text-white mt-16 py-10">
      <div class="container grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 class="font-bold text-lg mb-3">Feestverhuur</h3>
          <p class="text-gray-400 text-sm">Jouw partner voor onvergetelijke feesten. Pakketten en losse verhuur voor elk type event.</p>
        </div>
        <div>
          <h3 class="font-bold text-lg mb-3">Navigatie</h3>
          <ul class="space-y-2 text-sm text-gray-400">
            <li><a routerLink="/pakketten" class="hover:text-white transition-colors">Pakketten</a></li>
            <li><a routerLink="/artikelen" class="hover:text-white transition-colors">Losse artikelen</a></li>
            <li><a routerLink="/voorwaarden" class="hover:text-white transition-colors">Verhuurvoorwaarden</a></li>
            <li><a routerLink="/contact" class="hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>
        <div>
          <h3 class="font-bold text-lg mb-3">Capaciteit</h3>
          <ul class="text-sm text-gray-400 space-y-1">
            <li>Zittend tot 250 personen</li>
            <li>Staand tot 400 personen</li>
            <li>Buiten tot 300 personen</li>
          </ul>
        </div>
      </div>
      <div class="container mt-8 pt-6 border-t border-gray-700 text-sm text-gray-500 flex justify-between">
        <span>© {{ year }} Feestverhuur. Alle rechten voorbehouden.</span>
        <a routerLink="/voorwaarden" class="hover:text-white transition-colors">Voorwaarden</a>
      </div>
    </footer>
  `
})
export class FooterComponent {
  year = new Date().getFullYear();
}
