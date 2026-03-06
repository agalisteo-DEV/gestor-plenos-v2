import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ActivePlenoContext, PlenoContextService } from '../../../core/services/pleno-context.service';

interface DashboardShortcut {
  readonly label: string;
  readonly description: string;
  readonly route: string;
}

@Component({
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.scss'
})
export class DashboardHomeComponent {
  // Vista de entrada del dashboard con accesos al módulo del pleno activo.
  private readonly plenoContext = inject(PlenoContextService);
  readonly activePleno$ = this.plenoContext.activePleno$;

  readonly shortcuts: readonly DashboardShortcut[] = [
    { label: 'Vista general', description: 'Resumen del pleno seleccionado.', route: '' },
    { label: 'Orden del día', description: 'Gestiona puntos y estructura del pleno.', route: 'agenda' },
    { label: 'Documentos', description: 'Administra ficheros asociados al pleno.', route: 'documentos' },
    { label: 'Asistentes', description: 'Control de asistencia de la corporación.', route: 'asistentes' },
    { label: 'Vídeo', description: 'Subida y verificación del vídeo oficial.', route: 'video' },
    { label: 'Autocues', description: 'Marcas de tiempo para navegación.', route: 'autocues' },
    { label: 'Transcripción', description: 'Contenido textual del pleno.', route: 'transcripcion' },
    { label: 'Acta', description: 'Redacción y seguimiento del acta.', route: 'acta' }
  ];

  getShortcutLink(shortcut: DashboardShortcut, active: ActivePlenoContext): readonly string[] {
    return shortcut.route ? ['/app/plenos', active.id, shortcut.route] : ['/app/plenos', active.id];
  }
}
