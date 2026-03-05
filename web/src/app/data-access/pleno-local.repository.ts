import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PlenoRepository } from './pleno.repository';
import { EstadoPleno, Pleno, PublicPleno } from '../models/pleno.model';

@Injectable({ providedIn: 'root' })
export class PlenoLocalRepository extends PlenoRepository {
  private readonly plenos: Pleno[] = Array.from({ length: 10 }).map((_, i) => ({
    id: `${i + 1}`,
    slug: `pleno-${i + 1}-2026`,
    title: `Pleno ${i + 1} de 2026`,
    dateIso: `2026-${String((i % 9) + 1).padStart(2, '0')}-1${i % 9}`,
    resumen: 'Sesión municipal con puntos de agenda, votaciones y ruegos.',
    imageUrl: `https://picsum.photos/seed/pleno${i + 1}/900/500`,
    estado: i % 3 === 0 ? EstadoPleno.CERRADO : i % 2 === 0 ? EstadoPleno.PUBLICADO : EstadoPleno.BORRADOR,
    canal: i % 2 ? '2026' : '2025',
    tipo: i % 2 ? 'ORDINARIO' : 'EXTRAORDINARIO',
    descripcionInterna: 'Documento interno de coordinación del pleno.',
    asistentes: ['Alcaldía', 'Secretaría', 'Intervención']
  }));

  listPrivate(): Observable<Pleno[]> { return of(this.plenos); }
  listPublic(): Observable<PublicPleno[]> { return of(this.plenos.filter(p => p.estado !== EstadoPleno.BORRADOR)); }
  getById(id: string): Observable<Pleno | undefined> { return of(this.plenos.find(p => p.id === id)); }
  getBySlug(slug: string): Observable<PublicPleno | undefined> { return of(this.plenos.find(p => p.slug === slug)); }
}
