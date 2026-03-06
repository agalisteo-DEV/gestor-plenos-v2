import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AsyncPipe, NgClass } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { PlenoContextService } from '../../core/services/pleno-context.service';
import { MatIconModule } from '@angular/material/icon';
import { AppLanguage, I18nService, TranslationKey } from '../../core/services/i18n.service';
import { PlenoLocalRepository } from '../../data-access/pleno-local.repository';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { PlenosSearchService } from '../../core/services/plenos-search.service';
import { PlenosUiStateService } from '../../core/services/plenos-ui-state.service';

interface ShellNavItem {
  readonly labelKey: TranslationKey;
  readonly icon: string;
  readonly link: string;
  readonly exact?: boolean;
}

@Component({
  standalone: true,
  selector: 'app-private-shell',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, AsyncPipe, NgClass, MatIconModule],
  templateUrl: './private-shell.component.html',
  styleUrl: './private-shell.component.scss'
})
export class PrivateShellComponent {
  protected readonly auth = inject(AuthService);
  protected readonly ctx = inject(PlenoContextService);
  protected readonly router = inject(Router);
  protected readonly i18n = inject(I18nService);
  protected readonly plenoRepo = inject(PlenoLocalRepository);
  protected readonly plenosSearch = inject(PlenosSearchService);
  protected readonly plenosUiState = inject(PlenosUiStateService);
  protected mobileMenuOpen = false;
  protected readonly identityName = 'Gestor Plenos v2';
  protected readonly townHallName = 'Ayuntamiento de Torrejón de Velasco';
  protected readonly signedUser = 'Administrador';
  private readonly repoHasPlenos = toSignal(
    this.plenoRepo.listPrivate().pipe(map((plenos) => plenos.length > 0)),
    { initialValue: false }
  );
  protected readonly hasPlenos = computed(() => this.plenosUiState.hasPlenos() ?? this.repoHasPlenos());

  protected readonly mainNavigation: readonly ShellNavItem[] = [
    { labelKey: 'private.nav.plenos', icon: 'event_note', link: '/app/plenos', exact: false }
  ];

  protected readonly selectedPlenoNavigation: readonly ShellNavItem[] = [
    { labelKey: 'private.nav.overview', icon: 'dashboard', link: 'overview' },
    { labelKey: 'private.nav.documents', icon: 'folder', link: 'documentos' },
    { labelKey: 'private.nav.agenda', icon: 'list_alt', link: 'agenda' },
    { labelKey: 'private.nav.attendees', icon: 'groups', link: 'asistentes' },
    { labelKey: 'private.nav.video', icon: 'videocam', link: 'video' },
    { labelKey: 'private.nav.autocues', icon: 'av_timer', link: 'autocues' },
    { labelKey: 'private.nav.transcription', icon: 'article', link: 'transcripcion' },
    { labelKey: 'private.nav.minutes', icon: 'description', link: 'acta' },
    { labelKey: 'private.nav.publication', icon: 'public', link: 'publicacion' }
  ];

  protected readonly configNavigation: readonly ShellNavItem[] = [
    { labelKey: 'private.nav.ayuntamiento', icon: 'apartment', link: '/app/config/ayuntamiento' },
    { labelKey: 'private.nav.usuarios', icon: 'manage_accounts', link: '/app/config/usuarios' },
    { labelKey: 'private.nav.roles', icon: 'admin_panel_settings', link: '/app/config/roles' },
    { labelKey: 'private.nav.corporacion', icon: 'groups_2', link: '/app/config/corporacion' },
    { labelKey: 'private.nav.partidos', icon: 'flag', link: '/app/config/partidos' },
    { labelKey: 'private.nav.canales', icon: 'hub', link: '/app/config/canales' },
    { labelKey: 'private.nav.media', icon: 'perm_media', link: '/app/config/media' },
    { labelKey: 'private.nav.manuales', icon: 'menu_book', link: '/app/config/manuales' }
  ];

  protected readonly routeTitleKeys: Record<string, TranslationKey> = {
    '/app/plenos': 'private.screen.plenos',
    '/app/plenos/new': 'private.screen.newPleno',
    '/app/config/ayuntamiento': 'private.screen.configAyuntamiento',
    '/app/config/usuarios': 'private.screen.configUsuarios',
    '/app/config/roles': 'private.screen.configRoles',
    '/app/config/corporacion': 'private.screen.configCorporacion',
    '/app/config/partidos': 'private.screen.configPartidos',
    '/app/config/canales': 'private.screen.configCanales',
    '/app/config/media': 'private.screen.configMedia',
    '/app/config/manuales': 'private.screen.configManuales'
  };
  protected readonly breadcrumbSegmentKeys: Record<string, TranslationKey> = {
    plenos: 'plenos.title',
    config: 'private.section.configuration',
    ayuntamiento: 'private.nav.ayuntamiento',
    usuarios: 'private.nav.usuarios',
    roles: 'private.nav.roles',
    corporacion: 'private.nav.corporacion',
    partidos: 'private.nav.partidos',
    canales: 'private.nav.canales',
    media: 'private.nav.media',
    manuales: 'private.nav.manuales'
  };

  protected get screenTitle(): string {
    // Dependencia explícita para refrescar al cambiar idioma.
    this.i18n.currentLanguage();
    const normalizedUrl = this.router.url.split('?')[0];
    const directTitleKey = this.routeTitleKeys[normalizedUrl];
    if (directTitleKey) {
      return this.i18n.t(directTitleKey);
    }
    if (normalizedUrl.startsWith('/app/plenos/')) {
      return this.i18n.t('private.screen.plenoDetail');
    }
    return this.i18n.t('private.screen.default');
  }

  protected get breadcrumb(): string {
    // Dependencia explícita para refrescar al cambiar idioma.
    this.i18n.currentLanguage();
    const normalizedUrl = this.router.url.split('?')[0];
    if (!normalizedUrl.startsWith('/app')) {
      return this.i18n.t('private.breadcrumb.dashboard');
    }
    const parts = normalizedUrl.split('/').filter(Boolean);
    const translatedParts = parts.map((part, index) => {
      if (index === 0) {
        return this.i18n.t('private.breadcrumb.dashboard');
      }
      const key = this.breadcrumbSegmentKeys[part];
      return key ? this.i18n.t(key) : part;
    });
    return translatedParts.join(' / ');
  }

  protected getPlenoRoute(activeId: string, item: ShellNavItem): readonly string[] {
    if (item.link === 'overview') {
      return ['/app/plenos', activeId];
    }
    if (item.link === 'publicacion') {
      return ['/app/plenos', activeId];
    }
    return ['/app/plenos', activeId, item.link];
  }

  protected closeMobileSidebar(): void {
    this.mobileMenuOpen = false;
  }

  protected setLanguage(language: AppLanguage): void {
    this.i18n.setLanguage(language);
  }

  protected onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement | null;
    this.plenosSearch.setQuery(target?.value ?? '');
  }

  protected logout(): void {
    this.auth.logout();
    void this.router.navigateByUrl('/login');
  }
}
