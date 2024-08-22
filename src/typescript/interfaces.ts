import { Repository } from "./githubInterfaces";

type Periodo = {
  id: string;
  año: number;
  cuatrimestre: number;
  reposCount: number;
};

type Tp = {
  id: string;
  reposCount: number;
}

type Curso = {
  id: string;
  nombre: string;
  docentes: string;
  repos: Repository[];
  tps: Tp[];
  periodos: Periodo[];
};

type Materia = {
  id: string;
  nombre: string;
  cursos: Curso[];
  reposCount: number;
};

type OutletContextType = {
  setBreadcrumb: React.Dispatch<React.SetStateAction<string[]>>;
  materias: Materia[];
  loading: boolean;
};

export type { Curso, Periodo, Tp, Materia, OutletContextType };
