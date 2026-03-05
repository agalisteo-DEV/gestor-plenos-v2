import { Observable } from 'rxjs';
import { Pleno, PublicPleno } from '../models/pleno.model';

export abstract class PlenoRepository {
  abstract listPrivate(): Observable<Pleno[]>;
  abstract listPublic(): Observable<PublicPleno[]>;
  abstract getById(id: string): Observable<Pleno | undefined>;
  abstract getBySlug(slug: string): Observable<PublicPleno | undefined>;
}
