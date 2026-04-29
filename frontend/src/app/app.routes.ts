import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'pakketten', loadComponent: () => import('./pages/packages/packages.component').then(m => m.PackagesComponent) },
  { path: 'pakketten/:id', loadComponent: () => import('./pages/package-detail/package-detail.component').then(m => m.PackageDetailComponent) },
  { path: 'artikelen', loadComponent: () => import('./pages/items/items.component').then(m => m.ItemsComponent) },
  { path: 'artikelen/:id', loadComponent: () => import('./pages/item-detail/item-detail.component').then(m => m.ItemDetailComponent) },
  { path: 'winkelwagen', loadComponent: () => import('./pages/cart/cart.component').then(m => m.CartComponent) },
  { path: 'boeken', loadComponent: () => import('./pages/booking/booking.component').then(m => m.BookingComponent) },
  { path: 'betaling/succes', loadComponent: () => import('./pages/payment-success/payment-success.component').then(m => m.PaymentSuccessComponent) },
  { path: 'betaling/geannuleerd', loadComponent: () => import('./pages/payment-cancelled/payment-cancelled.component').then(m => m.PaymentCancelledComponent) },
  { path: 'voorwaarden', loadComponent: () => import('./pages/terms/terms.component').then(m => m.TermsComponent) },
  { path: 'contact', loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent) },
  { path: 'admin/login', loadComponent: () => import('./pages/admin/login/login.component').then(m => m.LoginComponent) },
  { path: 'admin/boekingen', canActivate: [authGuard], loadComponent: () => import('./pages/admin/bookings/bookings.component').then(m => m.BookingsComponent) },
  { path: 'admin/artikelen', canActivate: [authGuard], loadComponent: () => import('./pages/admin/items-admin/items-admin.component').then(m => m.ItemsAdminComponent) },
  { path: 'admin/pakketten', canActivate: [authGuard], loadComponent: () => import('./pages/admin/packages-admin/packages-admin.component').then(m => m.PackagesAdminComponent) },
  { path: 'admin', redirectTo: 'admin/boekingen', pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];
