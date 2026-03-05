import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  username = 'admin';
  password = 'admin';
  error = '';

  submit(): void {
    if (this.auth.login(this.username, this.password)) {
      this.router.navigateByUrl('/app/plenos');
      return;
    }
    this.error = 'Credenciales inválidas';
  }
}
