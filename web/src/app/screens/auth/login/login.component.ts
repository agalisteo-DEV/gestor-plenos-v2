import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { AppLanguage, I18nService, TranslationKey } from '../../../core/services/i18n.service';

@Component({
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  // Pantalla de acceso principal para entrar al dashboard privado.
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  readonly i18n = inject(I18nService);
  readonly languageOptions = this.i18n.languages;
  username = 'admin';
  password = '';
  logoPath = 'assets/images/logo-login.webp';
  hidePassword = true;
  errorKey: TranslationKey | null = null;

  constructor() {
    if (this.auth.isAuthenticated) {
      void this.router.navigateByUrl('/app/plenos');
    }
  }

  submit(): void {
    if (this.auth.login(this.username, this.password)) {
      this.errorKey = null;
      this.router.navigateByUrl('/app/plenos');
      return;
    }
    this.errorKey = 'login.error.invalidCredentialsCheck';
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  setLanguage(language: AppLanguage): void {
    this.i18n.setLanguage(language);
  }
}
