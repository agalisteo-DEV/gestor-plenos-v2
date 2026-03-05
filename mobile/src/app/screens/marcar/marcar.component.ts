import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './marcar.component.html',
  styleUrl: './marcar.component.scss'
})
export class MarcarComponent {
  puntos: string[] = ['Apertura de sesión', 'Aprobación acta anterior', 'Ruegos y preguntas', 'Cierre'];
}
