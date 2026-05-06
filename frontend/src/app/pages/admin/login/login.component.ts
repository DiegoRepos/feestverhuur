import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule],
  template: `
    <div class="bg-[#07071a] min-h-screen flex items-center justify-center px-4">
      <div class="w-full max-w-sm">

        <!-- Logo -->
        <div class="text-center mb-8">
          <span class="text-2xl font-bold tracking-widest text-white">ZYVENTO</span>
          <div class="inline-flex items-center gap-1.5 bg-blue-600/20 border border-blue-500/30 text-blue-400 text-xs font-bold px-3 py-1 rounded-full mt-2 mx-auto">
            <mat-icon class="text-xs" style="font-size:14px;width:14px;height:14px;">shield</mat-icon>
            Admin Panel
          </div>
        </div>

        <!-- Card -->
        <div class="dark-card rounded-2xl p-8">
          <h1 class="text-xl font-bold text-white mb-1">Inloggen</h1>
          <p class="text-gray-500 text-sm mb-6">Toegang tot het beheerpaneel</p>

          @if (error) {
            <div class="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-4 py-3 mb-5 text-sm">
              <mat-icon class="text-base shrink-0">error_outline</mat-icon>
              {{ error }}
            </div>
          }

          <form [formGroup]="form" (ngSubmit)="login()" class="space-y-4">
            <div class="flex flex-col gap-1.5">
              <label class="text-sm text-gray-400">Gebruikersnaam</label>
              <input formControlName="username" type="text" placeholder="admin"
                     class="bg-white/5 border border-white/20 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors">
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-sm text-gray-400">Wachtwoord</label>
              <input formControlName="password" type="password" placeholder="••••••••"
                     class="bg-white/5 border border-white/20 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors">
            </div>
            <button type="submit" [disabled]="form.invalid || loading"
                    class="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-xl transition-colors mt-2">
              @if (loading) {
                <svg class="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
              }
              Inloggen
            </button>
          </form>
        </div>

      </div>
    </div>
  `
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  loading = false;
  error = '';

  login(): void {
    this.loading = true;
    this.error = '';
    const { username, password } = this.form.value;
    this.auth.login(username!, password!).subscribe({
      next: () => this.router.navigate(['/admin/boekingen']),
      error: () => {
        this.error = 'Ongeldige inloggegevens';
        this.loading = false;
      }
    });
  }
}
