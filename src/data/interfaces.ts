import { Repository } from "./githubInterfaces";

type Curso = {
  id: string;
  nombre: string;
  docentes: string;
  repos: Repository[];
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

export type { Curso, Periodo, Materia, ItemBreadCrumb, OutletContextType, SortMaterias, SortPeriodos, SortCursos, SortTPs, SortRepos };
