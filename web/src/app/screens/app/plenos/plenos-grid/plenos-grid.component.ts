import { Component, HostListener, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SHARED_IMPORTS } from '../../../../shared-imports';
import { PlenoLocalRepository } from '../../../../data-access/pleno-local.repository';
import { PlenoContextService } from '../../../../core/services/pleno-context.service';
import { EstadoPleno, Pleno } from '../../../../models/pleno.model';
import { PlenosSearchService } from '../../../../core/services/plenos-search.service';
import { I18nService } from '../../../../core/services/i18n.service';
import { PlenosUiStateService } from '../../../../core/services/plenos-ui-state.service';

type PlenosViewMode = 'grid' | 'list';
type ListFilterKey = 'title' | 'dateIso' | 'tipo' | 'canal' | 'estado';
type RelatedDocumentType = 'convocatoria' | 'acta' | 'transcripcion';

interface ListFilters {
  readonly title: string;
  readonly dateIso: string;
  readonly tipo: string;
  readonly canal: string;
  readonly estado: string;
}

interface AppliedFilter {
  readonly key: ListFilterKey;
  readonly label: string;
  readonly value: string;
}

interface RelatedDocumentLink {
  readonly type: RelatedDocumentType;
  readonly label: string;
}

@Component({
  standalone: true,
  imports: [...SHARED_IMPORTS, RouterLink],
  templateUrl: './plenos-grid.component.html',
  styleUrl: './plenos-grid.component.scss'
})
export class PlenosGridComponent {
  // Pantalla principal de trabajo con selector persistente de vista.
  private readonly viewKey = 'gpv2_plenos_view_mode';
  private readonly gridChunkSize = 8;
  protected readonly repo = inject(PlenoLocalRepository);
  protected readonly ctx = inject(PlenoContextService);
  protected readonly search = inject(PlenosSearchService);
  protected readonly i18n = inject(I18nService);
  protected readonly plenosUiState = inject(PlenosUiStateService);
  protected readonly plenos = signal<readonly Pleno[]>([]);
  private readonly snapshotPlenos = signal<readonly Pleno[]>([]);
  protected readonly activePleno$ = this.ctx.activePleno$;
  protected viewMode: PlenosViewMode = this.readPersistedViewMode();
  protected readonly pageSizeOptions = [25, 50, 100] as const;
  protected readonly listPageSize = signal<number>(25);
  protected readonly listCurrentPage = signal<number>(1);
  protected readonly gridVisibleCount = signal<number>(this.gridChunkSize);
  protected readonly listFilters = signal<ListFilters>({
    title: '',
    dateIso: '',
    tipo: '',
    canal: '',
    estado: ''
  });

  constructor() {
    this.repo.listPrivate().subscribe((items) => {
      const normalized = items.map((item) => ({ ...item, tipo: this.normalizeTipoValue(item.tipo) }));
      this.plenos.set(normalized);
      this.snapshotPlenos.set(normalized);
      this.plenosUiState.setHasPlenos(normalized.length > 0);
    });
  }

  protected setActive(id: string, title: string, slug: string): void {
    this.ctx.setActivePleno({ id, title, slug });
  }

  protected setViewMode(mode: PlenosViewMode): void {
    this.viewMode = mode;
    localStorage.setItem(this.viewKey, mode);
    if (mode === 'list') {
      this.listCurrentPage.set(1);
    }
  }

  protected getStatusClass(status: EstadoPleno): string {
    if (status === EstadoPleno.PUBLICADO) {
      return 'status-chip status-chip--published';
    }
    if (status === EstadoPleno.CERRADO) {
      return 'status-chip status-chip--closed';
    }
    return 'status-chip status-chip--draft';
  }

  protected getStatusLabel(status: EstadoPleno | string): string {
    if (status === EstadoPleno.PUBLICADO) {
      return this.i18n.t('plenos.status.published');
    }
    if (status === EstadoPleno.CERRADO) {
      return this.i18n.t('plenos.status.closed');
    }
    return this.i18n.t('plenos.status.draft');
  }

  protected getAbbreviatedType(tipo: string): string {
    const normalized = this.normalizeTipoValue(tipo);
    return normalized === 'EXTRAORDINARIO'
      ? this.i18n.t('plenos.typeAbbrev.extraordinary')
      : this.i18n.t('plenos.typeAbbrev.ordinary');
  }

  protected getFullTypeLabel(tipo: string): string {
    const normalized = this.normalizeTipoValue(tipo);
    return normalized === 'EXTRAORDINARIO'
      ? this.i18n.t('plenos.typeLabel.extraordinary')
      : this.i18n.t('plenos.typeLabel.ordinary');
  }

  protected isActivePleno(activePlenoId: string | null, plenoId: string): boolean {
    return activePlenoId === plenoId;
  }

  protected getRelatedDocuments(pleno: Pleno): readonly RelatedDocumentLink[] {
    if (pleno.estado === EstadoPleno.BORRADOR) {
      return [{ type: 'convocatoria', label: this.i18n.t('plenos.doc.convocatoria') }];
    }
    return [
      { type: 'convocatoria', label: this.i18n.t('plenos.doc.convocatoria') },
      { type: 'acta', label: this.i18n.t('plenos.doc.acta') },
      { type: 'transcripcion', label: this.i18n.t('plenos.doc.transcripcion') }
    ];
  }

  protected getDocumentTypeClass(type: RelatedDocumentType): string {
    if (type === 'convocatoria') {
      return 'doc-link--convocatoria';
    }
    if (type === 'acta') {
      return 'doc-link--acta';
    }
    return 'doc-link--transcripcion';
  }

  protected get gridItems(): readonly Pleno[] {
    return this.plenos().slice(0, this.gridVisibleCount());
  }

  protected get hasMoreGridItems(): boolean {
    return this.gridVisibleCount() < this.plenos().length;
  }

  protected loadMoreGridItems(): void {
    if (!this.hasMoreGridItems || this.viewMode !== 'grid') {
      return;
    }
    const next = Math.min(this.gridVisibleCount() + this.gridChunkSize, this.plenos().length);
    this.gridVisibleCount.set(next);
  }

  protected onPageSizeChange(event: Event): void {
    const target = event.target as HTMLSelectElement | null;
    const pageSize = Number(target?.value);
    if (!Number.isFinite(pageSize) || pageSize <= 0) {
      return;
    }
    this.listPageSize.set(pageSize);
    this.listCurrentPage.set(1);
    this.scrollToListTop();
  }

  protected get totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredListSource.length / this.listPageSize()));
  }

  protected get listStartIndex(): number {
    return (this.listCurrentPage() - 1) * this.listPageSize();
  }

  protected get listEndIndex(): number {
    return Math.min(this.listStartIndex + this.listPageSize(), this.filteredListSource.length);
  }

  protected get listItems(): readonly Pleno[] {
    return this.filteredListSource.slice(this.listStartIndex, this.listEndIndex);
  }

  protected get filteredListSource(): readonly Pleno[] {
    const filters = this.listFilters();
    const searchText = this.normalize(this.search.query());
    return this.plenos().filter((pleno) => {
      if (filters.title && pleno.title !== filters.title) {
        return false;
      }
      if (filters.dateIso && pleno.dateIso !== filters.dateIso) {
        return false;
      }
      if (filters.tipo && pleno.tipo !== filters.tipo) {
        return false;
      }
      if (filters.canal && pleno.canal !== filters.canal) {
        return false;
      }
      if (filters.estado && pleno.estado !== filters.estado) {
        return false;
      }

      if (searchText) {
        const searchable = [
          pleno.title,
          pleno.dateIso,
          pleno.tipo,
          pleno.canal,
          pleno.estado,
          this.getStatusLabel(pleno.estado)
        ]
          .map((value) => this.normalize(String(value)))
          .join(' ');

        if (!searchable.includes(searchText)) {
          return false;
        }
      }
      return true;
    });
  }

  protected get titleFilterOptions(): readonly string[] {
    return this.getUniqueOptions('title');
  }

  protected get dateFilterOptions(): readonly string[] {
    return this.getUniqueOptions('dateIso');
  }

  protected get tipoFilterOptions(): readonly string[] {
    return this.getUniqueOptions('tipo');
  }

  protected get canalFilterOptions(): readonly string[] {
    return this.getUniqueOptions('canal');
  }

  protected get estadoFilterOptions(): readonly string[] {
    return this.getUniqueOptions('estado');
  }

  protected get appliedFilters(): readonly AppliedFilter[] {
    const filters = this.listFilters();
    const map: readonly { key: ListFilterKey; label: string }[] = [
      { key: 'title', label: this.i18n.t('plenos.filter.pleno') },
      { key: 'dateIso', label: this.i18n.t('plenos.filter.date') },
      { key: 'tipo', label: this.i18n.t('plenos.filter.type') },
      { key: 'canal', label: this.i18n.t('plenos.filter.channel') },
      { key: 'estado', label: this.i18n.t('plenos.filter.status') }
    ];

    return map
      .filter(({ key }) => !!filters[key])
      .map(({ key, label }) => ({
        key,
        label,
        value: key === 'estado'
          ? this.getStatusLabel(filters[key] as EstadoPleno)
          : filters[key]
      }));
  }

  protected onFilterChange(filterKey: ListFilterKey, event: Event): void {
    const target = event.target as HTMLSelectElement | null;
    const value = target?.value ?? '';
    this.listFilters.update((current) => ({ ...current, [filterKey]: value }));
    this.listCurrentPage.set(1);
    this.scrollToListTop();
  }

  protected removeFilter(filterKey: ListFilterKey): void {
    this.listFilters.update((current) => ({ ...current, [filterKey]: '' }));
    this.listCurrentPage.set(1);
    this.scrollToListTop();
  }

  protected nextListPage(): void {
    if (this.listCurrentPage() < this.totalPages) {
      this.listCurrentPage.update((page) => page + 1);
      this.scrollToListTop();
    }
  }

  protected simulateNoPlenos(): void {
    this.plenos.set([]);
    this.plenosUiState.setHasPlenos(false);
    this.listCurrentPage.set(1);
    this.gridVisibleCount.set(this.gridChunkSize);
  }

  protected restorePlenos(): void {
    this.plenos.set(this.snapshotPlenos());
    this.plenosUiState.setHasPlenos(this.snapshotPlenos().length > 0);
    this.listCurrentPage.set(1);
    this.gridVisibleCount.set(this.gridChunkSize);
  }

  protected previousListPage(): void {
    if (this.listCurrentPage() > 1) {
      this.listCurrentPage.update((page) => page - 1);
      this.scrollToListTop();
    }
  }

  @HostListener('window:scroll')
  protected onWindowScroll(): void {
    if (this.viewMode !== 'grid' || !this.hasMoreGridItems) {
      return;
    }
    const threshold = 220;
    const scrollPosition = window.innerHeight + window.scrollY;
    const pageHeight = document.documentElement.scrollHeight;
    if (scrollPosition >= pageHeight - threshold) {
      this.loadMoreGridItems();
    }
  }

  private readPersistedViewMode(): PlenosViewMode {
    const value = localStorage.getItem(this.viewKey);
    return value === 'list' ? 'list' : 'grid';
  }

  private getUniqueOptions(filterKey: ListFilterKey): readonly string[] {
    const options = new Set<string>();
    for (const pleno of this.plenos()) {
      options.add(String(pleno[filterKey]));
    }
    return Array.from(options.values()).sort((a, b) => a.localeCompare(b));
  }

  private normalize(value: string): string {
    return value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }

  private normalizeTipoValue(value: string): 'ORDINARIO' | 'EXTRAORDINARIO' {
    const normalized = this.normalize(value);
    if (
      normalized.startsWith('ext') ||
      normalized.includes('extra') ||
      normalized.includes('extraordin')
    ) {
      return 'EXTRAORDINARIO';
    }
    return 'ORDINARIO';
  }

  private scrollToListTop(): void {
    const anchor = document.getElementById('plenos-list-top');
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
