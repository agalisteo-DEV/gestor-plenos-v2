import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly key = 'gpv2_auth';
  private readonly state = new BehaviorSubject<boolean>(localStorage.getItem(this.key) === '1');
  readonly authState$ = this.state.asObservable();

  login(user: string, pass: string): boolean {
    const ok = user === 'admin' && pass === 'admin';
    if (ok) { localStorage.setItem(this.key, '1'); this.state.next(true); }
    return ok;
  }

  logout(): void { localStorage.removeItem(this.key); this.state.next(false); }
  get isAuthenticated(): boolean { return this.state.value; }
}
