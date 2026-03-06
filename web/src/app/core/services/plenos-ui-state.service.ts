import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PlenosUiStateService {
  // Estado visual compartido para sincronizar shell y pantalla de plenos.
  private readonly hasPlenosState = signal<boolean | null>(null);
  readonly hasPlenos = this.hasPlenosState.asReadonly();

  setHasPlenos(value: boolean): void {
    this.hasPlenosState.set(value);
  }

  clear(): void {
    this.hasPlenosState.set(null);
  }
}
