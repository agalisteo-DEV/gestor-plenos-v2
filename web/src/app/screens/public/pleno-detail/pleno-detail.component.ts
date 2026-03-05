import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { SHARED_IMPORTS } from '../../../shared-imports';
import { PlenoLocalRepository } from '../../../data-access/pleno-local.repository';

@Component({
  standalone: true,
  imports: [...SHARED_IMPORTS],
  templateUrl: './pleno-detail.component.html',
  styleUrl: './pleno-detail.component.scss'
})
export class PlenoDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly repo = inject(PlenoLocalRepository);
  protected readonly pleno$ = this.route.paramMap.pipe(
    map(params => params.get('slug') ?? ''),
    switchMap(slug => this.repo.getBySlug(slug))
  );
}
