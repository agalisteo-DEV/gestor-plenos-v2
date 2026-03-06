import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';

type AuthMode = 'mock' | 'firebase';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Servicio preparado para alternar entre acceso de pruebas (mock) y Firebase Auth.
  private readonly key = 'gpv2_auth';
  private readonly state = new BehaviorSubject<boolean>(localStorage.getItem(this.key) === '1');
  private readonly authMode: AuthMode = (environment as { authMode?: AuthMode }).authMode ?? 'mock';

  readonly authState$ = this.state.asObservable();

  login(user: string, pass: string): boolean {
    const ok = this.authMode === 'firebase'
      ? this.firebaseLoginPlaceholder(user, pass)
      : this.mockLogin(user, pass);

    if (ok) {
      localStorage.setItem(this.key, '1');
      this.state.next(true);
    }
    return ok;
  }

  logout(): void { localStorage.removeItem(this.key); this.state.next(false); }
  get isAuthenticated(): boolean { return this.state.value; }

  private mockLogin(user: string, pass: string): boolean {
    return user === 'admin' && pass === 'admin';
  }

  private firebaseLoginPlaceholder(_user: string, _pass: string): boolean {
    // TODO: Integrar aquí Firebase Auth cuando se implemente el SRC de usuarios.
    // Se mantiene fallback de pruebas sin bloquear desarrollo.
    return this.mockLogin(_user, _pass);
  }
}
