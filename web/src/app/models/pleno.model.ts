export enum EstadoPleno {
  BORRADOR = 'BORRADOR',
  PUBLICADO = 'PUBLICADO',
  CERRADO = 'CERRADO'
}

export interface PublicPleno {
  id: string;
  slug: string;
  title: string;
  dateIso: string;
  resumen: string;
  imageUrl: string;
  estado: EstadoPleno;
  canal: string;
  tipo: 'ORDINARIO' | 'EXTRAORDINARIO';
}

export interface Pleno extends PublicPleno {
  descripcionInterna: string;
  asistentes: string[];
}
