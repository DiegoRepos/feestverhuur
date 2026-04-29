import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';
import { AdminService } from '../../../services/admin.service';
import { RentalPackage } from '../../../models/package.model';

@Component({
  selector: 'app-packages-admin',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatTableModule, MatIconModule, CurrencyPipe],
  template: `
    <div class="container py-8">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold">Pakketten beheren</h1>
        <div class="flex gap-3">
          <a routerLink="/admin/boekingen" mat-stroked-button>Boekingen</a>
          <a routerLink="/admin/artikelen" mat-stroked-button>Artikelen</a>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table mat-table [dataSource]="packages" class="w-full">
          <ng-container matColumnDef="id">
            <th mat-header-cell *matHeaderCellDef>#</th>
            <td mat-cell *matCellDef="let p">{{ p.id }}</td>
          </ng-container>
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef>Naam</th>
            <td mat-cell *matCellDef="let p">{{ p.name }}</td>
          </ng-container>
          <ng-container matColumnDef="category">
            <th mat-header-cell *matHeaderCellDef>Categorie</th>
            <td mat-cell *matCellDef="let p">{{ p.category?.displayName }}</td>
          </ng-container>
          <ng-container matColumnDef="formula">
            <th mat-header-cell *matHeaderCellDef>Formule</th>
            <td mat-cell *matCellDef="let p">{{ p.formula }}</td>
          </ng-container>
          <ng-container matColumnDef="priceFrom">
            <th mat-header-cell *matHeaderCellDef>Prijs v.a.</th>
            <td mat-cell *matCellDef="let p">{{ p.priceFrom | currency:'EUR' }}</td>
          </ng-container>
          <ng-container matColumnDef="active">
            <th mat-header-cell *matHeaderCellDef>Actief</th>
            <td mat-cell *matCellDef="let p">
              <mat-icon [class.text-green-500]="p.isActive" [class.text-red-400]="!p.isActive">
                {{ p.isActive ? 'check_circle' : 'cancel' }}
              </mat-icon>
            </td>
          </ng-container>
          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef>Acties</th>
            <td mat-cell *matCellDef="let p">
              <button mat-icon-button color="warn" (click)="delete(p.id)" title="Verwijderen">
                <mat-icon>delete</mat-icon>
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="columns"></tr>
          <tr mat-row *matRowDef="let row; columns: columns;" class="hover:bg-gray-50"></tr>
        </table>
      </div>
    </div>
  `
})
export class PackagesAdminComponent implements OnInit {
  packages: RentalPackage[] = [];
  columns = ['id', 'name', 'category', 'formula', 'priceFrom', 'active', 'actions'];

  constructor(private admin: AdminService) {}

  ngOnInit(): void {
    this.admin.getPackages().subscribe(p => this.packages = p);
  }

  delete(id: number): void {
    if (!confirm('Pakket verwijderen?')) return;
    this.admin.deletePackage(id).subscribe(() => {
      this.packages = this.packages.filter(p => p.id !== id);
    });
  }
}
