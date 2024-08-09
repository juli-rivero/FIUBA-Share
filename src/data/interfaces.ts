import { Repository } from "./githubInterfaces";

type TP = {
  id: string;
  nombre: string;
  repos: Repository[];
}
type Curso = {
  id: string;
  nombre: string;
  docentes: string;
  tps: TP[];
  reposCount: number;
}

type Periodo = {
  id:string;
  año: number;
  cuatrimestre: number;
  cursos: Curso[];
  reposCount: number;
}

type Materia = {
  id: string;
  nombre: string;
  periodos: Periodo[];
  reposCount: number;
}

type ItemBreadCrumb = string;

type OutletContextType = {
  setBreadcrumb: React.Dispatch<React.SetStateAction<ItemBreadCrumb[]>>;
  materias: Materia[];
  loading: boolean;
};

type SortMaterias = "a-z" | "reposCount";
type SortPeriodos = "periodo" | "reposCount";
type SortCursos = "a-z" | "reposCount";
type SortTPs = "a-z" | "reposCount" | "id";
type SortRepos = "a-z" | "points" | "recent";

export type { TP, Curso, Periodo, Materia, ItemBreadCrumb, OutletContextType, SortMaterias, SortPeriodos, SortCursos, SortTPs, SortRepos };
