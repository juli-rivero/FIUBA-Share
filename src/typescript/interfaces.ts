import { Repository } from "./githubInterfaces";

type Periodo = {
  id: string;
  año: number;
  cuatrimestre: number;
  reposCount: number;
};

type Actividad = {
  id: string;
  nombre: string;
  reposCount: number;
};

type Curso = {
  id: string;
  nombre: string;
  docentes: string;
  repos: Repository[];
  actividades: Actividad[];
  periodos: Periodo[];
};

type Materia = {
  id: string;
  nombre: string;
  cursos: Curso[];
  reposCount: {
    conClasificacion: number;
    sinClasificacion: number;
  };
};

type OutletContextType = {
  setBreadcrumb: React.Dispatch<React.SetStateAction<string[]>>;
  materias: Materia[];
  loading: boolean;
};

export type { Curso, Periodo, Actividad, Materia, OutletContextType };
