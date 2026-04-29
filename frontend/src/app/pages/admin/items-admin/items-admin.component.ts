import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { CurrencyPipe, NgFor } from '@angular/common';
import { AdminService } from '../../../services/admin.service';
import { Item } from '../../../models/item.model';

@Component({
  selector: 'app-items-admin',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatTableModule, MatIconModule, MatDialogModule, CurrencyPipe, NgFor],
  template: `
    <div class="container py-8">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold">Artikelen beheren</h1>
        <div class="flex gap-3">
          <a routerLink="/admin/boekingen" mat-stroked-button>Boekingen</a>
          <a routerLink="/admin/pakketten" mat-stroked-button>Pakketten</a>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table mat-table [dataSource]="items" class="w-full">
          <ng-container matColumnDef="id">
            <th mat-header-cell *matHeaderCellDef>#</th>
            <td mat-cell *matCellDef="let i">{{ i.id }}</td>
          </ng-container>
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef>Naam</th>
            <td mat-cell *matCellDef="let i">{{ i.name }}</td>
          </ng-container>
          <ng-container matColumnDef="category">
            <th mat-header-cell *matHeaderCellDef>Categorie</th>
            <td mat-cell *matCellDef="let i">{{ i.category?.displayName }}</td>
          </ng-container>
          <ng-container matColumnDef="pricePerDay">
            <th mat-header-cell *matHeaderCellDef>Prijs/dag</th>
            <td mat-cell *matCellDef="let i">{{ i.pricePerDay | currency:'EUR' }}</td>
          </ng-container>
          <ng-container matColumnDef="deposit">
            <th mat-header-cell *matHeaderCellDef>Waarborg</th>
            <td mat-cell *matCellDef="let i">{{ i.deposit | currency:'EUR' }}</td>
          </ng-container>
          <ng-container matColumnDef="stock">
            <th mat-header-cell *matHeaderCellDef>Stock</th>
            <td mat-cell *matCellDef="let i">{{ i.stock }}</td>
          </ng-container>
          <ng-container matColumnDef="available">
            <th mat-header-cell *matHeaderCellDef>Beschikbaar</th>
            <td mat-cell *matCellDef="let i">
              <mat-icon [class.text-green-500]="i.isAvailable" [class.text-red-400]="!i.isAvailable">
                {{ i.isAvailable ? 'check_circle' : 'cancel' }}
              </mat-icon>
            </td>
          </ng-container>
          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef>Acties</th>
            <td mat-cell *matCellDef="let i">
              <button mat-icon-button color="warn" (click)="delete(i.id)" title="Verwijderen">
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
export class ItemsAdminComponent implements OnInit {
  items: Item[] = [];
  columns = ['id', 'name', 'category', 'pricePerDay', 'deposit', 'stock', 'available', 'actions'];

  constructor(private admin: AdminService) {}

  ngOnInit(): void {
    this.admin.getItems().subscribe(i => this.items = i);
  }

  delete(id: number): void {
    if (!confirm('Artikel verwijderen?')) return;
    this.admin.deleteItem(id).subscribe(() => {
      this.items = this.items.filter(i => i.id !== id);
    });
  }
}
