import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SHARED_IMPORTS } from '../../../shared-imports';
import { PlenoLocalRepository } from '../../../data-access/pleno-local.repository';

@Component({
  standalone: true,
  imports: [...SHARED_IMPORTS, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  protected readonly repo = inject(PlenoLocalRepository);
  protected readonly plenos$ = this.repo.listPublic();
}
