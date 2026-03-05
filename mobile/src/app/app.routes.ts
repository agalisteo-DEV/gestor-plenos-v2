import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'marcar', pathMatch: 'full' },
  { path: 'marcar', loadComponent: () => import('./screens/marcar/marcar.component').then(m => m.MarcarComponent) },
  { path: '**', redirectTo: 'marcar' }
];
