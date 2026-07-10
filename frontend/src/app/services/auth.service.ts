import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

// Alleen een UI-vlag voor de route-guard — het echte token zit in een httpOnly
// cookie en is dus niet leesbaar/aanpasbaar vanuit JS. De backend blijft de
// bron van waarheid: elke admin-call faalt met 401 als de cookie ongeldig is.
const LOGGED_IN_FLAG = 'feestverhuur_admin_logged_in';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = environment.apiUrl + '/admin';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<{ username: string }> {
    return this.http.post<{ username: string }>(`${this.base}/login`, { username, password }, { withCredentials: true })
      .pipe(tap(() => localStorage.setItem(LOGGED_IN_FLAG, '1')));
  }

  logout(): void {
    localStorage.removeItem(LOGGED_IN_FLAG);
    this.http.post(`${this.base}/logout`, {}, { withCredentials: true }).subscribe();
  }

  clearSession(): void {
    localStorage.removeItem(LOGGED_IN_FLAG);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(LOGGED_IN_FLAG) === '1';
  }
}
