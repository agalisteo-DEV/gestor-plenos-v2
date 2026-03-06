import { Routes } from '@angular/router';
import { PublicShellComponent } from './layout/public-shell/public-shell.component';
import { PrivateShellComponent } from './layout/private-shell/private-shell.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: PublicShellComponent,
    children: [
      { path: '', loadComponent: () => import('./screens/public/home/home.component').then(m => m.HomeComponent) },
      { path: 'plenos/:slug', loadComponent: () => import('./screens/public/pleno-detail/pleno-detail.component').then(m => m.PlenoDetailComponent) }
    ]
  },
  { path: 'login', loadComponent: () => import('./screens/auth/login/login.component').then(m => m.LoginComponent) },
  {
    path: 'app',
    component: PrivateShellComponent,
    canActivate: [authGuard],
    children: [
      { path: '', loadComponent: () => import('./screens/app/plenos/plenos-grid/plenos-grid.component').then(m => m.PlenosGridComponent) },
      { path: 'dashboard', loadComponent: () => import('./screens/app/dashboard-home/dashboard-home.component').then(m => m.DashboardHomeComponent) },
      { path: 'plenos', loadComponent: () => import('./screens/app/plenos/plenos-grid/plenos-grid.component').then(m => m.PlenosGridComponent) },
      { path: 'plenos/new', loadComponent: () => import('./screens/app/plenos/pleno-form/pleno-form.component').then(m => m.PlenoFormComponent) },
      { path: 'plenos/:id', loadComponent: () => import('./screens/app/plenos/pleno-overview/pleno-overview.component').then(m => m.PlenoOverviewComponent) },
      { path: 'plenos/:id/agenda', loadComponent: () => import('./screens/app/plenos/agenda/agenda.component').then(m => m.AgendaComponent) },
      { path: 'plenos/:id/documentos', loadComponent: () => import('./screens/app/plenos/documentos/documentos.component').then(m => m.DocumentosComponent) },
      { path: 'plenos/:id/asistentes', loadComponent: () => import('./screens/app/plenos/asistentes/asistentes.component').then(m => m.AsistentesComponent) },
      { path: 'plenos/:id/video', loadComponent: () => import('./screens/app/plenos/video/video.component').then(m => m.VideoComponent) },
      { path: 'plenos/:id/autocues', loadComponent: () => import('./screens/app/plenos/autocues/autocues.component').then(m => m.AutocuesComponent) },
      { path: 'plenos/:id/transcripcion', loadComponent: () => import('./screens/app/plenos/transcripcion/transcripcion.component').then(m => m.TranscripcionComponent) },
      { path: 'plenos/:id/acta', loadComponent: () => import('./screens/app/plenos/acta/acta.component').then(m => m.ActaComponent) },
      { path: 'config/ayuntamiento', loadComponent: () => import('./screens/app/config/ayuntamiento/ayuntamiento.component').then(m => m.AyuntamientoComponent) },
      { path: 'config/usuarios', loadComponent: () => import('./screens/app/config/usuarios/usuarios.component').then(m => m.UsuariosComponent) },
      { path: 'config/roles', loadComponent: () => import('./screens/app/config/roles/roles.component').then(m => m.RolesComponent) },
      { path: 'config/corporacion', loadComponent: () => import('./screens/app/config/corporacion/corporacion.component').then(m => m.CorporacionComponent) },
      { path: 'config/partidos', loadComponent: () => import('./screens/app/config/partidos/partidos.component').then(m => m.PartidosComponent) },
      { path: 'config/canales', loadComponent: () => import('./screens/app/config/canales/canales.component').then(m => m.CanalesComponent) },
      { path: 'config/media', loadComponent: () => import('./screens/app/config/media/media.component').then(m => m.MediaComponent) },
      { path: 'config/manuales', loadComponent: () => import('./screens/app/config/manuales/manuales.component').then(m => m.ManualesComponent) }
    ]
  },
  { path: '**', redirectTo: '' }
];
