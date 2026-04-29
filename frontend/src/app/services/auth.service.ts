import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

const TOKEN_KEY = 'feestverhuur_admin_token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = 'http://localhost:8080/api/admin';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.base}/login`, { username, password })
      .pipe(tap(res => localStorage.setItem(TOKEN_KEY, res.token)));
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
