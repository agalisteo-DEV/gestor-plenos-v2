import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SessionIdleService } from './core/services/session-idle.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  // Instancia el servicio para activar el control global de inactividad.
  private readonly _sessionIdle = inject(SessionIdleService);
}
