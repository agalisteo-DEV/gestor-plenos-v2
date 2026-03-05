import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ActivePlenoContext { id: string; title: string; slug: string; }

@Injectable({ providedIn: 'root' })
export class PlenoContextService {
  private readonly key = 'gpv2_active_pleno';
  private readonly state = new BehaviorSubject<ActivePlenoContext | null>(this.read());
  readonly activePleno$ = this.state.asObservable();

  setActivePleno(ctx: ActivePlenoContext): void { localStorage.setItem(this.key, JSON.stringify(ctx)); this.state.next(ctx); }
  clear(): void { localStorage.removeItem(this.key); this.state.next(null); }
  get activePlenoId(): string | null { return this.state.value?.id ?? null; }
  private read(): ActivePlenoContext | null { const raw = localStorage.getItem(this.key); return raw ? JSON.parse(raw) as ActivePlenoContext : null; }
}
