import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SHARED_IMPORTS } from '../../shared-imports';

@Component({
  standalone: true,
  selector: 'app-public-shell',
  imports: [...SHARED_IMPORTS, RouterOutlet, RouterLink],
  templateUrl: './public-shell.component.html',
  styleUrl: './public-shell.component.scss'
})
export class PublicShellComponent {}
