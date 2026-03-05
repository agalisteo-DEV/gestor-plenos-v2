import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AsyncPipe, NgClass } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { PlenoContextService } from '../../core/services/pleno-context.service';

@Component({
  standalone: true,
  selector: 'app-private-shell',
  imports: [RouterOutlet, RouterLink, AsyncPipe, NgClass],
  templateUrl: './private-shell.component.html',
  styleUrl: './private-shell.component.scss'
})
export class PrivateShellComponent {
  protected readonly auth = inject(AuthService);
  protected readonly ctx = inject(PlenoContextService);
  protected mobileMenuOpen = false;
  protected logout(): void { this.auth.logout(); }
}
