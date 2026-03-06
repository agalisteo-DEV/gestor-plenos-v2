import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PlenosSearchService {
  // Estado compartido del buscador de plenos en el dashboard privado.
  readonly query = signal<string>('');

  setQuery(value: string): void {
    this.query.set(value);
  }
}
