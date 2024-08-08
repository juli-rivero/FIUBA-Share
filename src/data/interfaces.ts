import { Repository } from "./githubInterfaces";

interface TP {
  id: string;
  nombre: string;
  repos: Repository[];
}
interface Curso {
  id: string;
  nombre: string;
  docentes: string;
  tps: TP[];
  reposCount: number;
}

interface Periodo {
  id:string;
  año: number;
  cuatrimestre: number;
  cursos: Curso[];
  reposCount: number;
}

interface Materia {
  id: string;
  nombre: string;
  periodos: Periodo[];
  reposCount: number;
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
}

type OutletContextType = {
  setBreadcrumb: React.Dispatch<React.SetStateAction<ItemBreadCrumb[]>>;
  materias: Materia[];
  partialLoading: boolean;
};

export type { TP, Curso, Periodo, Materia, Params, ItemBreadCrumb, OutletContextType };
