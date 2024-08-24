import { Dispatch, SetStateAction, useState } from "react";
import { Curso, Materia } from "../typescript/interfaces";
import { Repository } from "../typescript/githubInterfaces";

export enum Sort {
  Az = "az",
  ReposCount = "reposCount",
  Points = "points",
  Recent = "recent",
}
type SortMaterias = Sort.Az | Sort.ReposCount;
type SortCursos = Sort.Az | Sort.ReposCount;
type SortRepos = Sort.Az | Sort.Recent | Sort.Points;

export type { SortMaterias, SortCursos, SortRepos };

type AzElement = Materia | Curso | Repository;
const sortAZ = (a: AzElement, b: AzElement) =>
  ("nombre" in a ? a.nombre : a.name).localeCompare(
    "nombre" in b ? b.nombre : b.name
  );

const sortPoints = (a: Repository, b: Repository) => b.score - a.score;

const sortRecent = (a: Repository, b: Repository) =>
  a.updated_at < b.updated_at ? 1 : -1;

type ReposCountElement = Materia | Curso;
const sortReposCount = (a: ReposCountElement, b: ReposCountElement) =>
  ("repos" in b ? b.repos.length : b.reposCount.conClasificacion) -
  ("repos" in a ? a.repos.length : a.reposCount.conClasificacion);

export type SortFunctions = {
  [Sort.Az]: typeof sortAZ;
  [Sort.Points]: typeof sortPoints;
  [Sort.Recent]: typeof sortRecent;
  [Sort.ReposCount]: typeof sortReposCount;
};
const sortFunctions: SortFunctions = {
  [Sort.Az]: sortAZ,
  [Sort.Points]: sortPoints,
  [Sort.Recent]: sortRecent,
  [Sort.ReposCount]: sortReposCount,
};

function useSort<T extends SortMaterias | SortCursos | SortRepos>(
  initialType: T
): [T, Dispatch<SetStateAction<T>>, SortFunctions] {
  const [sort, setSort] = useState(initialType);

  return [sort, setSort, sortFunctions];
}

export default useSort;
