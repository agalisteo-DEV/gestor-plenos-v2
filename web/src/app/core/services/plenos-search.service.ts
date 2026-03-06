import { Injectable, computed, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PlenosSearchService {
  // Estado compartido del buscador del dashboard, aislado por pantalla/ruta.
  private readonly activeContextState = signal<string>('plenos');
  private readonly queriesByContext = signal<Record<string, string>>({});
  readonly query = computed(() => this.queriesByContext()[this.activeContextState()] ?? '');
  readonly activeContext = this.activeContextState.asReadonly();

  setContext(context: string): void {
    this.activeContextState.set(context);
  }

  setQuery(value: string, context?: string): void {
    const targetContext = context ?? this.activeContextState();
    this.queriesByContext.update((current) => ({ ...current, [targetContext]: value }));
  }

  clearContext(context: string): void {
    this.queriesByContext.update((current) => ({ ...current, [context]: '' }));
  }
}
