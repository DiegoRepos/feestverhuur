import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, ReactiveFormsModule, NgIf],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-50">
      <div class="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md">
        <h1 class="text-3xl font-bold mb-2 text-center">Admin login</h1>
        <p class="text-gray-500 text-center mb-8">Feestverhuur beheerpanel</p>

        @if (error) {
          <div class="bg-red-50 text-red-700 rounded-lg p-3 mb-4 text-sm">{{ error }}</div>
        }

        <form [formGroup]="form" (ngSubmit)="login()" class="space-y-4">
          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Gebruikersnaam</mat-label>
            <input matInput formControlName="username">
          </mat-form-field>
          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Wachtwoord</mat-label>
            <input matInput type="password" formControlName="password">
          </mat-form-field>
          <button mat-raised-button color="primary" type="submit" class="w-full py-3" [disabled]="form.invalid || loading">
            @if (loading) {<mat-spinner diameter="20" class="inline-block mr-2"></mat-spinner>}
            Inloggen
          </button>
        </form>
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
