interface TP {
  id: string;
  nombre: string;
}
interface Curso {
  id: string;
  nombre: string;
  tps: TP[];
}

interface Fecha {
  año: number;
  cuatrimestre: number;
  cursos: Curso[];
}

interface Materia {
  id: string;
  nombre: string;
  fechas: Fecha[];
}

interface Params {
  materia?: string;
  anio?: number;
  cuatrimestre?: number;
  curso?: string;
  tp?: string;
}

interface ItemBreadCrumb {
  nombre: string;
  href?: string;
}

export type { TP, Curso, Fecha, Materia, Params, ItemBreadCrumb };
