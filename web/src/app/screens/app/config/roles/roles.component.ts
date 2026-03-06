import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface RoleSummary {
  readonly name: string;
  readonly users: number;
  readonly description: string;
}

interface PermissionRow {
  readonly module: string;
  readonly view: boolean;
  readonly create: boolean;
  readonly update: boolean;
  readonly remove: boolean;
}

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss'
})
export class RolesComponent {
  // Pantalla base para definir roles y permisos de usuarios.
  protected readonly roles: readonly RoleSummary[] = [
    { name: 'ADMIN', users: 2, description: 'Acceso completo a configuración y operación del sistema.' },
    { name: 'SECRETARIA', users: 4, description: 'Gestión documental y control operativo de plenos.' },
    { name: 'AUXILIAR', users: 5, description: 'Apoyo en edición de contenidos y tareas de seguimiento.' },
    { name: 'LECTOR', users: 3, description: 'Solo visualización de módulos habilitados.' }
  ];

  protected readonly permissionsPreview: readonly PermissionRow[] = [
    { module: 'Plenos', view: true, create: true, update: true, remove: false },
    { module: 'Documentos', view: true, create: true, update: true, remove: true },
    { module: 'Autocues', view: true, create: true, update: true, remove: false },
    { module: 'Transcripción', view: true, create: false, update: true, remove: false },
    { module: 'Configuración', view: true, create: false, update: false, remove: false }
  ];
}
