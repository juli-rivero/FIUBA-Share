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

export type { Curso, Periodo, Materia, ItemBreadCrumb, OutletContextType };
