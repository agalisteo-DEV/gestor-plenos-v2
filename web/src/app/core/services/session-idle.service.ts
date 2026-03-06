import { Injectable, OnDestroy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SessionIdleService implements OnDestroy {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly authSubscription: Subscription;
  private timerId?: ReturnType<typeof setTimeout>;
  private readonly timeoutMs = 5 * 60 * 1000;
  private isWatching = false;

  constructor() {
    // Activa control de inactividad solo cuando hay sesión autenticada.
    this.authSubscription = this.auth.authState$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.startWatching();
        return;
      }
      this.stopWatching();
    });
  }

  startWatching(): void {
    if (this.isWatching) {
      this.resetTimer();
      return;
    }
    ['click', 'keydown', 'mousemove', 'touchstart'].forEach(e => window.addEventListener(e, this.resetTimer));
    this.isWatching = true;
    this.resetTimer();
  }

  stopWatching(): void {
    if (!this.isWatching) {
      return;
    }
    ['click', 'keydown', 'mousemove', 'touchstart'].forEach(e => window.removeEventListener(e, this.resetTimer));
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = undefined;
    }
    this.isWatching = false;
  }

  private readonly resetTimer = (): void => {
    if (this.timerId) clearTimeout(this.timerId);
    this.timerId = setTimeout(() => {
      this.auth.logout();
      this.router.navigateByUrl('/login');
    }, this.timeoutMs);
  };

  ngOnDestroy(): void {
    this.stopWatching();
    this.authSubscription.unsubscribe();
  }
}
