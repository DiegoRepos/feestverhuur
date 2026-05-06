import { Injectable, signal, computed } from '@angular/core';
import { CartLine } from '../models/booking.model';

const CART_KEY = 'feestverhuur_cart';
const DATES_KEY = 'feestverhuur_dates';

@Injectable({ providedIn: 'root' })
export class CartService {
  private _lines = signal<CartLine[]>(this.loadLines());
  private _startDate = signal<string>(this.loadDates().startDate);
  private _endDate = signal<string>(this.loadDates().endDate);

  lines = this._lines.asReadonly();
  startDate = this._startDate.asReadonly();
  endDate = this._endDate.asReadonly();

  count = computed(() => this._lines().reduce((sum, l) => sum + l.quantity, 0));

  totalDays = computed(() => {
    if (!this._startDate() || !this._endDate()) return 1;
    const start = new Date(this._startDate());
    const end = new Date(this._endDate());
    const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    return diff > 0 ? diff : 1;
  });

  total = computed(() => {
    const days = this.totalDays();
    return this._lines().reduce((sum, l) => {
      const unitPrice = l.pricePerDay != null ? l.pricePerDay * days : (l.priceFixed ?? 0);
      return sum + unitPrice * l.quantity;
    }, 0);
  });

  addItem(line: CartLine): void {
    this._lines.update(lines => {
      const existing = lines.find(l => l.type === line.type && l.id === line.id);
      if (existing) {
        const max = line.stock ?? Infinity;
        const newQty = Math.min(existing.quantity + line.quantity, max);
        return lines.map(l =>
          l.type === line.type && l.id === line.id
            ? { ...l, quantity: newQty }
            : l
        );
      }
      return [...lines, line];
    });
    this.saveLines();
  }

  removeItem(type: 'item' | 'package', id: number): void {
    this._lines.update(lines => lines.filter(l => !(l.type === type && l.id === id)));
    this.saveLines();
  }

  updateQuantity(type: 'item' | 'package', id: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeItem(type, id);
      return;
    }
    this._lines.update(lines =>
      lines.map(l => {
        if (l.type !== type || l.id !== id) return l;
        const max = l.stock ?? Infinity;
        return { ...l, quantity: Math.min(quantity, max) };
      })
    );
    this.saveLines();
  }

  setDates(startDate: string, endDate: string): void {
    this._startDate.set(startDate);
    this._endDate.set(endDate);
    localStorage.setItem(DATES_KEY, JSON.stringify({ startDate, endDate }));
  }

  clear(): void {
    this._lines.set([]);
    this._startDate.set('');
    this._endDate.set('');
    localStorage.removeItem(CART_KEY);
    localStorage.removeItem(DATES_KEY);
  }

  private saveLines(): void {
    localStorage.setItem(CART_KEY, JSON.stringify(this._lines()));
  }

  private loadLines(): CartLine[] {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY) ?? '[]');
    } catch {
      return [];
    }
  }

  private loadDates(): { startDate: string; endDate: string } {
    try {
      return JSON.parse(localStorage.getItem(DATES_KEY) ?? '{}');
    } catch {
      return { startDate: '', endDate: '' };
    }
  }
}
