import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SHARED_IMPORTS } from '../../../../shared-imports';
import { PlenoLocalRepository } from '../../../../data-access/pleno-local.repository';
import { PlenoContextService } from '../../../../core/services/pleno-context.service';

@Component({
  standalone: true,
  imports: [...SHARED_IMPORTS, RouterLink],
  templateUrl: './plenos-grid.component.html',
  styleUrl: './plenos-grid.component.scss'
})
export class PlenosGridComponent {
  protected readonly repo = inject(PlenoLocalRepository);
  protected readonly ctx = inject(PlenoContextService);
  protected readonly plenos$ = this.repo.listPrivate();
  protected setActive(id: string, title: string, slug: string): void { this.ctx.setActivePleno({ id, title, slug }); }
}
