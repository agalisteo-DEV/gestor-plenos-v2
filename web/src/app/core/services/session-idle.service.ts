import { Injectable, OnDestroy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class SessionIdleService implements OnDestroy {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private timerId?: ReturnType<typeof setTimeout>;
  private readonly timeoutMs = 15 * 60 * 1000;

  startWatching(): void {
    ['click', 'keydown', 'mousemove', 'touchstart'].forEach(e => window.addEventListener(e, this.resetTimer));
    this.resetTimer();
  }

  stopWatching(): void {
    ['click', 'keydown', 'mousemove', 'touchstart'].forEach(e => window.removeEventListener(e, this.resetTimer));
    if (this.timerId) clearTimeout(this.timerId);
  }

  private readonly resetTimer = (): void => {
    if (this.timerId) clearTimeout(this.timerId);
    this.timerId = setTimeout(() => {
      this.auth.logout();
      this.router.navigateByUrl('/login');
    }, this.timeoutMs);
  };

  ngOnDestroy(): void { this.stopWatching(); }
}
